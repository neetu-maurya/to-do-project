import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";   // <-- add this
import todoRoutes from "./routes/todoRoutes";

dotenv.config();
const app = express();

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// connect to MongoDB
connectDB();

// routes
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
