const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connection");

const app = express();
const timeEntriesRoutes = require("./routes/timeEntries");
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/time-entries", timeEntriesRoutes);
// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend running OK 🚀" });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
