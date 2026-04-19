import express from "express";
import { login, me } from "../Controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", verifyToken, me);

export default router;