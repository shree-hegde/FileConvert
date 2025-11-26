"use client"

import { useState } from "react"
import { SchemaMarkup } from "./schema-markup"
import { generateFaqSchema } from "@/lib/schema-generators"

interface FAQItem {
  question: string
  answer: string
}

interface FAQWithSchemaProps {
  faqs: FAQItem[]
}

export function FAQWithSchema({ faqs }: FAQWithSchemaProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <>
      <SchemaMarkup data={generateFaqSchema(faqs)} />
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary transition text-left"
            >
              <h3 className="font-semibold pr-4">{faq.question}</h3>
              <span className="text-muted-foreground flex-shrink-0">{expandedIndex === index ? "−" : "+"}</span>
            </button>
            {expandedIndex === index && (
              <div className="px-4 py-3 border-t border-border bg-secondary/50">
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
