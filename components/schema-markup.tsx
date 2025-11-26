interface SchemaMarkupProps {
  data: Record<string, any>
}

export function SchemaMarkup({ data }: SchemaMarkupProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": data.type || "WebApplication",
    ...data,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
