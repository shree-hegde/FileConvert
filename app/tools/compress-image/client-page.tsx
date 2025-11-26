"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { SchemaMarkup } from "@/components/schema-markup"
import { downloadFile, formatFileSize } from "@/lib/file-utils"

// <CHANGE> Added schema markup for how-to guide
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress Images",
  description: "A guide to compressing images while maintaining quality using FileConvert",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload Images",
      text: "Upload your JPG, PNG, or WebP images to the compressor",
    },
    {
      "@type": "HowToStep",
      name: "Adjust Quality",
      text: "Use the quality slider to set your desired compression level",
    },
    {
      "@type": "HowToStep",
      name: "Compress",
      text: "Click the Compress Images button to start compression",
    },
    {
      "@type": "HowToStep",
      name: "Download",
      text: "Download your compressed images immediately",
    },
  ],
}

export function CompressImageClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [quality, setQuality] = useState(0.8)
  const [results, setResults] = useState<{ original: number; compressed: number; file: File }[]>([])

  const handleCompress = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Compressing images...")
    setResults([])

    try {
      const newResults = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const canvas = document.createElement("canvas")
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  newResults.push({
                    original: file.size,
                    compressed: blob.size,
                    file: new File([blob], file.name, { type: file.type }),
                  })
                }
              },
              file.type,
              quality,
            )
          }
        }
        img.src = URL.createObjectURL(file)

        await new Promise((resolve) => setTimeout(resolve, 500))
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      setTimeout(() => {
        setResults(newResults)
        setStatus("Compression complete!")
      }, 1000)
    } catch (error) {
      console.error("Compression error:", error)
      setStatus("Compression failed")
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={howToSchema} />
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* <CHANGE> Added breadcrumb navigation for SEO and UX */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition">
              Home
            </a>
            <span>/</span>
            <a href="/tools" className="hover:text-foreground transition">
              Tools
            </a>
            <span>/</span>
            <span>Compress Image</span>
          </nav>

          <h1 className="text-4xl font-bold mb-2">Image Compressor</h1>
          <p className="text-muted-foreground mb-8">Reduce image file size while maintaining quality</p>

          <div className="space-y-6">
            <FileUpload accept=".jpg,.jpeg,.png,.webp" multiple={true} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-semibold">Quality: {Math.round(quality * 100)}%</label>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(Number.parseFloat(e.target.value))}
                    className="w-full"
                    disabled={isConverting}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {quality < 0.5
                      ? "Low quality, smaller files"
                      : quality < 0.8
                        ? "Balanced"
                        : "High quality, larger files"}
                  </p>
                </div>

                {results.length === 0 && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Files to compress:</p>
                    <div className="space-y-1">
                      {files.map((file, i) => (
                        <p key={i} className="text-sm">
                          {file.name} - {formatFileSize(file.size)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-3">
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-3">Compression Results:</h3>
                  <div className="space-y-2">
                    {results.map((result, i) => {
                      const reduction = Math.round((1 - result.compressed / result.original) * 100)
                      return (
                        <div key={i} className="flex items-center justify-between p-2 bg-background rounded">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{files[i].name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(result.original)} → {formatFileSize(result.compressed)} ({reduction}%
                              smaller)
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              downloadFile(result.file, `compressed-${i}.${files[i].name.split(".").pop()}`)
                            }
                            className="ml-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition"
                          >
                            Download
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            <ConversionProgress isConverting={isConverting} progress={progress} status={status} />

            <button
              onClick={handleCompress}
              disabled={files.length === 0 || isConverting || results.length > 0}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">📥</span>
              {isConverting ? "Compressing..." : results.length > 0 ? "Done" : "Compress Images"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Image Compression</h2>
            <p className="text-muted-foreground mb-4">
              Reduce your image file sizes instantly without losing quality. Perfect for optimizing images for web,
              email, or storage.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Supported Formats:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>JPG/JPEG</li>
              <li>PNG</li>
              <li>WebP</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
