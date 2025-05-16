import { Check } from "lucide-react"

export function ProcessingSummary() {
  return (
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
  )
}
