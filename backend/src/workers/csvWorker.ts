import { parentPort, workerData } from "worker_threads";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { createWriteStream } from "fs";
import { CSV_HEADERS } from "../utils/fileUtil";
import { ICSVRow } from "../types";

const { inputPath, outputPath } = workerData;

const start = Date.now();
const results: Record<string, number> = {};

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

    writer.on("finish", () => {
      parentPort?.postMessage({
        departments: Object.keys(results).length,
        time: Date.now() - start,
      });
    });

    writer.on("error", (err) => {
      parentPort?.postMessage({ error: err.message });
    });
  })
  .on("error", (err) => {
    parentPort?.postMessage({ error: err.message });
  });
