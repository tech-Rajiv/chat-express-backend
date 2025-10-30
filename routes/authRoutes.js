import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", verifyToken, async (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

export default router;
