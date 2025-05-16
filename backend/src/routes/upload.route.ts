import express from "express";
const router = express.Router();
import { uploadFile } from "../controllers/upload.controller";
import { csvUpload } from "../middleware/csvUpload";
import { verifyApiKey } from "../middleware/auth";

router.post("/upload", verifyApiKey, csvUpload.single("file"), uploadFile);

export default router;
