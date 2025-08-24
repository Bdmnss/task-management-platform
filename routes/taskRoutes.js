import express from "express";
const router = express.Router();

import { auth, isAdmin } from "../middleware/auth.js";

import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskControllers.js";

router.post("/", auth, isAdmin, createTask);
router.get("/", auth, getAllTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, isAdmin, deleteTask);

export default router;
