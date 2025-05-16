"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadCSV } from "@/lib/api";
import type { ProcessingResult } from "@/types/csv";
import { ResultCard } from "./ResultCard";
import { FileUploadArea } from "./FileUploadArea";
import { UploadWarning } from "./UploadWarning";
import { ErrorAlert } from "../ui/ErrorAlert";
import { ProgressBar } from "../ui/ProgressBar";

export function FileUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError("");
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

  return (
    <div className="flex flex-col items-center gap-6">
      <FileUploadArea
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        setError={setError}
      />

      {error && (
        <div className="w-full">
          <ErrorAlert message={error} />
        </div>
      )}

      {selectedFile && !isLoading && !result && (
        <div className="w-full flex flex-col gap-4">
          <UploadWarning />
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
}
