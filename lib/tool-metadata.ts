import type { Metadata } from "next"

export interface ToolPageMetadata {
  title: string
  description: string
  keywords: string[]
  slug: string
  icon?: string
  category?: string
  useCases?: string[]
}

const toolMetadataMap: Record<string, ToolPageMetadata> = {
  "image-to-pdf": {
    title: "Image to PDF Converter - Convert JPG, PNG to PDF Online",
    description:
      "Convert JPG, PNG, WebP and other image formats to PDF instantly. Free online converter with no file size limits. Works offline and 100% private.",
    keywords: [
      "image to pdf",
      "jpg to pdf",
      "png to pdf",
      "convert image to pdf",
      "online image converter",
      "free pdf converter",
    ],
    slug: "image-to-pdf",
    category: "Images",
    useCases: [
      "Convert multiple images to a single PDF",
      "Create PDF documents from photographs",
      "Combine image files into one PDF",
    ],
  },
  "pdf-to-image": {
    title: "PDF to Image Converter - Extract PDF Pages as PNG or JPG",
    description:
      "Extract PDF pages as high-quality PNG or JPG images. Free converter with no file limits. Works completely offline and secure.",
    keywords: ["pdf to image", "pdf to jpg", "pdf to png", "extract pdf", "convert pdf to image"],
    slug: "pdf-to-image",
    category: "PDF",
    useCases: ["Extract single pages from PDF", "Convert PDF to image format", "Create image previews from PDF"],
  },
  "merge-pdf": {
    title: "Merge PDF Files - Combine Multiple PDFs Online Free",
    description:
      "Merge and combine multiple PDF files into one. Drag to reorder pages. Free, fast, and completely secure. Works offline.",
    keywords: ["merge pdf", "combine pdf", "pdf merger", "join pdf files", "concatenate pdf", "merge multiple pdfs"],
    slug: "merge-pdf",
    category: "PDF",
    useCases: ["Combine multiple PDF reports", "Merge scanned documents", "Combine PDF pages in custom order"],
  },
  "compress-pdf": {
    title: "Compress PDF - Reduce PDF File Size Online",
    description:
      "Compress PDF files and reduce file size while maintaining quality. Free PDF optimizer with no file limits. 100% secure and offline.",
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf", "optimize pdf"],
    slug: "compress-pdf",
    category: "PDF",
    useCases: ["Reduce PDF file size for email", "Optimize PDF for web", "Compress scanned documents"],
  },
  "compress-image": {
    title: "Image Compressor - Compress JPG, PNG, WebP Online Free",
    description:
      "Compress images online instantly. Reduce JPG, PNG, and WebP file sizes by up to 80% while maintaining quality. Free, no limits, offline.",
    keywords: [
      "image compressor",
      "compress image",
      "reduce image size",
      "jpg compressor",
      "png compressor",
      "image optimization",
    ],
    slug: "compress-image",
    category: "Images",
    useCases: [
      "Compress images for faster web loading",
      "Reduce image file sizes for storage",
      "Optimize photos for social media",
    ],
  },
}

export function getToolMetadata(toolSlug: string): Metadata {
  const tool = toolMetadataMap[toolSlug]

  if (!tool) {
    return {
      title: "File Conversion Tool",
      description: "Convert files online",
    }
  }

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords.join(", "),
    alternates: {
      canonical: `https://fileconvert.com/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: "website",
      url: `https://fileconvert.com/tools/${tool.slug}`,
    },
  }
}

export function getToolData(toolSlug: string): ToolPageMetadata | null {
  return toolMetadataMap[toolSlug] || null
}
