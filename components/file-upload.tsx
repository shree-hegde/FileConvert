"use client"

import type React from "react"

import { useState, useRef } from "react"

interface FileUploadProps {
  accept: string
  maxSize?: number
  onFilesSelected: (files: File[]) => void
  multiple?: boolean
}

export function FileUpload({
  accept,
  maxSize = 100 * 1024 * 1024,
  onFilesSelected,
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter((file) => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Max size: ${maxSize / 1024 / 1024}MB`)
        return false
      }
      return true
    })

    const result = multiple ? newFiles : newFiles.slice(0, 1)
    setFiles(result)
    onFilesSelected(result)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary hover:bg-secondary"
        }`}
      >
        <div className="text-4xl mb-3">📁</div>
        <p className="text-lg font-semibold mb-1">Drop files here or click to browse</p>
        <p className="text-sm text-muted-foreground">Supports {accept}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="ml-2 p-1 hover:bg-primary hover:text-primary-foreground rounded transition text-xl"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
