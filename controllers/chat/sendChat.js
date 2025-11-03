import { prisma } from "../../prismaClient.js";

export const storeAndSendChat = async (req, res, io) => {
  console.log("inside chat send controler");
  try {
    const body = req.body;
    console.log("body ", body);
    const { senderId, receiverId, text, tempId } = req.body;
    console.log(
      "body senderId,receiverId,text",
      senderId,
      receiverId,
      text,
      tempId
    );
    if (!senderId || !receiverId || !text || !tempId) {
      console.log("missing feeilds");
      return res.status(400).json({ message: "Missing fields" });
    }

    // store in DB (Prisma)
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
        status: "SENT",
      },
    });

    io.on("send_message", () => {
      console.log("with sockettttt brooooo");
    });
    const roomId = [senderId, receiverId].sort().join("_");
    // emit socket event
    io.to(roomId).emit("receive_message", { ...message, tempId });

    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.error("Error sending message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
