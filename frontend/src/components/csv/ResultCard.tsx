"use client"

import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Database, Download, Eye, FileText, Check } from "lucide-react"
import type { ProcessingResult } from "@/types/csv"
import { useCsvData } from "@/hooks/useCsvData"
import { getFullDownloadUrl } from "@/utils/file"
import { CsvPreview } from "./CsvPreview"
import { MetricCard } from "./MetricCard"
import { ProcessingSummary } from "./ProcessingSummary"

export function ResultCard({ downloadUrl, time, departments }: ProcessingResult) {
  const fullDownloadUrl = getFullDownloadUrl(downloadUrl)
  const { csvData, loading, error } = useCsvData(fullDownloadUrl)

  const handleDownload = () => {
    window.open(fullDownloadUrl, "_blank")
  }

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
          <Button variant="outline" size="sm" onClick={handleDownload}>
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
            <MetricCard
              title="Total Departments"
              value={departments}
              icon={<Database className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
            />
            <MetricCard
              title="Processing Time"
              value={`${time} ms`}
              icon={<Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
            />
          </div>
          <ProcessingSummary />
        </TabsContent>

        <TabsContent value="preview" className="pt-2 px-6 pb-6">
          <CsvPreview csvData={csvData} loading={loading} error={error} />
        </TabsContent>
      </Tabs>

      <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t p-4 flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Process Another File
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
      </CardFooter>
    </Card>
  )
}
