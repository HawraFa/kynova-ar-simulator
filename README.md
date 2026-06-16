# KyNova AR-Simulator - Project Website

## Overview
This is the official website for KyNova AR-Simulator, a senior project focused on AR-based dog handler training.

## Website Structure
```
website/
├── index.html          # Main HTML file with all sections
├── css/
│   └── style.css      # Complete styling with responsive design
├── js/
│   └── main.js        # JavaScript for interactions and animations
└── README.md          # This file
```

## Sections Included
1. **Navigation** - Fixed navbar with smooth scrolling
2. **Hero Section** - Eye-catching introduction with call-to-action
3. **About** - Project overview with statistics
4. **Features** - 8 key features displayed in cards
5. **Scenarios** - 4 AR training scenarios with details
6. **Technology Stack** - Technologies used (Frontend, Backend, AI, Infrastructure)
7. **Team** - Team members with roles and contact info
8. **Contact** - Contact form and information
9. **Footer** - Quick links and copyright

## Hosting Options

### Option 1: GitHub Pages (Recommended - FREE)
1. Create a GitHub repository named `kynova-ar-simulator`
2. Upload all website files to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at: `https://[your-username].github.io/kynova-ar-simulator`

### Option 2: NameCheap
1. Buy domain (e.g., www.kynova-ar.com) - ~$10/year
2. Purchase hosting plan - ~$20/year
3. Upload files via cPanel File Manager
4. Configure domain DNS

### Option 3: Netlify (FREE with custom domain)
1. Create account at netlify.com
2. Drag and drop the website folder
3. Get free subdomain: kynova-ar.netlify.app
4. Optional: Connect custom domain

## Domain Name Suggestions
- kynova-ar.com
- kynova-simulator.com
- ar-dog-training.com
- kynova-training.com
- ar-k9-simulator.com

## Professional Email Setup

### Using NameCheap Email Hosting (FREE for first year)
1. Buy domain from NameCheap
2. Enable free email hosting
3. Create: info@kynova-ar.com, team@kynova-ar.com

### Using Gmail with Custom Domain
1. Use Gmail forwarding (free but limited)
2. Or use Google Workspace (~$6/month per user)

## Customization Instructions

### 1. Update Team Information
Edit `index.html` in the Team section:
```html
<h3>[Team Member Name]</h3>
<p class="member-role">Project Lead / Backend Developer</p>
<p class="member-id">ID: [Student ID]</p>
```

### 2. Update University Information
Search for `[Your University Name]` and replace with your actual university name.

### 3. Update Contact Email
Search for `info@kynova-ar.com` and replace with your actual email.

### 4. Add Team Photos
Replace the `<i class="fas fa-user"></i>` icons with actual photos:
```html
<div class="member-image">
    <img src="images/member1.jpg" alt="Team Member">
</div>
```

### 5. Update Colors (Optional)
Edit `css/style.css` variables at the top:
```css
:root {
    --primary-color: #2563eb;  /* Change to your preferred color */
    --secondary-color: #7c3aed;
}
```

## Features
✅ Fully responsive (mobile, tablet, desktop)
✅ Smooth scrolling navigation
✅ Animated sections
✅ Contact form with validation
✅ Modern gradient design
✅ Font Awesome icons
✅ SEO-friendly structure
✅ Fast loading performance

## Browser Compatibility
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

## Testing Locally
1. Open `index.html` in your browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
3. Visit: http://localhost:8000

## Deployment Checklist
- [ ] Replace all `[Your University Name]` with actual university
- [ ] Update team member names and IDs
- [ ] Update contact email address
- [ ] Add team member photos (optional)
- [ ] Test all navigation links
- [ ] Test contact form
- [ ] Test on mobile devices
- [ ] Check browser compatibility
- [ ] Optimize images (if added)
- [ ] Add favicon.ico
- [ ] Submit domain and hosting details to your supervisor

## Cost Estimate

### Budget Option (FREE)
- Domain: Use GitHub Pages subdomain (FREE)
- Hosting: GitHub Pages (FREE)
- Email: Gmail forwarding (FREE)
- **Total: $0**

### Professional Option
- Domain: NameCheap (~$10/year)
- Hosting: NameCheap (~$20/year)
- Email: Included FREE for first year
- **Total: ~$30/year**

## Support
For questions about the website, contact your team members or refer to the project documentation.

## License
This website is for academic purposes as part of a senior project at [Your University Name].

---

**KyNova AR-Simulator** - Training the Future, One AR Session at a Time 🐕
