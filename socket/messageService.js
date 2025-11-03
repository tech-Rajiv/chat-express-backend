import { prisma } from "../prismaClient.js";

export async function saveMessageToDB(senderId, receiverId, text, roomId) {
  try {
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
        roomId,
        status: "SENT",
      },
    });
    console.log("savedddd");
    return message;
  } catch (error) {
    console.error("❌ Error saving message:", error);
    return { error: "DB save failed" };
  }
}
