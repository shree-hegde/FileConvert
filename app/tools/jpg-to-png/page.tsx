"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"
import { Download } from "lucide-react"

export default function JpgToPngPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Converting JPG to PNG...")

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: "image/jpeg" })
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")!
          ctx.drawImage(img, 0, 0)

          canvas.toBlob((pngBlob) => {
            if (pngBlob) {
              const filename = file.name.replace(/\.[^.]+$/, ".png")
              downloadFile(pngBlob, filename)
            }
            setProgress(Math.round(((i + 1) / files.length) * 100))
            URL.revokeObjectURL(url)
          }, "image/png")
        }

        img.src = url
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
          <h1 className="text-4xl font-bold mb-2">JPG to PNG</h1>
          <p className="text-muted-foreground mb-8">Convert JPEG images to PNG format</p>

          <div className="space-y-6">
            <FileUpload accept=".jpg,.jpeg" multiple={true} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">{files.length} file(s) selected:</p>
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
              <Download size={20} />
              {isConverting ? "Converting..." : "Convert to PNG"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">JPG to PNG Conversion</h2>
            <p className="text-muted-foreground mb-4">
              Convert your JPEG images to PNG format. PNG provides lossless compression and supports transparency,
              making it ideal for images with sharp edges and text.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Why PNG?</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Lossless compression - no quality loss</li>
              <li>Supports transparency (alpha channel)</li>
              <li>Better for graphics and text</li>
              <li>No quality reduction during conversion</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
