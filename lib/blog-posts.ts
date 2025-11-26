export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: Date
  updatedAt: Date
  readingTime: number
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "best-practices-image-compression",
    title: "Image Compression Best Practices: How to Reduce File Size Without Losing Quality",
    excerpt:
      "Learn expert techniques for compressing images while maintaining visual quality. Discover the ideal compression ratios for different use cases.",
    content: `Image compression is essential for web performance and storage optimization. In this guide, we'll explore professional-grade compression techniques that maintain quality while dramatically reducing file sizes.

Key compression strategies include:
- Choosing the right file format (JPEG for photos, PNG for graphics)
- Understanding compression ratios and quality trade-offs
- Using progressive compression for web delivery
- Optimizing images for different devices and screen sizes

Modern tools like FileConvert make it simple to apply these techniques instantly without technical knowledge.`,
    author: "FileConvert Team",
    category: "Images",
    tags: ["image-compression", "optimization", "web-performance"],
    publishedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    readingTime: 5,
  },
  {
    id: "2",
    slug: "pdf-optimization-guide",
    title: "Complete Guide to PDF Optimization: Reduce File Size, Improve Compatibility",
    excerpt:
      "Master PDF optimization techniques to create faster-loading, smaller documents. Perfect for sharing via email or storing in the cloud.",
    content: `PDFs are ubiquitous in business, but large file sizes cause problems. Learn how to optimize your PDFs for different purposes while maintaining document integrity.

Topics covered:
- Understanding PDF structure and compression
- Image compression within PDFs
- Font subset optimization
- Removing unnecessary metadata
- Creating PDFs for specific use cases (web, print, archival)

Efficient PDF management saves time and storage costs across your organization.`,
    author: "FileConvert Team",
    category: "PDF",
    tags: ["pdf-optimization", "file-management", "efficiency"],
    publishedAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    readingTime: 7,
  },
  {
    id: "3",
    slug: "convert-files-offline-benefits",
    title: "Why Offline File Conversion Matters: Privacy, Speed, and Security",
    excerpt: "Discover the advantages of offline file conversion and why privacy-focused tools are essential in 2024.",
    content: `In an era of data breaches and privacy concerns, offline file conversion offers significant advantages over cloud-based alternatives.

Benefits of offline conversion:
- Complete privacy - your files never leave your device
- Faster processing without internet latency
- No file size limitations imposed by servers
- Better security and protection of sensitive data
- Works anywhere, even without internet connection

FileConvert's browser-based technology ensures all conversions happen securely on your device.`,
    author: "FileConvert Team",
    category: "Privacy",
    tags: ["privacy", "security", "offline-tools"],
    publishedAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    readingTime: 4,
  },
  {
    id: "4",
    slug: "how-to-merge-pdf-documents",
    title: "How to Merge PDF Files: Step-by-Step Guide for Better Document Management",
    excerpt:
      "Learn multiple ways to merge PDF documents efficiently. Perfect for organizing reports, contracts, and other important documents.",
    content: `Managing multiple PDF files can be cumbersome. This guide shows you how to merge PDFs effectively, whether you have 2 or 20 documents to combine.

Merging scenarios:
- Combining multi-part documents
- Organizing scanned pages
- Creating comprehensive reports from multiple sources
- Archiving related documents

Best practices for merged PDFs:
- Maintain consistent formatting and metadata
- Add bookmarks for navigation
- Preserve original document quality
- Organize pages logically for easy reference

FileConvert makes merging simple with drag-and-drop reordering.`,
    author: "FileConvert Team",
    category: "PDF",
    tags: ["pdf-merge", "document-management", "productivity"],
    publishedAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    readingTime: 6,
  },
  {
    id: "5",
    slug: "image-format-comparison-guide",
    title: "Image Format Guide: JPEG vs PNG vs WebP - When to Use Each",
    excerpt:
      "Complete comparison of image formats. Learn which format to use for different purposes and how to convert between them effectively.",
    content: `Choosing the right image format is crucial for web performance and quality. Here's a comprehensive guide to help you decide.

JPEG Format:
- Best for: photographs, complex images with many colors
- Pros: Small file size, widely supported
- Cons: Lossy compression, no transparency

PNG Format:
- Best for: graphics, logos, images with text
- Pros: Lossless compression, transparency support
- Cons: Larger file sizes than JPEG

WebP Format:
- Best for: modern web applications
- Pros: Better compression than JPEG/PNG, smaller files
- Cons: Requires modern browser support

Choose wisely to optimize your website's performance.`,
    author: "FileConvert Team",
    category: "Images",
    tags: ["image-formats", "web-optimization", "technical-guide"],
    publishedAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
    readingTime: 8,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPost(slug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== slug && post.category === currentPost.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}
