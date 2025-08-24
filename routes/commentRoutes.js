import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth.js";

import {
  createComment,
  getCommentsByTaskId,
} from "../controllers/commentControllers.js";

router.post("/:id/comments", auth, createComment);
router.get("/:id/comments", auth, getCommentsByTaskId);

export default router;
