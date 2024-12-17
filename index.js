import app from "./api/app.js";

// Set the main port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
