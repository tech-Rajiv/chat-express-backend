import { createOrGetRoom } from "./createOrGetRoom.js";
import { saveMessageToDB, seenMessageUpdate } from "./messageService.js";

export const handleSendMessage = async (io, socket, data) => {
  try {
    const { senderId, tempId, receiverId, text } = data;
    console.log(
      " senderId, tempId, receiverId, text : ",
      senderId,
      tempId,
      receiverId,
      text
    );

    const roomKey = [senderId, receiverId].sort().join("_");

    const { id: roomId } = await createOrGetRoom(roomKey, senderId, receiverId);
    const savedMessage = await saveMessageToDB(
      senderId,
      receiverId,
      text,
      roomId
    );

    io.to(roomKey).emit("receive_message", { ...savedMessage, tempId });

    console.log(` Message sent in room ${roomKey}`);
  } catch (error) {
    console.error("❌ Failed to handle message:", error);

    socket.emit("message_failed", { error: "Message not saved" });
  }
};

export const handleSeenMessage = async (io, socket, data) => {
  // const { key, msgId } = data;
  if (data?.status === "READ") {
    console.log("alreay read so nothing to make seen");
    return;
  }

  console.log("new message to make seen", data);
  const seenMessage = await seenMessageUpdate(data?.messageId);
  console.log(" got sucess from dbe so emitting", seenMessage);
  io.to(data?.roomKey).emit("message_seen_update", { ...seenMessage });
  console.log("emitted");
};
