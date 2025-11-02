import {prisma} from '../../prismaClient.js'

export const storeAndSendChat = async (req, res, io) => {
  console.log("inside chat send controler sdfsdfsd");
  try {
    const body = req.body
    console.log('body ', body)
    const {senderId,receiverId,content} = req.body;
    console.log('body senderId,receiverId,content', senderId,receiverId,content)
    if (!senderId || !receiverId || !content) {
      console.log("missing feeilds");
      return res.status(400).json({ message: "Missing fields" });
    }

    // store in DB (Prisma)
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text:content,
      },
    });

    // emit socket event
    io.to(receiverId).emit("receive_message", message);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.error("Error sending message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
