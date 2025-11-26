"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { formatFileSize } from "@/lib/file-utils"
import { Download } from "lucide-react"

export default function WordToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Converting Word to PDF...")

    try {
      const file = files[0]
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/convert/word-to-pdf", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Conversion failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name.replace(/\.[^.]+$/, ".pdf")
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setProgress(100)
      setStatus("Conversion complete!")
      setTimeout(() => {
        setIsConverting(false)
        setProgress(0)
        setStatus("")
      }, 2000)
    } catch (error) {
      console.error("Conversion error:", error)
      setStatus("Conversion failed")
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Word to PDF</h1>
          <p className="text-muted-foreground mb-8">Convert DOCX documents to PDF format</p>

          <div className="space-y-6">
            <FileUpload accept=".docx,.doc" onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="font-medium">{files[0].name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(files[0].size)}</p>
              </div>
            )}

            <div className="p-4 bg-accent/10 border border-accent rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> This conversion requires cloud processing. Your file is encrypted and deleted
                immediately after conversion.
              </p>
            </div>

            <ConversionProgress isConverting={isConverting} progress={progress} status={status} />

            <button
              onClick={handleConvert}
              disabled={files.length === 0 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isConverting ? "Converting..." : "Convert to PDF"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Word to PDF Conversion</h2>
            <p className="text-muted-foreground mb-4">
              Convert Microsoft Word documents (DOCX, DOC) to PDF format. Perfect for sharing documents that need to
              look the same on any device.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Supports DOCX and legacy DOC files</li>
              <li>Preserves formatting and layouts</li>
              <li>Maintains fonts and images</li>
              <li>Fast cloud processing</li>
              <li>Secure encryption in transit</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
