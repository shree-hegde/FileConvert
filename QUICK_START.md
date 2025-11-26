# Quick Start - From v0 to Live Website

## 1. Download (5 minutes)
- [ ] Click three dots (⋯) in v0 preview
- [ ] Click "Download ZIP"
- [ ] Extract the ZIP file

## 2. GitHub Setup (10 minutes)

Open terminal in your project folder:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/fileconvert.git
git branch -M main
git push -u origin main
\`\`\`

Then:
- [ ] Create new repo at github.com (name: fileconvert)
- [ ] Copy the repository URL
- [ ] Replace YOUR_USERNAME above with your username

## 3. Deploy to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Paste your GitHub repo URL
5. Click "Deploy"

**Wait 2-3 minutes for deployment to complete.**

Your site is now LIVE! You'll get a URL like: `https://fileconvert-xyz.vercel.app`

## 4. Optimization (Optional but Recommended)

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership (download HTML file, add to `public/` folder)
4. Submit sitemap: `https://yoursite.com/sitemap.xml`

### Google Analytics
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get your Tracking ID (G-XXXXXXXXXX)
3. Add environment variable to Vercel:
   - Go to Vercel Project Settings
   - Environment Variables
   - Add: `NEXT_PUBLIC_GA_ID` = Your Tracking ID

### Bing Webmaster Tools
1. Go to [bing.com/webmasters](https://bing.com/webmasters)
2. Add your site
3. Submit sitemap

## 5. Make Changes & Deploy

Any changes you make and push to GitHub will automatically deploy:

\`\`\`bash
# Make changes to your files
# Then:
git add .
git commit -m "Your commit message"
git push
\`\`\`

Vercel will automatically deploy within 1-2 minutes!

## Common Issues & Fixes

**Q: I forgot my GitHub password**
- Reset at github.com/password_reset

**Q: Build fails on Vercel**
- Go to Vercel Project → Settings → Deployments
- Click "Redeploy" with "Clear Build Cache" option

**Q: Site looks different on Vercel**
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Clear browser cache

**Q: How do I add a custom domain?**
- Vercel Project → Settings → Domains
- Add your domain
- Update DNS settings with your domain provider

---

**Estimated time to live website: 20-30 minutes**
