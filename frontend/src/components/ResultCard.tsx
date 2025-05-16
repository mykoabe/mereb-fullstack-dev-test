"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Database, Download, Eye, FileText, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ResultProps {
  downloadUrl: string
  time: number
  departments: number
}

const ResultCard: React.FC<ResultProps> = ({ downloadUrl, time, departments }) => {
  const baseURL = process.env.NEXT_PUBLIC_FILE_BASE_URL || ""
  const fullDownloadUrl = downloadUrl.startsWith("http") ? downloadUrl : `${baseURL}${downloadUrl}`
  const [csvData, setCsvData] = useState<{ headers: string[]; rows: string[][] }>({ headers: [], rows: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCsvContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(fullDownloadUrl)
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
  }, [fullDownloadUrl])

  return (
    <Card className="w-full shadow-md bg-white dark:bg-slate-800 border-green-100 dark:border-green-900">
      <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 dark:bg-green-800 p-1.5 rounded-full">
              <Check className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <CardTitle className="text-green-700 dark:text-green-400">Processing Complete</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.open(fullDownloadUrl, "_blank")}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <CardDescription>
          Your CSV file has been successfully processed. You can view the results below or download the file.
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="summary">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview Data
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="summary" className="pt-2 px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                <Database className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Departments</p>
                <p className="text-xl font-semibold">{departments}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Processing Time</p>
                <p className="text-xl font-semibold">{time} ms</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Processing Summary</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>CSV file successfully processed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Sales data aggregated by department</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Result file generated and ready for download</span>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="pt-2 px-6 pb-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="ml-2">Loading CSV content...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
              Error loading CSV data: {error}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border rounded-lg overflow-hidden">
              <ScrollArea className="h-[400px] w-full">
                <div className="excel-grid">
                  {/* Header Row */}
                  <div className="excel-row excel-header">
                    {csvData.headers.map((header, index) => (
                      <div key={`header-${index}`} className="excel-cell">
                        {header}
                      </div>
                    ))}
                  </div>

                  {/* Data Rows */}
                  {csvData.rows.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="excel-row">
                      {row.map((cell, cellIndex) => (
                        <div key={`cell-${rowIndex}-${cellIndex}`} className="excel-cell">
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t p-4 flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Process Another File
        </Button>
        <Button onClick={() => window.open(fullDownloadUrl, "_blank")}>
          <Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ResultCard
