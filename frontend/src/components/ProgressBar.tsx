import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  status?: string;
}

export function ProgressBar({
  progress,
  status = "Processing CSV file...",
}: ProgressBarProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{status}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Large files may take longer to process. Please dont close this
            window.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
