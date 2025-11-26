import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

const allTools = [
  {
    category: "Image Converters",
    tools: [
      { name: "Image to PDF", slug: "image-to-pdf", desc: "Convert images to PDF" },
      { name: "JPG to PNG", slug: "jpg-to-png", desc: "JPG to PNG conversion" },
      { name: "PNG to WebP", slug: "png-to-webp", desc: "PNG to WebP conversion" },
      { name: "Image Compressor", slug: "compress-image", desc: "Reduce image size" },
      { name: "Image Resizer", slug: "resize-image", desc: "Resize images" },
    ],
  },
  {
    category: "PDF Tools",
    tools: [
      { name: "PDF to Image", slug: "pdf-to-image", desc: "Extract images from PDF" },
      { name: "Merge PDF", slug: "merge-pdf", desc: "Combine PDFs" },
      { name: "Split PDF", slug: "split-pdf", desc: "Split PDF files" },
      { name: "Compress PDF", slug: "compress-pdf", desc: "Reduce PDF size" },
      { name: "PDF to Word", slug: "pdf-to-word", desc: "PDF to DOCX" },
    ],
  },
  {
    category: "Format Converters",
    tools: [
      { name: "PDF to Excel", slug: "pdf-to-excel", desc: "PDF to XLSX" },
      { name: "PDF to PPT", slug: "pdf-to-ppt", desc: "PDF to PowerPoint" },
      { name: "Word to PDF", slug: "word-to-pdf", desc: "DOCX to PDF" },
      { name: "Excel to PDF", slug: "excel-to-pdf", desc: "XLSX to PDF" },
    ],
  },
  {
    category: "File Utilities",
    tools: [
      { name: "ZIP & Unzip", slug: "zip-unzip", desc: "Compress & extract" },
      { name: "File Compressor", slug: "file-compressor", desc: "Reduce any file" },
      { name: "Video Converter", slug: "video-converter", desc: "Convert videos" },
      { name: "Audio Converter", slug: "audio-converter", desc: "Convert audio" },
    ],
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">All Conversion Tools</h1>
        <p className="text-muted-foreground mb-12">Browse our complete collection of file conversion tools</p>

        <div className="grid gap-12">
          {allTools.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-secondary transition"
                  >
                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
