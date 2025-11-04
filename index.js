import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import socketHandler from "./socket/socketHandler.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://chat-next-fullstack.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});
// ✅ API Routes
app.use("/api", authRoutes());
app.use("/users", usersRoutes());
app.use("/chats", chatRoutes());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// ✅ Create HTTP server for Socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chat-next-fullstack.vercel.app"],
    credentials: true,
  },
});
socketHandler(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.io on port ${PORT}`);
});
