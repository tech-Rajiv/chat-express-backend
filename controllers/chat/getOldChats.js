import { prisma } from "../../prismaClient.js";
import { createOrGetRoom } from "../../socket/createOrGetRoom.js";

export const getOldChats = async (req, res) => {
  console.log("at chats/messages");
  const { roomKey } = req.body;
  console.log("roomKey: ", roomKey);

  try {
    const { id: roomId } = await createOrGetRoom(roomKey);

    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json({ sucess: true, messages });
  } catch (error) {
    console.log("error geting old messages");
    res.status(403).json({ success: false });
  }
};
