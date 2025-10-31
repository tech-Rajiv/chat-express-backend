import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
// ✅ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://chat-next-fullstack.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());

// ✅ API Routes
app.use("/api", authRoutes);
app.use("/users", usersRoutes);

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

// ✅ Socket.io Logic
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // User joins a specific room (like a chat with another user)
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`📥 User ${socket.id} joined room: ${roomId}`);
  });

  // Handle sending messages
  socket.on("send_message", (data) => {
    console.log("💬 Message received:", data);
    io.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Start server (IMPORTANT: use server.listen)
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.io on port ${PORT}`);
});
