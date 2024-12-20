import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { app, server } from "./SoketIO/server.js";
import path from "path";

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("MongoDB Connected");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

//Deployment code
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./FRONTEND/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "FRONTEND/dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
