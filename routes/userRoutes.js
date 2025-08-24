import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getProfile,
  updateUser,
} from "../controllers/userControllers.js";
import { auth, isAdmin } from "../middleware/auth.js";
import { uploadProfileImage } from "../middleware/uploadFile.js";

router.get("/", auth, isAdmin, getAllUsers);
router.get("/me", auth, getProfile);
router.put("/:id", auth, isAdmin, uploadProfileImage, updateUser);

export default router;
