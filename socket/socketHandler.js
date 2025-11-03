import { createOrGetRoom } from "./createOrGetRoom.js";
import { saveMessageToDB } from "./messageService.js";

export default async function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Join specific chat room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`📥 User ${socket.id} joined room: ${roomId}`);
    });

    // Handle send_message event
    socket.on("send_message", async (data) => {
      console.log("💬 Message received:", data);
      const { tempId, senderId, receiverId, text, status } = data;
      try {
        const room = await createOrGetRoom(senderId, receiverId);
        console.log("room: from try of parent", room);

        const dataFromDb = await saveMessageToDB(
          senderId,
          receiverId,
          text,
          room?.id
        );
        console.log("dataFromDb: ", dataFromDb);

        // // Broadcast to everyone in that room
        io.to(room?.roomKey).emit("receive_message", {
          ...dataFromDb,
          tempId,
        });
        console.log("emitted");
      } catch (error) {
        console.log("failed to save in db");
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}
