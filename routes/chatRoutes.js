import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { getOldChats } from "../controllers/chat/getOldChats.js";

export default function chatRoutes() {
  const router = express.Router();
  router.post("/messages", verifyToken, getOldChats);

  return router;
}
