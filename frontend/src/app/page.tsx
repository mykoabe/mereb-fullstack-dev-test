import { FileUpload } from "@/components/csv/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              CSV Sales Data Processor
            </h1>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
            <FileUpload />
          </div>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>
              Supported format: CSV with Department Name, Date, and Number of
              Sales columns
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
