import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { FeaturedTools } from "@/components/featured-tools"
import { ToolCategories } from "@/components/tool-categories"
import { FAQSection } from "@/components/faq-section"
import { SchemaMarkup } from "@/components/schema-markup"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FileConvert - Free Online File Converter | PDF, Image & More",
  description:
    "Convert files online instantly: PDF, JPG, PNG, Excel, Word & more. Fast, secure, offline file converter. No upload limits. Works on any device.",
  keywords:
    "file converter, online converter, pdf converter, image converter, free converter, convert files, merge pdf, compress image",
  openGraph: {
    title: "FileConvert - Fast & Free Online File Conversion",
    description: "Convert files instantly: PDF, Images, ZIP, Word, Excel. No limits, 100% private, works offline.",
    type: "website",
    url: "https://fileconvert.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FileConvert - Free File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FileConvert - Free Online File Converter",
    description: "Convert PDF, images, Word, Excel & more instantly. Free, fast, secure.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://fileconvert.com",
  },
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FileConvert",
    url: "https://fileconvert.com",
    logo: "https://fileconvert.com/logo.png",
    description: "Free online file converter for PDF, images, Word, Excel and more",
    sameAs: [
      "https://twitter.com/fileconvert",
      "https://facebook.com/fileconvert",
      "https://linkedin.com/company/fileconvert",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@fileconvert.com",
    },
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FileConvert",
    description: "Free online file converter tool",
    url: "https://fileconvert.com",
    applicationCategory: "Utility",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SchemaMarkup data={organizationSchema} />
      <SchemaMarkup data={webAppSchema} />
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedTools />
        <ToolCategories />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
