const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connection");

const app = express();
const dashboardRoutes = require("./routes/dashboard");

// ✅ CORS MUST COME FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());

// Routes
const activityStatsRoutes = require("./routes/activityStats");
const timeEntriesRoutes = require("./routes/timeEntries");

app.use("/api/activity-stats", activityStatsRoutes);
app.use("/api/time-entries", timeEntriesRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend running OK 🚀" });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
