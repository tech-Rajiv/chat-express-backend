import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { logoutUser } from "../controllers/auth/LogoutController.js";
import { loginUser } from "../controllers/auth/loginController.js";
import { registerUser } from "../controllers/auth/SignupController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", verifyToken, async (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});
router.post("/logout", logoutUser);

export default router;
