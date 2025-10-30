import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow Express to parse incoming JSON
app.use(express.json());

// ✅ Allow CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://chat-next-fullstack.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser()); // ✅ enable cookie parsing

// ✅ Routes
app.use("/api", authRoutes);
app.use("/users", usersRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(process.env.PORT || 4000, () =>
  console.log("🚀 Server running on port 4000")
);
