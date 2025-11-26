"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"
import { Download } from "lucide-react"

export default function PngToWebpPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [quality, setQuality] = useState(80)

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Converting PNG to WebP...")

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: file.type })
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")!
          ctx.drawImage(img, 0, 0)

          canvas.toBlob(
            (webpBlob) => {
              if (webpBlob) {
                const filename = file.name.replace(/\.[^.]+$/, ".webp")
                downloadFile(webpBlob, filename)
              }
              setProgress(Math.round(((i + 1) / files.length) * 100))
              URL.revokeObjectURL(url)
            },
            "image/webp",
            quality / 100,
          )
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
          <h1 className="text-4xl font-bold mb-2">PNG to WebP</h1>
          <p className="text-muted-foreground mb-8">Convert PNG images to modern WebP format</p>

          <div className="space-y-6">
            <FileUpload accept=".png" multiple={true} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <label className="block mb-2">
                    <span className="font-semibold">Quality: {quality}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number.parseInt(e.target.value))}
                    className="w-full"
                    disabled={isConverting}
                  />
                </div>

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
              </div>
            )}

            <ConversionProgress isConverting={isConverting} progress={progress} status={status} />

            <button
              onClick={handleConvert}
              disabled={files.length === 0 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isConverting ? "Converting..." : "Convert to WebP"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">PNG to WebP Conversion</h2>
            <p className="text-muted-foreground mb-4">
              Convert PNG images to WebP format for web optimization. WebP provides superior compression while
              maintaining quality, resulting in faster page loads.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">WebP Benefits:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>25-35% smaller file sizes than PNG</li>
              <li>Better compression efficiency</li>
              <li>Supports transparency and animation</li>
              <li>Perfect for web optimization</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
