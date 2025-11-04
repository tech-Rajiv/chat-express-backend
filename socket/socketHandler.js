import { handleSeenMessage, handleSendMessage } from "./HelperSocket.js";

export default async function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    // Join specific chat room
    socket.on("join_room", (roomKey) => {
      socket.join(roomKey);
      console.log(`user ${socket.id} joined room: ${roomKey}`);
    });

    // Handle send_message event
    socket.on("send_message", (data) => handleSendMessage(io, socket, data));
    socket.on("seen_message", (data) => handleSeenMessage(io, socket, data));

    socket.on("message_seen", (key, msgId) => ha);
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}
