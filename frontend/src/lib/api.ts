import type { ApiResponse } from "@/types/csv";

export const uploadCSV = async (file: File): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw error;
  }
};
