import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { storeAndSendChat } from "../controllers/chat/sendChat.js";

export default function chatRoutes(io) {
  const router = express.Router();
  console.log("chatroute fn ran");
  router.post("/send", verifyToken, (req, res) =>
    storeAndSendChat(req, res, io)
  );

  return router;
}
