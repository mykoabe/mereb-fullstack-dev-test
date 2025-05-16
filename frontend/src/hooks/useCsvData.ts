"use client"

import { useState, useEffect } from "react"
import type { CsvData } from "@/types/csv"

export function useCsvData(url: string) {
  const [csvData, setCsvData] = useState<CsvData>({ headers: [], rows: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCsvContent = async () => {
      if (!url) return

      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch CSV content")
        }

        const text = await response.text()
        const lines = text.split("\n").filter((line) => line.trim() !== "")

        if (lines.length === 0) {
          throw new Error("CSV file is empty")
        }

        const headers = lines[0].split(",").map((header) => header.trim())
        const rows = lines.slice(1).map((line) => line.split(",").map((cell) => cell.trim()))

        setCsvData({ headers, rows })
      } catch (err) {
        console.error("Error fetching CSV:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCsvContent()
  }, [url])

  return { csvData, loading, error }
}
