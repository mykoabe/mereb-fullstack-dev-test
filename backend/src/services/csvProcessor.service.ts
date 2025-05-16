import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { createWriteStream } from "fs";
import { CSV_HEADERS } from "../utils/fileUtil";
import { ICSVRow } from "../types";

/**
 * @param inputPath - Path to the input CSV file
 * @param outputPath - Path to the output CSV file
 * @returns Metadata including number of departments and processing time
 */
const processCSV = async (
  inputPath: string,
  outputPath: string
): Promise<{ departments: number; time: number }> => {
  const start = Date.now();
  const results: Record<string, number> = {};

  return new Promise((resolve, reject) => {
    // results.Department = results.Department || 0; // this is just buffer
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.createReadStream(inputPath)
      .pipe(csv({ headers: CSV_HEADERS }))
      .on("data", (row: ICSVRow) => {
        try {
          const dept = row.Department;
          const sales = parseFloat(row.Sales);
          if (dept && !isNaN(sales)) {
            results[dept] = (results[dept] || 0) + sales;
          }
        } catch (err) {
          console.error("Skipping invalid row:", row);
        }
      })
      .on("end", () => {
        const writer = createWriteStream(outputPath);
        writer.write("Department Name,Total Number of Sales\n");

        for (const [dept, total] of Object.entries(results)) {
          writer.write(`${dept},${total}\n`);
        }

        writer.end();
        // stream must be closed before resolving
        writer.on("finish", () => {
          resolve({
            departments: Object.keys(results).length,
            time: Date.now() - start,
          });
        });

        writer.on("error", (err) => {
          console.error("Error writing output file:", err);
          reject(err);
        });
      })
      .on("error", (error) => {
        console.error("Error processing CSV:", error);
        reject(error);
      });
  });
};

export { processCSV as processCSVFile };
