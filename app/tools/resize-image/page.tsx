"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"
import { Download } from "lucide-react"

export default function ResizeImagePage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [mode, setMode] = useState<"percentage" | "dimensions">("percentage")
  const [percentage, setPercentage] = useState(50)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [maintainAspect, setMaintainAspect] = useState(true)

  const handleResize = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Resizing images...")

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: file.type })
        const url = URL.createObjectURL(blob)
        const img = new Image()

        img.onload = () => {
          const canvas = document.createElement("canvas")
          let newWidth = width
          let newHeight = height

          if (mode === "percentage") {
            newWidth = Math.round(img.width * (percentage / 100))
            newHeight = Math.round(img.height * (percentage / 100))
          } else if (maintainAspect) {
            const ratio = img.height / img.width
            newHeight = Math.round(newWidth * ratio)
          }

          canvas.width = newWidth
          canvas.height = newHeight
          const ctx = canvas.getContext("2d")!
          ctx.drawImage(img, 0, 0, newWidth, newHeight)

          canvas.toBlob((resizedBlob) => {
            if (resizedBlob) {
              const ext = file.name.split(".").pop() || "jpg"
              downloadFile(resizedBlob, `resized-${i + 1}.${ext}`)
            }
            setProgress(Math.round(((i + 1) / files.length) * 100))
            URL.revokeObjectURL(url)
          }, file.type)
        }

        img.src = url
      }

      setStatus("Resize complete!")
      setTimeout(() => {
        setIsConverting(false)
        setProgress(0)
        setStatus("")
      }, 2000)
    } catch (error) {
      console.error("Resize error:", error)
      setStatus("Resize failed")
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Image Resizer</h1>
          <p className="text-muted-foreground mb-8">Resize images to specific dimensions</p>

          <div className="space-y-6">
            <FileUpload accept=".jpg,.jpeg,.png,.webp" multiple={true} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="font-semibold mb-4">Resize Mode:</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="percentage"
                        checked={mode === "percentage"}
                        onChange={(e) => setMode("percentage")}
                      />
                      <span>By Percentage</span>
                    </label>
                    {mode === "percentage" && (
                      <div className="ml-6 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="10"
                            max="200"
                            step="10"
                            value={percentage}
                            onChange={(e) => setPercentage(Number.parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="w-12 text-center">{percentage}%</span>
                        </div>
                      </div>
                    )}

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="dimensions"
                        checked={mode === "dimensions"}
                        onChange={(e) => setMode("dimensions")}
                      />
                      <span>By Dimensions</span>
                    </label>
                    {mode === "dimensions" && (
                      <div className="ml-6 space-y-2">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-sm text-muted-foreground">Width (px)</label>
                            <input
                              type="number"
                              value={width}
                              onChange={(e) => setWidth(Number.parseInt(e.target.value) || 800)}
                              className="w-full px-3 py-2 border border-border rounded bg-background"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-muted-foreground">Height (px)</label>
                            <input
                              type="number"
                              value={height}
                              onChange={(e) => setHeight(Number.parseInt(e.target.value) || 600)}
                              className="w-full px-3 py-2 border border-border rounded bg-background"
                              disabled={maintainAspect}
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={maintainAspect}
                            onChange={(e) => setMaintainAspect(e.target.checked)}
                          />
                          <span className="text-sm">Maintain aspect ratio</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Files:</p>
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
              onClick={handleResize}
              disabled={files.length === 0 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isConverting ? "Resizing..." : "Resize Images"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Image Resizer</h2>
            <p className="text-muted-foreground mb-4">
              Quickly resize your images by percentage or specific dimensions. Perfect for preparing images for web,
              social media, or printing.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
