import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("in middleware");
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token,"token")
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("din next");
    next();
  } catch (error) {
    console.log("error of middleware");
    res.status(403).json({ message: "Invalid token" });
  }
};
