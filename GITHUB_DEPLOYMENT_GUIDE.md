# GitHub & Vercel Deployment Guide

## Step 1: Download Your Project

1. Click the **three dots (⋯)** in the top-right corner of the v0 preview
2. Select **"Download ZIP"**
3. Extract the ZIP file to your desired location

## Step 2: Initialize Git Repository

Open terminal/command prompt in your project folder and run:

\`\`\`bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: FileConvert website with SEO optimization"
\`\`\`

## Step 3: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in top-right → **"New repository"**
3. Name it: **fileconvert** (or any name you prefer)
4. Choose **Public** or **Private** (Private is recommended initially)
5. **DO NOT** initialize with README, .gitignore, or license (you already have files)
6. Click **"Create repository"**

## Step 4: Connect Local Repository to GitHub

After creating the GitHub repo, you'll see commands. Run these in your terminal:

\`\`\`bash
# Set the remote repository
git remote add origin https://github.com/YOUR_USERNAME/fileconvert.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
\`\`\`

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 5: Deploy to Vercel

### Option A: Using Vercel UI (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in (or create account)
2. Click **"Add New..."** → **"Project"**
3. Choose **"Import Git Repository"**
4. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/fileconvert`
5. Click **"Import"**
6. Click **"Deploy"** (leave settings as default)
7. Wait for deployment to complete (~2-3 minutes)

### Option B: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts and link to your GitHub repo
\`\`\`

## Step 6: Configure Domain (Optional)

After deployment:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain or use Vercel's free domain

## Step 7: Set Up Search Console & Analytics

Once deployed, submit to Google:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"URL prefix"** and enter your domain
3. Verify ownership (easiest: download HTML file and add to public folder)
4. Submit XML sitemap: `https://yoursite.com/sitemap.xml`

## Troubleshooting

### Build Fails on Vercel
- Check Node version: Should be 18+ (Vercel default is fine)
- Clear build cache: Go to Vercel Settings → Deployments → "Redeploy" with cache cleared

### Pages Not Loading
- Check all API routes in `/app/api/` are valid
- Verify environment variables in Vercel Settings → Environment Variables

## After Deployment

Your website is now live! Next steps:

- [ ] Submit sitemap to Google Search Console
- [ ] Setup Google Analytics
- [ ] Setup Bing Webmaster Tools
- [ ] Create social media accounts linking to your site
- [ ] Start writing blog posts (publish 2-3x per week)
- [ ] Build backlinks from reputable sites

---

**Your live website will be available at:** `https://fileconvert-<random>.vercel.app` or your custom domain
