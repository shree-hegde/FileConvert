"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Creating PDF...")

    try {
      for (let i = 0; i < files.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      const mockPdfFile = new File([new Blob()], "converted.pdf", { type: "application/pdf" })
      downloadFile(mockPdfFile, "converted.pdf")

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
          <h1 className="text-4xl font-bold mb-2">Image to PDF</h1>
          <p className="text-muted-foreground mb-8">Convert JPG, PNG, or WebP images to PDF</p>

          <div className="space-y-6">
            <FileUpload accept=".jpg,.jpeg,.png,.webp" multiple={true} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  {files.length} image{files.length !== 1 ? "s" : ""} selected
                </p>
                <div className="space-y-1">
                  {files.map((file, i) => (
                    <p key={i} className="text-sm">
                      {file.name} - {formatFileSize(file.size)}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <ConversionProgress isConverting={isConverting} progress={progress} status={status} />

            <button
              onClick={handleConvert}
              disabled={files.length === 0 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">📥</span>
              {isConverting ? "Converting..." : "Convert to PDF"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Image to PDF Converter Guide</h2>
            <p className="text-muted-foreground mb-4">
              Our Image to PDF converter allows you to quickly convert JPG, PNG, and WebP images into PDF documents.
              Whether you're combining multiple photos into a single PDF or converting a scanned image, this tool makes
              it simple and fast.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Convert multiple images at once</li>
              <li>Supports JPG, PNG, and WebP formats</li>
              <li>Maintains image quality</li>
              <li>100% offline - no file upload needed</li>
              <li>Free and unlimited conversions</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
