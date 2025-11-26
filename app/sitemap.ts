import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fileconvert.com"

  const tools = [
    "image-to-pdf",
    "pdf-to-image",
    "merge-pdf",
    "compress-pdf",
    "split-pdf",
    "compress-image",
    "resize-image",
    "jpg-to-png",
    "png-to-webp",
    "zip-unzip",
    "word-to-pdf",
    "pdf-to-word",
    "excel-to-pdf",
    "pdf-to-excel",
  ]

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogUrls,
    ...toolUrls,
  ]
}
