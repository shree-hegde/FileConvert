"use client"

import Link from "next/link"

const tools = [
  {
    id: 1,
    name: "Image to PDF",
    description: "Convert JPG, PNG, or WebP to PDF instantly",
    href: "/tools/image-to-pdf",
    emoji: "🖼️",
  },
  {
    id: 2,
    name: "PDF to Image",
    description: "Extract images from PDF as PNG, JPG, or WebP",
    href: "/tools/pdf-to-image",
    emoji: "📄",
  },
  {
    id: 3,
    name: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    href: "/tools/compress-pdf",
    emoji: "⚡",
  },
  {
    id: 4,
    name: "Merge PDF",
    description: "Combine multiple PDF files into one",
    href: "/tools/merge-pdf",
    emoji: "📎",
  },
  {
    id: 5,
    name: "Image Compressor",
    description: "Reduce image file size instantly",
    href: "/tools/compress-image",
    emoji: "🗜️",
  },
  {
    id: 6,
    name: "ZIP & Unzip",
    description: "Create or extract zip archives online",
    href: "/tools/zip-unzip",
    emoji: "📦",
  },
]

export function FeaturedTools() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tools</h2>
        <p className="text-muted-foreground text-lg">Try our most-used conversion tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group p-6 rounded-lg border border-border hover:border-primary hover:bg-secondary transition-all hover:shadow-lg"
          >
            <div className="mb-4 text-3xl group-hover:scale-110 transition-transform inline-block">{tool.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
            <p className="text-muted-foreground text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
