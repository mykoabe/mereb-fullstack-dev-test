import { Request, Response } from "express";
import { processCSVFile } from "../services/csvProcessor.service";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import tryCatchHandler from "../middleware/asyncHandler";
import { generateInputOutputFilename } from "../utils/fileUtil";

// @desc Upload CSV file and process it
// @route POST /api/upload
// @access Public
const uploadFile = tryCatchHandler(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const fileName = generateInputOutputFilename("sales"); // rather than using uuid I think this is better
  const outputPath = path.join("public/outputs", fileName);

  const metrics = await processCSVFile(file.path, outputPath);

  res.json({
    message: "File processed successfully",
    downloadUrl: `/outputs/${fileName}`,
    metrics,
  });
});

export { uploadFile };
