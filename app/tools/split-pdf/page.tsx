"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"
import { PDFDocument } from "pdf-lib"
import { Download } from "lucide-react"

export default function SplitPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [mode, setMode] = useState<"every" | "range">("every")
  const [everyN, setEveryN] = useState(1)
  const [rangeStart, setRangeStart] = useState(1)
  const [rangeEnd, setRangeEnd] = useState(5)

  const handleSplit = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Splitting PDF...")

    try {
      const file = files[0]
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const totalPages = pdfDoc.getPageCount()

      const pagesToExtract: number[] = []

      if (mode === "every") {
        for (let i = 0; i < totalPages; i += everyN) {
          pagesToExtract.push(i)
        }
      } else {
        const start = Math.max(0, rangeStart - 1)
        const end = Math.min(totalPages, rangeEnd)
        for (let i = start; i < end; i++) {
          pagesToExtract.push(i)
        }
      }

      for (let i = 0; i < pagesToExtract.length; i++) {
        const newPdf = await PDFDocument.create()
        const page = pdfDoc.getPage(pagesToExtract[i])
        const copiedPage = await newPdf.embedPage(page)
        newPdf.addPage([copiedPage.width, copiedPage.height]).drawPage(copiedPage)

        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: "application/pdf" })
        downloadFile(blob, `split-${i + 1}.pdf`)

        setProgress(Math.round(((i + 1) / pagesToExtract.length) * 100))
      }

      setStatus("Split complete!")
      setTimeout(() => {
        setIsConverting(false)
        setProgress(0)
        setStatus("")
      }, 2000)
    } catch (error) {
      console.error("Split error:", error)
      setStatus("Split failed")
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Split PDF</h1>
          <p className="text-muted-foreground mb-8">Extract specific pages from PDF</p>

          <div className="space-y-6">
            <FileUpload accept=".pdf" onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="font-medium mb-3">Split Mode:</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" value="every" checked={mode === "every"} onChange={(e) => setMode("every")} />
                      <div>
                        <p className="font-semibold">Every N Pages</p>
                        <p className="text-sm text-muted-foreground">Extract every nth page</p>
                      </div>
                    </label>
                    {mode === "every" && (
                      <div className="ml-6">
                        <input
                          type="number"
                          min="1"
                          value={everyN}
                          onChange={(e) => setEveryN(Number.parseInt(e.target.value) || 1)}
                          className="w-24 px-3 py-2 border border-border rounded bg-background"
                          placeholder="Every N pages"
                        />
                      </div>
                    )}

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" value="range" checked={mode === "range"} onChange={(e) => setMode("range")} />
                      <div>
                        <p className="font-semibold">Page Range</p>
                        <p className="text-sm text-muted-foreground">Extract specific pages</p>
                      </div>
                    </label>
                    {mode === "range" && (
                      <div className="ml-6 flex gap-2 items-center">
                        <input
                          type="number"
                          min="1"
                          value={rangeStart}
                          onChange={(e) => setRangeStart(Number.parseInt(e.target.value) || 1)}
                          className="w-20 px-3 py-2 border border-border rounded bg-background"
                          placeholder="From"
                        />
                        <span>to</span>
                        <input
                          type="number"
                          min="1"
                          value={rangeEnd}
                          onChange={(e) => setRangeEnd(Number.parseInt(e.target.value) || 5)}
                          className="w-20 px-3 py-2 border border-border rounded bg-background"
                          placeholder="To"
                        />
                      </div>
                    )}
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
              onClick={handleSplit}
              disabled={files.length === 0 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isConverting ? "Splitting..." : "Split PDF"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Split PDF</h2>
            <p className="text-muted-foreground mb-4">
              Extract specific pages or ranges from your PDF. Create smaller PDFs with only the pages you need.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
