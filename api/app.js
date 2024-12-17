import cors from "cors";
import express from "express";
import axios from "axios";
import { config } from "dotenv";

// Start point of the application
const app = express();
// Load the environment variables
config();

const corOptions = {
  origin: [process.env.DEV_ALLOWED, process.env.PROD_ALLOWED],
  methods: ["GET", "POST"],
  allowedHeaders: "*",
};

// Middleware
app.use(cors(corOptions));
app.use(express.json());

// Environment variables
const CONTROL_ROOM_API = process.env.CONTROL_ROOM_API;

app.get("/", (req, res) => {
  res.send({
    message: "API proxy is running...",
    status: "success",
    timestamp: new Date(),
    url: CONTROL_ROOM_API || "Url not found",
    dev: process.env.DEV_ALLOWED || "No dev path found",
    prod: process.env.PROD_ALLOWED || "No prod path found",
  });
});

// Proxy paht
app.use("/api", async (req, res) => {
  // Get the data of the request
  const { method, headers, body, originalUrl } = req;

  try {
    const response = await axios({
      method,
      url: `${CONTROL_ROOM_API}${originalUrl.replace("/api", "")}`,
      headers: { ...headers, host: undefined },
      data: body,
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error during proxying:", error.message);
    res
      .status(error.response?.status || 500)
      .send(error.response?.data || "An error occurred");
  }
});
export default app;
