import express from "express";
const router = express.Router();

import { getAllUsers } from "../controllers/userControllers.js";
import { auth, isAdmin } from "../middleware/auth.js";

router.get("/", auth, isAdmin, getAllUsers);

export default router;
