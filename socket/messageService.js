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
    console.log("savedddd in dbbb", message);
    return message;
  } catch (error) {
    console.error("❌ Error saving message:", error);
    return { error: "DB save failed" };
  }
}

export const seenMessageUpdate = async (msgId) => {
  try {
    if (!msgId) throw new Error("No message ID provided");
    const message = await prisma.message.update({
      where: { id: msgId },
      data: { status: "READ" },
    });
    return message;
  } catch (error) {
    console.log("failed to update db seen");
    return { error: "DB seen failed" };
  }
};
