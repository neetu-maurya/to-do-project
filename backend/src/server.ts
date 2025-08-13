import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

app.use(express.json());
connectDB();


import todoRoutes from "./routes/todoRoutes";

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
});
