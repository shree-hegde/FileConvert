"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload"
import { ConversionProgress } from "@/components/conversion-progress"
import { downloadFile, formatFileSize } from "@/lib/file-utils"
import JSZip from "jszip"
import { Download } from "lucide-react"

type Mode = "zip" | "unzip"

export default function ZipUnzipPage() {
  const [mode, setMode] = useState<Mode>("zip")
  const [files, setFiles] = useState<File[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")

  const handleZip = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Creating ZIP archive...")

    try {
      const zip = new JSZip()

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const buffer = await file.arrayBuffer()
        zip.file(file.name, buffer)
        setProgress(Math.round(((i + 1) / files.length) * 50))
      }

      const blob = await zip.generateAsync({ type: "blob" })
      downloadFile(blob, "archive.zip")

      setStatus("ZIP created successfully!")
      setTimeout(() => {
        setIsConverting(false)
        setProgress(0)
        setStatus("")
      }, 2000)
    } catch (error) {
      console.error("ZIP error:", error)
      setStatus("ZIP creation failed")
      setIsConverting(false)
    }
  }

  const handleUnzip = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setStatus("Extracting ZIP...")

    try {
      const file = files[0]
      const buffer = await file.arrayBuffer()
      const zip = new JSZip()
      await zip.loadAsync(buffer)

      const fileArray = Object.values(zip.files)
      let index = 0

      zip.forEach((relativePath, file) => {
        if (!file.dir) {
          file.async("blob").then((blob) => {
            downloadFile(blob, relativePath)
            index++
            setProgress(Math.round((index / fileArray.length) * 100))
          })
        }
      })

      setStatus("Extraction complete!")
      setTimeout(() => {
        setIsConverting(false)
        setProgress(0)
        setStatus("")
      }, 2000)
    } catch (error) {
      console.error("Unzip error:", error)
      setStatus("Extraction failed")
      setIsConverting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">ZIP & Unzip</h1>
          <p className="text-muted-foreground mb-8">Create and extract ZIP archives</p>

          <div className="space-y-6">
            <div className="flex gap-2 bg-secondary p-1 rounded-lg w-fit">
              <button
                onClick={() => {
                  setMode("zip")
                  setFiles([])
                }}
                className={`px-4 py-2 rounded font-semibold transition ${
                  mode === "zip" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Create ZIP
              </button>
              <button
                onClick={() => {
                  setMode("unzip")
                  setFiles([])
                }}
                className={`px-4 py-2 rounded font-semibold transition ${
                  mode === "unzip"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Extract ZIP
              </button>
            </div>

            <FileUpload accept={mode === "zip" ? "*" : ".zip"} multiple={mode === "zip"} onFilesSelected={setFiles} />

            {files.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  {files.length} file{files.length !== 1 ? "s" : ""} selected
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
              onClick={mode === "zip" ? handleZip : handleUnzip}
              disabled={files.length === 0 || isConverting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {isConverting ? "Processing..." : mode === "zip" ? "Create ZIP" : "Extract ZIP"}
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">ZIP & Unzip Tool</h2>
            <p className="text-muted-foreground mb-4">
              Create compressed ZIP archives from multiple files or extract files from existing ZIP archives. All
              processing happens on your device.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Create ZIP from multiple files</li>
              <li>Extract files from ZIP archives</li>
              <li>100% offline processing</li>
              <li>No file size limits</li>
              <li>Fast compression and extraction</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
