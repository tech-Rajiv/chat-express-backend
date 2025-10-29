import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

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

// ✅ Routes
app.use("/api", authRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(process.env.PORT || 4000, () =>
  console.log("🚀 Server running on port 4000")
);
