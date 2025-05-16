export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " bytes"
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
  else return (bytes / 1048576).toFixed(1) + " MB"
}

export const getFullDownloadUrl = (downloadUrl: string): string => {
  const baseURL = process.env.NEXT_PUBLIC_FILE_BASE_URL || ""
  return downloadUrl.startsWith("http") ? downloadUrl : `${baseURL}${downloadUrl}`
}

export const validateCsvFile = (file: File): boolean => {
  return file.name.endsWith(".csv")
}
