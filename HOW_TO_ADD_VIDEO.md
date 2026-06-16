# How to Add Demo Video to Your Website

Your website now has a demo video section! Here are two ways to add your video:

---

## Option 1: Upload to YouTube (Recommended - FREE & Easy)

### Steps:
1. **Upload your video to YouTube**
   - Go to https://www.youtube.com/upload
   - Upload your demo video
   - Set it to "Public" or "Unlisted"

2. **Get the Video ID**
   - After upload, your video URL will look like: `https://www.youtube.com/watch?v=ABC123XYZ`
   - Copy the part after `v=` (e.g., `ABC123XYZ`)

3. **Update index.html**
   - Open `website/index.html`
   - Find the Demo Video Section (around line 60)
   - **Uncomment** the YouTube iframe line and replace `VIDEO_ID`:
   ```html
   <iframe src="https://www.youtube.com/embed/ABC123XYZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   ```
   - **Comment out or delete** the local video line and placeholder

4. **Save and push to GitHub**

### Pros:
- ✅ FREE hosting
- ✅ Faster loading (YouTube CDN)
- ✅ Professional player controls
- ✅ Works on all devices
- ✅ Automatic quality adjustment

---

## Option 2: Local Video File

### Steps:
1. **Prepare your video**
   - Convert to MP4 format (recommended)
   - Keep file size under 50MB for faster loading
   - Recommended resolution: 1920x1080 or 1280x720

2. **Add video to website**
   - Place your video file in `website/images/` folder
   - Name it: `demo-video.mp4`

3. **Update index.html**
   - The video tag is already set up in `index.html`
   - Just make sure this line is **uncommented**:
   ```html
   <video controls poster="images/waitingScreen.png">
       <source src="images/demo-video.mp4" type="video/mp4">
       Your browser does not support the video tag.
   </video>
   ```
   - **Delete** the placeholder div

4. **Push to GitHub**
   ```bash
   cd website
   git add images/demo-video.mp4
   git commit -m "Add demo video"
   git push origin main
   ```

### Pros:
- ✅ Full control over video
- ✅ No external dependencies

### Cons:
- ❌ Larger file size (slower loading)
- ❌ Uses GitHub storage
- ❌ May not work well on all devices

---

## Option 3: Vimeo (Alternative to YouTube)

### Steps:
1. Upload to https://vimeo.com
2. Get embed code from Vimeo
3. Replace the iframe in `index.html` with Vimeo's embed code

---

## Current Status

The website currently shows a **placeholder** with the message:
> "Demo video coming soon!"

Once you add your video using either option, the placeholder will automatically disappear.

---

## Tips for Creating a Great Demo Video

1. **Length**: Keep it 1-3 minutes
2. **Content to Show**:
   - App login/welcome screen
   - AR scenarios in action (show at least 2-3)
   - Training commands being performed
   - Performance tracking dashboard
   - Quiz features
   - Admin panel (briefly)
3. **Add Text Overlays**: Explain what viewers are seeing
4. **Background Music**: Use royalty-free music from YouTube Audio Library
5. **Screen Recording Tools**:
   - Windows: Xbox Game Bar (Win + G)
   - Android: Built-in screen recorder
   - iOS: Built-in screen recorder

---

## Example YouTube Embed Format

```html
<!-- YouTube -->
<iframe 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

---

## Need Help?

If you need help adding the video, let me know and I can guide you through the process!

**Recommendation**: Use YouTube (Option 1) for best results.
