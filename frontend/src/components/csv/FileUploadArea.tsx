"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileUp } from "lucide-react"
import { formatFileSize, validateCsvFile } from "@/utils/file"

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  setError: (error: string) => void
}

export function FileUploadArea({ onFileSelect, selectedFile, setError }: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!validateCsvFile(file)) {
        setError("Please upload a CSV file")
        return
      }
      onFileSelect(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (!validateCsvFile(file)) {
        setError("Please upload a CSV file")
        return
      }
      onFileSelect(file)
    }
  }

  return (
    <Card
      className={`w-full border-dashed border-2 ${
        isDragging ? "border-primary bg-primary/5" : "hover:border-slate-400"
      } transition-colors cursor-pointer bg-slate-50 dark:bg-slate-900`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-10" onClick={triggerFileInput}>
          <input type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
          <div className={`mb-4 p-4 rounded-full ${isDragging ? "bg-primary/10" : "bg-slate-100 dark:bg-slate-800"}`}>
            <Upload className={`h-10 w-10 ${isDragging ? "text-primary" : "text-slate-500"}`} />
          </div>
          <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
            Drag and drop your CSV file here or click to browse
          </p>
          {selectedFile ? (
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-full">
              <FileUp className="h-4 w-4" />
              <span>{selectedFile.name}</span>
              <span className="text-xs text-slate-500">({formatFileSize(selectedFile.size)})</span>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                triggerFileInput()
              }}
            >
              Select File
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
