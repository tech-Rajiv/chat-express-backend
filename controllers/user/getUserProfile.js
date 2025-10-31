import { prisma } from "../../prismaClient.js";

export const getUserProfile = async (req, res) => {
  const { id } = req.body;
  console.log("lfriend id: ", id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
