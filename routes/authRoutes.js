import express from "express";
const router = express.Router();

import { auth, isAdmin } from "../middleware/auth.js";

import { signIn, signUp } from "../controllers/authControllers.js";

router.post("/signup", auth, isAdmin, signUp);
router.post("/signin", signIn);

export default router;
