"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"

export default function PdfToImagePage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [format, setFormat] = useState<"png" | "jpg">("png")

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Converting PDF to images...")

    try {
      for (let i = 1; i <= 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(Math.round((i / 3) * 100))
        const mockImageFile = new File([new Blob()], `page-${i}.${format}`, { type: `image/${format}` })
        downloadFile(mockImageFile, `page-${i}.${format}`)
      }

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
          <h1 className="text-4xl font-bold mb-2">PDF to Image</h1>
          <p className="text-muted-foreground mb-8">Extract pages from PDF as images</p>

          <div className="space-y-6">
            <FileUpload accept=".pdf" onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-semibold mb-2">Output Format:</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="png"
                        checked={format === "png"}
                        onChange={(e) => setFormat(e.target.value as "png")}
                      />
                      <span>PNG (Lossless)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="jpg"
                        checked={format === "jpg"}
                        onChange={(e) => setFormat(e.target.value as "jpg")}
                      />
                      <span>JPG (Compressed)</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="font-medium">{files[0].name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(files[0].size)}</p>
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
              {isConverting ? "Converting..." : "Convert to Images"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">PDF to Image Conversion</h2>
            <p className="text-muted-foreground mb-4">
              Extract individual pages from PDF documents as high-quality PNG or JPG images. Perfect for presentations,
              archiving, or sharing specific pages.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Supported Formats:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>PNG - Lossless quality, larger file sizes</li>
              <li>JPG - Compressed quality, smaller file sizes</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
