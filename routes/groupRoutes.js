import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { createNewGroup } from "../controllers/group/createNewGroup.js";

export default function groupRoutes() {
  const router = express.Router();
  router.post("/create-group", verifyToken, createNewGroup);
  return router;
}
