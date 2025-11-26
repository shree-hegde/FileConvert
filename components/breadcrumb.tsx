import Link from "next/link"
import { SchemaMarkup } from "./schema-markup"
import { generateBreadcrumbSchema } from "@/lib/schema-generators"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaItems = items
    .filter((item) => item.href)
    .map((item) => ({
      name: item.label,
      url: `https://fileconvert.com${item.href}`,
    }))

  return (
    <>
      <SchemaMarkup data={generateBreadcrumbSchema(schemaItems)} />
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
