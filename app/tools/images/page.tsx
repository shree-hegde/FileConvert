import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { SchemaMarkup } from "@/components/schema-markup"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image Conversion Tools | FileConvert - Compress, Convert, Resize Images",
  description:
    "Free online image tools: convert JPG to PNG, compress images, resize, convert to WebP. Fast, secure, offline image processing.",
  keywords: "image converter, compress image, image resizer, jpg to png, image tools",
  openGraph: {
    title: "Image Tools - FileConvert",
    description: "Free image conversion and optimization tools",
    type: "website",
  },
  alternates: {
    canonical: "https://fileconvert.com/tools/images",
  },
}

const imageTools = [
  {
    name: "Compress Image",
    href: "/tools/compress-image",
    description: "Reduce image file size while maintaining quality",
    icon: "📦",
  },
  {
    name: "Image to PDF",
    href: "/tools/image-to-pdf",
    description: "Convert JPG, PNG, WebP images to PDF documents",
    icon: "📄",
  },
  {
    name: "Resize Image",
    href: "/tools/resize-image",
    description: "Resize images by percentage or custom dimensions",
    icon: "📐",
  },
  {
    name: "JPG to PNG",
    href: "/tools/jpg-to-png",
    description: "Convert JPEG images to PNG format with transparency",
    icon: "🔄",
  },
  {
    name: "PNG to WebP",
    href: "/tools/png-to-webp",
    description: "Convert PNG to modern WebP format for better compression",
    icon: "⚡",
  },
]

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Image Conversion Tools",
  description: "Collection of free image conversion and optimization tools.",
  url: "https://fileconvert.com/tools/images",
}

export default function ImageToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={categorySchema} />
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Images" }]} />

          <h1 className="text-4xl font-bold mb-3">Image Conversion Tools</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Complete suite of free online image tools for converting, compressing, and optimizing images.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {imageTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-6 border border-border rounded-lg hover:shadow-lg hover:border-primary transition"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition">{tool.name}</h2>
                <p className="text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>

          <div className="bg-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Image Optimization Benefits</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Faster Website Loading - Smaller image files improve page speed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Reduced Storage Costs - Save space on servers and devices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Better Performance - Lower bandwidth usage for downloads</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>SEO Improvement - Fast-loading images boost search rankings</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
