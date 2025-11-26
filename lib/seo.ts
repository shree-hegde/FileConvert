export interface SeoMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  schema?: Record<string, any>
}

export function generateMetadata(metadata: SeoMetadata) {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords.join(", "),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "website",
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : [],
    },
    alternates: metadata.canonical ? { canonical: metadata.canonical } : undefined,
  }
}

export function generateSchemaMarkup(data: Record<string, any>) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": data.type || "WebPage",
      ...data,
    }),
  }
}

export const toolMetadata: Record<string, SeoMetadata> = {
  "image-to-pdf": {
    title: "Image to PDF Converter - Convert JPG, PNG, WebP to PDF",
    description:
      "Convert images (JPG, PNG, WebP) to PDF instantly. Free, fast, and secure. No file upload limits. Works offline.",
    keywords: [
      "image to pdf",
      "jpg to pdf",
      "png to pdf",
      "webp to pdf",
      "convert image to pdf",
      "online image to pdf converter",
    ],
    canonical: "/tools/image-to-pdf",
  },
  "pdf-to-image": {
    title: "PDF to Image Converter - Extract Pages as PNG or JPG",
    description:
      "Extract PDF pages as high-quality PNG or JPG images. Free converter with no limits. Works completely offline.",
    keywords: ["pdf to image", "pdf to jpg", "pdf to png", "extract pdf pages", "convert pdf to image"],
    canonical: "/tools/pdf-to-image",
  },
  "merge-pdf": {
    title: "Merge PDF Files - Combine Multiple PDFs Online",
    description: "Merge multiple PDF files into one. Free, fast, and secure. Drag to reorder pages. No file limits.",
    keywords: ["merge pdf", "combine pdf", "pdf merger", "merge multiple pdfs", "join pdf files"],
    canonical: "/tools/merge-pdf",
  },
  "compress-pdf": {
    title: "Compress PDF - Reduce PDF File Size Online",
    description:
      "Compress PDF files and reduce their size while maintaining quality. Free tool, no limits, 100% secure.",
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "make pdf smaller", "shrink pdf"],
    canonical: "/tools/compress-pdf",
  },
  "split-pdf": {
    title: "Split PDF - Extract Pages from PDF",
    description: "Extract specific pages or ranges from PDF files. Free tool with multiple split modes.",
    keywords: ["split pdf", "extract pdf pages", "pdf splitter", "divide pdf", "separate pdf pages"],
    canonical: "/tools/split-pdf",
  },
  "compress-image": {
    title: "Image Compressor - Reduce Image File Size",
    description:
      "Compress JPG, PNG, and WebP images instantly. Reduce file sizes by up to 80% while maintaining quality.",
    keywords: [
      "image compressor",
      "compress image",
      "reduce image size",
      "image optimization",
      "compress jpg png webp",
    ],
    canonical: "/tools/compress-image",
  },
  "resize-image": {
    title: "Image Resizer - Resize Images by Percentage or Dimensions",
    description: "Resize images to specific dimensions or percentages. Fast, free, offline image resizing tool.",
    keywords: ["image resizer", "resize image", "change image size", "crop image", "scale image"],
    canonical: "/tools/resize-image",
  },
  "jpg-to-png": {
    title: "JPG to PNG Converter - Convert JPEG to PNG",
    description: "Convert JPG/JPEG images to PNG format instantly. Free converter with no quality loss.",
    keywords: ["jpg to png", "jpeg to png", "convert jpg to png", "jpg to png converter"],
    canonical: "/tools/jpg-to-png",
  },
  "png-to-webp": {
    title: "PNG to WebP Converter - Optimize Images",
    description: "Convert PNG images to WebP for web optimization. Reduce file sizes by 25-35% compared to PNG.",
    keywords: ["png to webp", "webp converter", "image optimization", "web image format"],
    canonical: "/tools/png-to-webp",
  },
  "zip-unzip": {
    title: "ZIP & Unzip Tool - Create and Extract Archives",
    description: "Create ZIP archives or extract files from ZIP. Free, fast, offline compression and extraction.",
    keywords: ["zip tool", "unzip tool", "create zip", "extract zip", "archive tool", "compression tool"],
    canonical: "/tools/zip-unzip",
  },
  "word-to-pdf": {
    title: "Word to PDF Converter - Convert DOCX to PDF",
    description: "Convert Word documents (DOCX, DOC) to PDF. Preserve formatting and maintain document integrity.",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "doc to pdf"],
    canonical: "/tools/word-to-pdf",
  },
  "pdf-to-word": {
    title: "PDF to Word Converter - Convert PDF to DOCX",
    description: "Convert PDF documents to editable Word format. Extract text and maintain formatting.",
    keywords: ["pdf to word", "pdf to docx", "convert pdf to word", "pdf to doc", "pdf extraction"],
    canonical: "/tools/pdf-to-word",
  },
  "excel-to-pdf": {
    title: "Excel to PDF Converter - Convert XLSX Spreadsheets",
    description: "Convert Excel spreadsheets (XLSX, XLS) to PDF. Preserve formatting and data integrity.",
    keywords: ["excel to pdf", "xlsx to pdf", "spreadsheet to pdf", "xls to pdf"],
    canonical: "/tools/excel-to-pdf",
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter - Extract Tables from PDF",
    description: "Extract data and tables from PDF to Excel format. Perfect for data analysis and reporting.",
    keywords: ["pdf to excel", "pdf to xlsx", "extract tables from pdf", "pdf data extraction"],
    canonical: "/tools/pdf-to-excel",
  },
}

export function getToolMetadata(toolSlug: string): SeoMetadata {
  return (
    toolMetadata[toolSlug] || {
      title: "File Converter Tool - FileConvert",
      description: "Fast, free file conversion tool",
      keywords: ["file converter", "online conversion"],
    }
  )
}
