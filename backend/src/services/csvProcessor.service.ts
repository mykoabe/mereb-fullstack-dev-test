import path from "path";
import { Worker } from "worker_threads";

/**
 * @param inputPath - Path to the input CSV file
 * @param outputPath - Path to the output CSV file
 * @returns Metadata including number of departments and processing time
 */
const processCSV = async (
  inputPath: string,
  outputPath: string
): Promise<{ departments: number; time: number }> => {
  return new Promise((resolve, reject) => {
    const isDev = process.env.NODE_ENV === "development";
    const workerPath = isDev
      ? path.resolve(__dirname, "../workers/csvWorker.ts")
      : path.resolve(__dirname, "../workers/csvWorker.js");

    const worker = new Worker(workerPath, {
      workerData: { inputPath, outputPath },
      ...(isDev ? { execArgv: ["-r", "ts-node/register"] } : {}),
    });

    worker.on("message", (data) => {
      if (data.error) return reject(new Error(data.error));
      resolve(data);
    });

    worker.on("error", reject);

    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

export { processCSV as processCSVFile };
