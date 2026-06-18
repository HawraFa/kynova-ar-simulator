import * as THREE from 'three';
import { FBXLoader }     from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ── Shared loaders ─────────────────────────────────────────────── */
const texLoader = new THREE.TextureLoader();
const fbxLoader = new FBXLoader();

function loadTex(path, sRGB = false) {
    if (!path) return Promise.resolve(null);
    return new Promise(resolve =>
        texLoader.load(
            path,
            t => { if (sRGB) t.colorSpace = THREE.SRGBColorSpace; resolve(t); },
            undefined,
            () => { console.warn('texture failed:', path); resolve(null); }
        )
    );
}

function loadFBX(path, onProgress) {
    return new Promise((resolve, reject) =>
        fbxLoader.load(path, resolve, onProgress, reject)
    );
}

/* ── Build one 3D viewer ─────────────────────────────────────────── */
async function initViewer(containerId, { fbxPath, textures, accent }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const accentColor = new THREE.Color(accent);

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    /* Scene */
    const scene = new THREE.Scene();

    /* Camera */
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 500);
    camera.position.set(0, 2.2, 5.5);

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(3, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    const fill = new THREE.DirectionalLight(accent, 0.55);
    fill.position.set(-4, 3, -3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xddeeff, 0.5);
    rim.position.set(0, 0, -5);
    scene.add(rim);

    const underGlow = new THREE.PointLight(accent, 1.2, 6);
    underGlow.position.set(0, 0.1, 0);
    scene.add(underGlow);

    /* Platform disc + ring */
    const discMat = new THREE.MeshStandardMaterial({
        color: accentColor, emissive: accentColor, emissiveIntensity: 0.4,
        metalness: 0.9, roughness: 0.15, transparent: true, opacity: 0.55,
    });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.035, 80), discMat);
    disc.position.y = -0.018;
    scene.add(disc);

    const ringMat = new THREE.MeshBasicMaterial({
        color: accentColor, side: THREE.DoubleSide, transparent: true, opacity: 0.45,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.32, 80), ringMat);
    ring.rotation.x = -Math.PI / 2;
    scene.add(ring);

    /* Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.07;
    controls.autoRotate     = true;
    controls.autoRotateSpeed = 1.6;
    controls.enableZoom     = false;
    controls.enablePan      = false;
    controls.minPolarAngle  = Math.PI * 0.18;
    controls.maxPolarAngle  = Math.PI * 0.52;
    controls.target.set(0, 1.2, 0);
    controls.update();

    /* Load textures + FBX in parallel */
    const loaderEl   = container.querySelector('.dog-loader');
    const loaderText = container.querySelector('.dog-loader-text');

    const [albedo, normalMap, roughnessMap, fbx] = await Promise.all([
        loadTex(textures.map,          true),
        loadTex(textures.normalMap,    false),
        loadTex(textures.roughnessMap, false),
        loadFBX(fbxPath, xhr => {
            if (loaderText && xhr.total > 0)
                loaderText.textContent = `Loading… ${Math.round(xhr.loaded / xhr.total * 100)}%`;
        }),
    ]);

    /* Normalise: scale so max dimension = 2.8 units, feet on y=0 */
    const box  = new THREE.Box3().setFromObject(fbx);
    const size = box.getSize(new THREE.Vector3());
    fbx.scale.setScalar(2.8 / Math.max(size.x, size.y, size.z));
    box.setFromObject(fbx);
    const c = box.getCenter(new THREE.Vector3());
    fbx.position.set(-c.x, -box.min.y, -c.z);

    /* Apply PBR materials — one shared material for the whole mesh */
    const mat = new THREE.MeshStandardMaterial({
        map:          albedo,
        normalMap:    normalMap,
        roughnessMap: roughnessMap,
        roughness:    roughnessMap ? 1.0 : 0.72,
        metalness:    0.02,
    });

    fbx.traverse(child => {
        if (!child.isMesh) return;
        child.castShadow    = true;
        child.receiveShadow = true;
        // Dispose old materials and apply the new one
        const old = Array.isArray(child.material) ? child.material : [child.material];
        old.forEach(m => m.dispose());
        child.material = mat;
    });

    scene.add(fbx);
    if (loaderEl) loaderEl.style.display = 'none';

    /* Responsive resize */
    function resize() {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    resize();
    new ResizeObserver(resize).observe(container);

    /* Render loop */
    let t = 0;
    (function tick() {
        requestAnimationFrame(tick);
        t += 0.018;
        ring.scale.setScalar(1 + Math.sin(t) * 0.05);
        discMat.emissiveIntensity = 0.3 + Math.sin(t * 1.4) * 0.12;
        underGlow.intensity       = 1.0 + Math.sin(t * 1.1) * 0.3;
        controls.update();
        renderer.render(scene, camera);
    })();
}

/* ── Boot all three viewers ──────────────────────────────────────── */

// Dog 1 — German Shepherd (★  Tier 1 · Cadet)
initViewer('viewer-dog1', {
    fbxPath: '3DModels/Dog1/source/GermanSheperd.fbx',
    textures: {
        map: '3DModels/Dog1/textures/T_GermanShepherd_D.png',
    },
    accent: 0x4f9eff,
});

// Dog 2 — Belgian Malinois (★★  Tier 2 · Tracker)
initViewer('viewer-dog2', {
    fbxPath: '3DModels/Dog2/uploads_files_6998287_Malinois_FBX/Malinois.fbx',
    textures: {
        map:          '3DModels/Dog2/uploads_files_6998287_Malinois_Textures/texture/Malinois_Albedo2.png',
        normalMap:    '3DModels/Dog2/uploads_files_6998287_Malinois_Textures/texture/Malinois_Normal.png',
        roughnessMap: '3DModels/Dog2/uploads_files_6998287_Malinois_Textures/texture/Malinois_Roughness.png',
    },
    accent: 0x8b5cf6,
});

// Dog 3 — Malinois Elite (★★★  Tier 3 · Phantom)
initViewer('viewer-dog3', {
    fbxPath: '3DModels/Dog2/uploads_files_6998287_Malinois_FBX/Malinois.fbx',
    textures: {
        map:          '3DModels/Dog2/uploads_files_6998287_Malinois_Textures/texture/Malinois_Albedo1.png',
        normalMap:    '3DModels/Dog2/uploads_files_6998287_Malinois_Textures/texture/Malinois_Normal.png',
        roughnessMap: '3DModels/Dog2/uploads_files_6998287_Malinois_Textures/texture/Malinois_Roughness.png',
    },
    accent: 0xf59e0b,
});
