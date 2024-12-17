import cors from "cors";
import express from "express";
import axios from "axios";
import { config } from "dotenv";

// Start point of the application
const app = express();
// Load the environment variables
config();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const CONTROL_ROOM_API = process.env.CONTROL_ROOM_API;

app.get("/", (req, res) => {
  res.send({
    message: "API proxy is running...",
    status: "success",
    timestamp: new Date(),
    url: CONTROL_ROOM_API || "Url not found",
  });
});

export default app;
