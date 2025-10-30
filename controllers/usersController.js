import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllUsers = async (req, res) => {
  console.log("in routes");
  try {
    const users = await prisma.user.findMany();
    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
