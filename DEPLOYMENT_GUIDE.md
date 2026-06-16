# KyNova AR-Simulator - Website Deployment Guide

## Quick Start Guide

This guide will help you deploy your project website quickly and professionally.

---

## 🚀 RECOMMENDED: GitHub Pages (100% FREE)

### Why GitHub Pages?
- ✅ Completely FREE
- ✅ Easy to deploy
- ✅ Automatic HTTPS
- ✅ Fast CDN delivery
- ✅ Perfect for student projects

### Step-by-Step Deployment

#### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Sign in or create account
3. Click "New repository" (green button)
4. Repository name: `kynova-ar-simulator`
5. Make it public
6. Click "Create repository"

#### Step 2: Upload Website Files
1. On your repository page, click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `css/style.css`
   - `js/main.js`
   - `README.md`
3. Click "Commit changes"

#### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes

#### Step 4: Access Your Website
Your website will be live at:
```
https://[your-github-username].github.io/kynova-ar-simulator
```

Example: `https://johndoe.github.io/kynova-ar-simulator`

### Custom Domain (Optional)
If you buy a domain (e.g., www.kynova-ar.com):
1. Go to GitHub Pages settings
2. Enter your custom domain
3. Update DNS records at your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: [your-username].github.io
   ```

---

## 💰 OPTION 2: NameCheap (All-in-One - ~$30/year)

### Package Includes
- Domain name (www.kynova-ar.com)
- Web hosting
- Free email (info@kynova-ar.com)

### Step-by-Step Setup

#### Step 1: Buy Domain + Hosting
1. Go to https://www.namecheap.com
2. Search for domain: "kynova-ar.com"
3. Add to cart
4. Add "Stellar Hosting" to cart (~$20/year)
5. Checkout (Total: ~$30/year)

#### Step 2: Upload Website Files
1. Login to NameCheap dashboard
2. Go to "Hosting List"
3. Click "cPanel" button
4. Find "File Manager"
5. Navigate to `public_html` folder
6. Delete default files
7. Upload your files:
   - `index.html`
   - `css/` folder
   - `js/` folder
8. Done!

#### Step 3: Setup Email
1. In cPanel, find "Email Accounts"
2. Create email: info@kynova-ar.com
3. Set password
4. Access via webmail or configure in Gmail/Outlook

#### Step 4: Access Your Website
```
http://www.kynova-ar.com (available in 1-24 hours)
```

---

## 📧 Professional Email Setup

### Option A: NameCheap Email (FREE first year with hosting)
Already included! Just create accounts in cPanel.

### Option B: Gmail Forwarding (FREE)
1. In domain DNS settings, add MX records:
   ```
   Priority: 5
   Host: @
   Value: ASPMX.L.GOOGLE.COM
   ```
2. In Gmail settings → Accounts → Add email alias
3. Verify domain ownership
4. Send emails as info@kynova-ar.com

### Option C: Google Workspace ($6/month)
1. Go to workspace.google.com
2. Sign up with your domain
3. Professional Gmail interface
4. 30GB storage per user

---

## 📝 Before Deployment Checklist

### Required Updates in `index.html`

1. **Replace University Name**
   - Search: `[Your University Name]`
   - Replace with: Your actual university

2. **Update Team Members**
   ```html
   <h3>[Team Member 1]</h3>              → <h3>John Doe</h3>
   <p class="member-role">Project Lead</p> → Keep or update
   <p class="member-id">ID: [Student ID]</p> → ID: 201912345
   ```

3. **Update Supervisor Info**
   ```html
   <p><strong>[Supervisor Name]</strong></p>  → <p><strong>Dr. Ahmed Ali</strong></p>
   <p>[Department] - [Your University Name]</p> → <p>Computer Science - King Saud University</p>
   ```

4. **Update Contact Email**
   - Search: `info@kynova-ar.com`
   - Replace with: Your actual email (after setting up)

5. **Update Academic Year**
   - Search: `2025-2026`
   - Confirm or update to correct year

---

## 🎨 Optional Customizations

### Add Team Photos
1. Create `images/` folder
2. Add photos: `team1.jpg`, `team2.jpg`, etc.
3. Update HTML:
   ```html
   <div class="member-image">
       <img src="images/team1.jpg" alt="Team Member 1" style="width: 100%; border-radius: 50%;">
   </div>
   ```

### Change Color Scheme
Edit `css/style.css`:
```css
:root {
    --primary-color: #2563eb;    /* Blue - change to your preference */
    --secondary-color: #7c3aed;  /* Purple - change to your preference */
}
```

Popular alternatives:
- Green: `#10b981`
- Orange: `#f59e0b`
- Red: `#ef4444`
- Teal: `#14b8a6`

