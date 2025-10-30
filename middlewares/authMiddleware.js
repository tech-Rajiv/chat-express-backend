import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("in middleware");
  const token = req.cookies.token; // ✅ read from cookies
  console.log("token: fsdfds", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded : ", decoded);
    req.user = decoded; // attach user data
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
