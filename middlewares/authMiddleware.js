import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("in middleware");
  const token = req.cookies.token;
  console.log("token: fsdfds", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  console.log("in middle");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
