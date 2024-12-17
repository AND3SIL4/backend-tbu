import app from "./api/app.js";
import { config } from "dotenv";

// Load configuration
config();

// Set the main port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
