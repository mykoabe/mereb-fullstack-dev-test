import { ScrollArea } from "@/components/ui/scroll-area"
import type { CsvData } from "@/types/csv"

interface CsvPreviewProps {
  csvData: CsvData
  loading: boolean
  error: string | null
}

export function CsvPreview({ csvData, loading, error }: CsvPreviewProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span className="ml-2">Loading CSV content...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
        Error loading CSV data: {error}
      </div>
    )
  }

  return (
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
  )
}
