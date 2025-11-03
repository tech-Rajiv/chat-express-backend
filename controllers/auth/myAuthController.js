import { prisma } from "../../prismaClient.js";

export const myAuthDetails = async (req, res) => {
  try {
    const userId = req.user?.id; // user ID from middleware / token

    if (!userId) {
      return res.status(400).json({ error: "User ID not found in request" });
    }

    // ✅ Fetch user and their related profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }, // because foreign key exists
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...safeUser } = user;

    res.status(200).json({ data: safeUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
