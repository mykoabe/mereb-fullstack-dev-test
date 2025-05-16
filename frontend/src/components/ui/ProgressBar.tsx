import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProgressBar() {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Processing CSV file...</span>
            <span className="text-sm font-medium">Please wait</span>
          </div>
          <Progress value={66} className="h-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Large files may take longer to process. Please dont close this window.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
