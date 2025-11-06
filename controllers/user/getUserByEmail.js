import { prisma } from "../../prismaClient.js";

export const getUserByEmail = async (req, res) => {
  const { email } = req?.body;
  console.log("email ", email);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: "server error haiii" });
  }
};
