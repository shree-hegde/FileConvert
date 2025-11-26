"use client"

interface JsonLdProps {
  type: string
  name?: string
  description?: string
  url?: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: { type: string; name: string }
  [key: string]: any
}

export function JsonLd({ type, ...rest }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...rest,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
