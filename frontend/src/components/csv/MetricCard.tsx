import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: ReactNode
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  )
}
