import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { SchemaMarkup } from "@/components/schema-markup"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF Conversion Tools | FileConvert - Merge, Compress, Split PDFs",
  description:
    "Free online PDF tools: merge PDFs, compress files, split pages, convert PDF to images or Word. Fast, secure, offline processing.",
  keywords: "pdf converter, merge pdf, compress pdf, split pdf, pdf tools, convert pdf",
  openGraph: {
    title: "PDF Tools - FileConvert",
    description: "Free PDF conversion and manipulation tools",
    type: "website",
  },
  alternates: {
    canonical: "https://fileconvert.com/tools/pdf",
  },
}

const pdfTools = [
  {
    name: "Merge PDF",
    href: "/tools/merge-pdf",
    description: "Combine multiple PDF files into one document",
    icon: "📎",
  },
  {
    name: "Compress PDF",
    href: "/tools/compress-pdf",
    description: "Reduce PDF file size while maintaining quality",
    icon: "📦",
  },
  {
    name: "Split PDF",
    href: "/tools/split-pdf",
    description: "Extract specific pages from PDF documents",
    icon: "✂️",
  },
  {
    name: "PDF to Image",
    href: "/tools/pdf-to-image",
    description: "Convert PDF pages to PNG or JPG images",
    icon: "🖼️",
  },
  {
    name: "PDF to Word",
    href: "/tools/pdf-to-word",
    description: "Convert PDF to editable Word documents",
    icon: "📄",
  },
  {
    name: "PDF to Excel",
    href: "/tools/pdf-to-excel",
    description: "Extract tables and data from PDFs to Excel",
    icon: "📊",
  },
]

const categorySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "PDF Conversion Tools",
  description:
    "Collection of free PDF conversion and manipulation tools including merge, compress, split, and format conversion.",
  url: "https://fileconvert.com/tools/pdf",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: pdfTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://fileconvert.com${tool.href}`,
    })),
  },
}

export default function PDFToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={categorySchema} />
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "PDF" }]} />

          <h1 className="text-4xl font-bold mb-3">PDF Conversion Tools</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Complete suite of free online PDF tools for merging, compressing, splitting, and converting PDF documents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {pdfTools.map((tool) => (
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
            <h2 className="text-2xl font-bold mb-4">Why Choose Our PDF Tools?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>100% Free - No registration or payment required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Completely Offline - Your files never leave your device</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>No File Limits - Process files of any size</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Privacy Focused - We never store or analyze your documents</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
