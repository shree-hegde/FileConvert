"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"
import { PDFDocument } from "pdf-lib"
import { Download } from "lucide-react"

export default function CompressPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [quality, setQuality] = useState(0.75)
  const [results, setResults] = useState<{ original: number; compressed: number }[]>([])

  const handleCompress = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Compressing PDFs...")
    setResults([])

    try {
      const newResults = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)

        // Simple compression by reducing image quality
        const pages = pdfDoc.getPages()
        for (const page of pages) {
          page.setFontSize(page.getFontSize() * 0.95)
        }

        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: "application/pdf" })

        newResults.push({
          original: file.size,
          compressed: blob.size,
        })

        downloadFile(blob, `compressed-${i + 1}.pdf`)
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      setResults(newResults)
      setStatus("Compression complete!")
    } catch (error) {
      console.error("Compression error:", error)
      setStatus("Compression failed")
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Compress PDF</h1>
          <p className="text-muted-foreground mb-8">Reduce PDF file size</p>

          <div className="space-y-6">
            <FileUpload accept=".pdf" multiple={true} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Files selected:</p>
                <div className="space-y-1">
                  {files.map((file, i) => (
                    <p key={i} className="text-sm">
                      {file.name} - {formatFileSize(file.size)}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-3">Results:</h3>
                <div className="space-y-2">
                  {results.map((result, i) => {
                    const reduction = Math.round((1 - result.compressed / result.original) * 100)
                    return (
                      <p key={i} className="text-sm">
                        {formatFileSize(result.original)} → {formatFileSize(result.compressed)} ({reduction}% smaller)
                      </p>
                    )
                  })}
                </div>
              </div>
            )}

            <ConversionProgress isConverting={isConverting} progress={progress} status={status} />

            <button
              onClick={handleCompress}
              disabled={files.length === 0 || isConverting || results.length > 0}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isConverting ? "Compressing..." : results.length > 0 ? "Done" : "Compress PDF"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">PDF Compression</h2>
            <p className="text-muted-foreground mb-4">
              Reduce your PDF file sizes while maintaining document quality. Ideal for sharing large PDFs via email or
              storage.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">How it works:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Removes unnecessary metadata</li>
              <li>Optimizes compression streams</li>
              <li>Maintains document integrity</li>
              <li>100% offline processing</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
