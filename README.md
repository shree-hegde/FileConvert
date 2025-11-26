# FileConvert - Free File Conversion Platform

A modern, fast, and SEO-optimized file conversion website built with Next.js. Convert images, PDFs, and documents instantly in your browser.

## Features

- **14+ Conversion Tools**: Image to PDF, Merge PDF, Compress Image, and more
- **Offline Processing**: Convert files directly in your browser - no uploads to servers
- **SEO Optimized**: Comprehensive schema markup, meta tags, and blog section
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode Support**: Beautiful dark and light themes
- **Fast & Secure**: No file retention, GDPR compliant

## Supported Conversions

### Image Tools
- JPG to PNG
- PNG to WebP
- Compress Images
- Resize Images

### PDF Tools
- Merge PDFs
- Split PDFs
- Compress PDFs
- Image to PDF
- PDF to Image

### Document Tools
- Word to PDF
- Excel to PDF
- PDF to Word
- PDF to Excel

## Tech Stack

- **Framework**: Next.js 16 with React 19.2
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Processing**: Browser-based (client-side)
- **SEO**: Comprehensive schema markup, dynamic meta tags
- **Deployment**: Vercel

## Getting Started

### Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
\`\`\`

### Production Build

\`\`\`bash
# Create production build
npm run build

# Start production server
npm start
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click Deploy

See [GITHUB_DEPLOYMENT_GUIDE.md](./GITHUB_DEPLOYMENT_GUIDE.md) for detailed instructions.

## SEO & Content Marketing

The site includes:
- Comprehensive XML sitemap
- SEO-optimized blog section with 5+ articles
- JSON-LD schema markup (Organization, WebApplication, FAQ, HowTo, BreadcrumbList)
- Optimized meta tags for all pages
- Category landing pages for tool organization
- Breadcrumb navigation for better crawlability

See [SEO_IMPLEMENTATION_SUMMARY.md](./SEO_IMPLEMENTATION_SUMMARY.md) for complete details.

## Blog Content

The blog section includes articles on:
- How to Compress Images Without Losing Quality
- Ultimate Guide to PDF Optimization
- File Privacy and Security Best Practices
- Best Practices for Merging Multiple PDFs
- Understanding Image Formats: PNG vs JPG vs WebP

New blog posts can be added in `/lib/blog-posts.ts`

## Performance

- Lighthouse Score: 95+
- Core Web Vitals: Optimal
- Bundle Size: ~50KB gzipped
- First Contentful Paint: <1s

## Analytics & Tracking

To add analytics:

1. **Google Analytics**:
   \`\`\`tsx
   import { Analytics } from "@vercel/analytics/react";
   export default function Layout() {
     return <Analytics />;
   }
   \`\`\`

2. **Vercel Web Analytics**:
   - Automatically enabled on Vercel deployments
   - View at Vercel Dashboard → Analytics

## Environment Variables

No environment variables required for basic functionality. Optional variables:

- `NEXT_PUBLIC_SITE_URL`: Your domain (for social sharing)
- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID

## File Structure

\`\`\`
fileconvert/
├── app/
│   ├── tools/                 # All conversion tools
│   ├── blog/                  # Blog section
│   ├── api/                   # API routes
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── header.tsx             # Site header
│   ├── footer.tsx             # Site footer
│   └── [other components]
├── lib/
│   ├── blog-posts.ts          # Blog content
│   ├── schema-generators.ts   # SEO schema
│   └── tool-metadata.ts       # Tool metadata
├── public/
│   ├── manifest.json          # PWA manifest
│   └── [assets]
└── styles/
    └── globals.css            # Global styles
\`\`\`

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

- Issues: Create a GitHub issue
- Questions: Check the SEO_IMPLEMENTATION_SUMMARY.md file
- Deployment Help: See GITHUB_DEPLOYMENT_GUIDE.md

---

**Made with ❤️ using Next.js and Vercel**
# FileConvert