### Add Favicon
1. Create 32x32 icon: `favicon.ico`
2. Add to `<head>` in `index.html`:
   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

---

## 🧪 Testing Before Deployment

### Local Testing
```bash
# Method 1: Direct open
# Just double-click index.html

# Method 2: Python server
python -m http.server 8000
# Visit: http://localhost:8000

# Method 3: Node.js server
npx http-server
# Visit: http://localhost:8080
```

### Test Checklist
- [ ] All navigation links work
- [ ] Hero section displays correctly
- [ ] All 4 scenarios visible
- [ ] Contact form validates email
- [ ] Responsive on mobile (test in browser DevTools)
- [ ] No console errors (F12 → Console tab)
- [ ] All sections scroll smoothly

---

## 📊 Comparison: Hosting Options

| Feature | GitHub Pages | NameCheap | Netlify |
|---------|-------------|-----------|---------|
| **Cost** | FREE | ~$30/year | FREE |
| **Custom Domain** | YES (buy separately) | Included | YES (buy separately) |
| **Email Hosting** | NO | FREE (first year) | NO |
| **Setup Difficulty** | Easy | Medium | Easy |
| **Best For** | Students, FREE sites | All-in-one solution | Modern apps |
| **Storage** | 1GB | Unlimited | 100GB |
| **Bandwidth** | 100GB/month | Unlimited | 100GB/month |

---

## 🆘 Troubleshooting

### Issue: Website not loading after GitHub Pages deployment
**Solution**: Wait 2-5 minutes for deployment. Clear browser cache.

### Issue: 404 error on GitHub Pages
**Solution**: Ensure `index.html` is in root directory, not in a subfolder.

### Issue: CSS not loading
**Solution**: Check file paths. Make sure `css/style.css` path is correct.

### Issue: Images not showing
**Solution**: Use relative paths: `images/photo.jpg` not `/images/photo.jpg`

### Issue: Contact form not working
**Solution**: Form currently shows alert. For actual email, integrate backend API.

---

## 📞 Submission to Supervisor

### Required Information to Submit

**For GitHub Pages:**
```
Website URL: https://[username].github.io/kynova-ar-simulator
Domain Name: GitHub Pages (Free subdomain)
Hosting Provider: GitHub Pages (Free)
Email: [Your actual email for contact]
Team Members: [List all team member names and IDs]
```

**For Custom Domain:**
```
Website URL: http://www.kynova-ar.com
Domain Provider: NameCheap
Domain Cost: $10/year
Hosting Provider: NameCheap Stellar Hosting
Hosting Cost: $20/year
Email: info@kynova-ar.com
Total Annual Cost: $30/year
Team Members: [List all team member names and IDs]
```

---

## ✅ Final Deployment Checklist

- [ ] All placeholder text replaced
- [ ] Team member information updated
- [ ] University name updated
- [ ] Supervisor information updated
- [ ] Contact email updated
- [ ] All links tested
- [ ] Responsive design tested
- [ ] Website deployed to hosting
- [ ] Custom domain configured (if applicable)
- [ ] Professional email setup (if applicable)
- [ ] Website URL submitted to supervisor
- [ ] Website accessible from any device
- [ ] No errors in browser console

---

## 🎓 Academic Requirements Met

✅ **Domain Name**: Custom or GitHub subdomain
✅ **Hosting**: GitHub Pages / NameCheap / Netlify
✅ **Professional Email**: info@kynova-ar.com (optional with GitHub Pages)
✅ **Website Content**: Complete with all project information

---

## 💡 Tips for Success

1. **Deploy early** - Don't wait until the last minute
2. **Test thoroughly** - Check on different devices and browsers
3. **Keep it simple** - A clean, professional website is better than complex
4. **Update regularly** - Add project updates as you progress
5. **Backup files** - Keep copies of all website files
6. **Document everything** - Keep records of domain, hosting, email setup

---

## 🌟 Need Help?

1. **GitHub Pages Documentation**: https://pages.github.com
2. **NameCheap Support**: https://www.namecheap.com/support
3. **Web Development Resources**: 
   - https://www.w3schools.com
   - https://developer.mozilla.org

---

**Good luck with your deployment! 🚀**

---

**KyNova AR-Simulator Team**
