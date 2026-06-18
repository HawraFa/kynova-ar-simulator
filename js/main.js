/* ================================================================
   Navbar: scroll state + active link tracking
================================================================ */
const navbar  = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* ================================================================
   Scroll Progress Bar + Navbar glass effect + Active link
================================================================ */
const scrollProgress = document.getElementById('scrollProgress');
const scrollTopBtn   = document.getElementById('scrollTopBtn');
const sections       = document.querySelectorAll('section[id]');
const navLinks       = document.querySelectorAll('.nav-link');

function onScroll() {
    const scrollY   = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    scrollProgress.style.width = progress + '%';

    // Navbar glass on scroll
    if (scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button
    if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ================================================================
   Scroll to Top
================================================================ */
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================================
   Intersection Observer — Scroll-triggered animations
================================================================ */
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .slide-left, .slide-right'
).forEach(el => animationObserver.observe(el));

/* ================================================================
   Counter Animation for Stats
================================================================ */
function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = start;
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el     = entry.target.querySelector('.stat-number');
            const target = parseInt(el.getAttribute('data-target'), 10);
            animateCounter(el, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card[data-count]').forEach(card => {
    counterObserver.observe(card);
});

/* ================================================================
   Contact Form
================================================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = document.getElementById('contactName').value.trim();
        const email   = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        showToast(`Thank you ${name}! We'll be in touch at ${email} soon.`, 'success');
        contactForm.reset();
    });
}

function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: ${type === 'success' ? 'linear-gradient(135deg, #4f9eff, #8b5cf6)' : '#f87171'};
        color: #fff;
        padding: 14px 28px;
        border-radius: 100px;
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        z-index: 9999;
        opacity: 0;
        transition: all 0.4s ease;
        white-space: nowrap;
        max-width: 90vw;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* ================================================================
   Footer Year
================================================================ */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ================================================================
   Page load fade-in
================================================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

/* ================================================================
   Features Marquee — JS-driven loop + arrow controls
================================================================ */
(function () {
    const track = document.querySelector('.features-marquee-track');
    if (!track) return;

    track.style.animation = 'none';

    const speed = 0.5; // px per frame at 60fps
    const cardWidth = 310; // 290px card + 20px gap
    let pos = 0;
    let nudge = 0;
    let paused = false;
    let groupWidth = 0;

    function measureGroup() {
        const g = track.querySelector('.marquee-group');
        groupWidth = g ? g.offsetWidth + 20 : 2480;
    }
    measureGroup();
    window.addEventListener('resize', measureGroup);

    track.addEventListener('mouseenter', () => { paused = true; });
    track.addEventListener('mouseleave', () => { paused = false; });

    document.querySelector('.marquee-prev')?.addEventListener('click', () => { nudge -= cardWidth; });
    document.querySelector('.marquee-next')?.addEventListener('click', () => { nudge += cardWidth; });

    let last = null;
    function tick(ts) {
        if (last !== null) {
            const dt = ts - last;
            const factor = dt / 16.67;

            if (!paused) pos += speed * factor;

            if (Math.abs(nudge) > 0.1) {
                const step = nudge * 0.14 * factor;
                pos += step;
                nudge -= step;
            } else {
                nudge = 0;
            }

            if (pos >= groupWidth) pos -= groupWidth;
            if (pos < 0) pos += groupWidth;

            track.style.transform = `translateX(-${pos}px)`;
        }
        last = ts;
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}());

/* ================================================================
   Console Easter Egg
================================================================ */
console.log('%cKyNova AR-Simulator', 'font-size:22px;font-weight:900;background:linear-gradient(135deg,#4f9eff,#8b5cf6);-webkit-background-clip:text;color:transparent;');
console.log('%cSenior Project 2025–2026 · University of Bahrain', 'font-size:12px;color:#8899b5;');
console.log('%c🐕 Training the future, one AR session at a time!', 'font-size:12px;color:#00d4aa;');
