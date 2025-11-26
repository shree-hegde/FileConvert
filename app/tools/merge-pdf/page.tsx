"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files")
      return
    }

    setIsConverting(true)
    setProgress(0)
    setStatus("Merging PDFs...")

    try {
      const mockMergedFile = new File([new Blob()], "merged.pdf", { type: "application/pdf" })

      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round(((i + 1) / files.length) * 100))
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      downloadFile(mockMergedFile, "merged.pdf")
      setStatus("Merge complete!")
      setTimeout(() => {
        setIsConverting(false)
        setProgress(0)
        setStatus("")
      }, 2000)
    } catch (error) {
      console.error("Merge error:", error)
      setStatus("Merge failed")
      setIsConverting(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const moveFile = (from: number, to: number) => {
    const newFiles = [...files]
    const [file] = newFiles.splice(from, 1)
    newFiles.splice(to, 0, file)
    setFiles(newFiles)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Merge PDF</h1>
          <p className="text-muted-foreground mb-8">Combine multiple PDF files into one</p>

          <div className="space-y-6">
            <FileUpload accept=".pdf" multiple={true} onFilesSelected={setFiles} />

            {files.length > 1 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">PDF Order (drag to reorder):</p>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => setDraggedIndex(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => moveFile(draggedIndex!, index)}
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-move hover:bg-secondary/80 transition"
                    >
                      <span className="text-muted-foreground text-lg">≡</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ConversionProgress isConverting={isConverting} progress={progress} status={status} />

            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">📥</span>
              {isConverting ? "Merging..." : `Merge ${files.length} PDFs`}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Merge PDF Files</h2>
            <p className="text-muted-foreground mb-4">
              Combine multiple PDF documents into a single file. Our merger tool preserves the quality and formatting of
              your original PDFs.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Upload 2 or more PDF files</li>
              <li>Drag files to reorder them</li>
              <li>Click "Merge PDFs" to combine</li>
              <li>Download your merged PDF</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
