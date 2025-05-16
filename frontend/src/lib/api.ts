import type { ApiResponse } from "@/types/csv";

export type ProgressCallback = (progress: number) => void;

export const uploadCSV = async (
  file: File,
  onProgress?: ProgressCallback
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    // Set up progress tracking
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    });

    // Handle successful response
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(new Error("Invalid response format"));
        }
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };

    // Handle network errors
    xhr.onerror = () => {
      reject(new Error("Network error occurred"));
    };

    // Open and send the request
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/upload`;
    console.log("API URL:", apiUrl);
    xhr.open("POST", apiUrl);

    // Set the API key header
    xhr.setRequestHeader("x-api-key", process.env.NEXT_PUBLIC_API_KEY || "");
    xhr.send(formData);
  });
};
