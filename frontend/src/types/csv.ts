export interface ProcessingResult {
  downloadUrl: string
  time: number
  departments: number
}

export interface CsvData {
  headers: string[]
  rows: string[][]
}

export interface ApiResponse {
  downloadUrl: string
  metrics: {
    time: number
    departments: number
  }
}
