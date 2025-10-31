import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  const loggedInUserId = req?.user?.id;
  console.log("loggedInUserId: ", loggedInUserId);
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: loggedInUserId },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
