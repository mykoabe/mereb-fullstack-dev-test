import express from "express";
const router = express.Router();
import { uploadFile } from "../controllers/upload.controller";
import { csvUpload } from "../middleware/csvUpload";

router.post("/upload", csvUpload.single("file"), uploadFile);

export default router;
