import { handleSeenMessage, handleSendMessage } from "./HelperSocket.js";

export default async function socketHandler(io) {
  const onlineUsers = new Map();
  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    //online feature
    socket.on("user_connected", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("online userssss", onlineUsers);
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
    // Join specific chat room
    socket.on("join_room", (roomKey) => {
      socket.join(roomKey);
      console.log(`user ${socket.id} joined room: ${roomKey}`);
    });

    // Handle send_message event
    socket.on("send_message", (data) => handleSendMessage(io, socket, data));
    socket.on("seen_message", (data) => handleSeenMessage(io, socket, data));

    socket.on("disconnect", () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online_users", Array.from(onlineUsers.keys()));
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}
