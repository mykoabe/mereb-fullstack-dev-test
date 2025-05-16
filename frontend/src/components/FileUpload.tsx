"use client";

import type React from "react";
import { useRef, useState } from "react";
import { uploadCSV } from "@/lib/api";
import ProgressBar from "./ProgressBar";
import ResultCard from "./ResultCard";
import { ErrorAlert } from "./ui/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileUp, AlertCircle } from "lucide-react";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    downloadUrl: string;
    time: number;
    departments: number;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await uploadCSV(selectedFile);

      if (!response.downloadUrl || !response.metrics) {
        throw new Error("Invalid response format");
      }

      setResult({
        downloadUrl: response.downloadUrl,
        time: response.metrics.time,
        departments: response.metrics.departments,
      });
    } catch (err: unknown) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Card
        className={`w-full border-dashed border-2 ${
          isDragging ? "border-primary bg-primary/5" : "hover:border-slate-400"
        } transition-colors cursor-pointer bg-slate-50 dark:bg-slate-900`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div
            className="flex flex-col items-center justify-center py-10"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div
              className={`mb-4 p-4 rounded-full ${
                isDragging ? "bg-primary/10" : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <Upload
                className={`h-10 w-10 ${
                  isDragging ? "text-primary" : "text-slate-500"
                }`}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
              Drag and drop your CSV file here or click to browse
            </p>
            {selectedFile ? (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-full">
                <FileUp className="h-4 w-4" />
                <span>{selectedFile.name}</span>
                <span className="text-xs text-slate-500">
                  ({formatFileSize(selectedFile.size)})
                </span>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
              >
                Select File
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="w-full">
          <ErrorAlert message={error} />
        </div>
      )}

      {selectedFile && !isLoading && !result && (
        <div className="w-full flex flex-col gap-4">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-400">
                Before you proceed
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                Make sure your CSV file contains the required columns:
                Department Name, Date, and Number of Sales.
              </p>
            </div>
          </div>
          <Button
            onClick={handleUpload}
            className="w-full md:w-auto self-center"
          >
            Process CSV File
          </Button>
        </div>
      )}

      {isLoading && <ProgressBar />}
      {result && <ResultCard {...result} />}
    </div>
  );
};

export default FileUpload;
