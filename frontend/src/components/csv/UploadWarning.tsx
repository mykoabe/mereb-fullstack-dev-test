import { AlertCircle } from "lucide-react"

export function UploadWarning() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
      <div>
        <h4 className="font-medium text-amber-800 dark:text-amber-400">Before you proceed</h4>
        <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
          Make sure your CSV file contains the required columns: Department Name, Date, and Number of Sales.
        </p>
      </div>
    </div>
  )
}
