import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";

import {
  getFilesByTaskId,
  uploadFile,
} from "../controllers/fileControllers.js";
import { uploadTaskFile } from "../middleware/uploadFile.js";

router.post("/:id/files", auth, uploadTaskFile, uploadFile);
router.get("/:id/files", auth, getFilesByTaskId);

export default router;
