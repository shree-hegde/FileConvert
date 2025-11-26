"use client"

import { FAQWithSchema } from "./faq-with-schema"

const faqs = [
  {
    question: "Is my file secure? Are files stored after conversion?",
    answer:
      "Yes, your files are completely secure. All conversions happen locally in your browser. We never store or upload your files to any server.",
  },
  {
    question: "Do you have file size limits?",
    answer:
      "No file size limits! The conversion speed depends on your device performance and internet connection for cloud processing.",
  },
  {
    question: "Why do some conversions require upload?",
    answer:
      "Some complex conversions (like PDF to Word) require our cloud processing for accuracy. These files are deleted immediately after conversion.",
  },
  {
    question: "Can I use FileConvert offline?",
    answer:
      "Most tools work completely offline. Image and PDF conversions work 100% offline. Some advanced tools need internet for cloud processing.",
  },
  {
    question: "What formats are supported?",
    answer:
      "We support 50+ formats including PDF, JPG, PNG, WebP, GIF, MP4, MP3, ZIP, DOCX, XLSX, PPTX, and many more.",
  },
  {
    question: "Is there a premium version?",
    answer:
      "FileConvert is completely free. Optional premium features include batch conversion, priority processing, and no ads.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
      <FAQWithSchema faqs={faqs} />
    </section>
  )
}
