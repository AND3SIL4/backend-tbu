import cors from "cors";
import express from "express";
import axios from "axios";

// Start point of the application
const app = express();

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
  });
});

export default app;
