import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "File Conversion Tools | FileConvert",
  description: "All our free online file conversion tools in one place. Convert PDF, images, Word, Excel and more.",
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
