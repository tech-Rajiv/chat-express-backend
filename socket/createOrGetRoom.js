import { prisma } from "../prismaClient.js";

export const createOrGetRoom = async (roomKey, senderId, receiverId) => {
  try {
    // Check if room already exists
    let room = await prisma.room.findUnique({
      where: { roomKey }, // because we’ll make roomKey unique in schema
    });

    // If not found, create a new room
    if (!room) {
      room = await prisma.room.create({
        data: {
          roomKey,
          members: {
            create: [
              { user: { connect: { id: senderId } } },
              { user: { connect: { id: receiverId } } },
            ],
          },
        },
        include: { members: true },
      });
      console.log("✅ Created a new room", room);
    } else {
      console.log("✅ Existing room found:", room);
    }
    return room;
  } catch (error) {
    console.error("Error in createOrGetRoom:", error);
    throw error;
  }
};
