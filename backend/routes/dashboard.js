const express = require("express");
const router = express.Router();
const db = require("../db/connection");

/**
 * GET /api/dashboard/summary
 * ?user_id=1&project_id=1
 */
router.get("/summary", (req, res) => {
  const { user_id, project_id } = req.query;

  if (!user_id || !project_id) {
    return res.status(400).json({
      error: "user_id and project_id required",
    });
  }

  /* ================= TIME ENTRIES ================= */
  const timeSql = `
    SELECT
      COUNT(id) * 10 AS total_minutes,
      ROUND(AVG(activity_percent)) AS avg_activity
    FROM time_entries
    WHERE user_id = ?
      AND project_id = ?
  `;

  /* ================= TASKS ================= */
  const taskSql = `
    SELECT
      COUNT(CASE WHEN status = 'completed' THEN 1 END) AS tasks_completed,
      SUM(estimated_hours) AS estimated_hours,
      SUM(actual_hours) AS actual_hours
    FROM tasks
    WHERE user_id = ?
      AND project_id = ?
  `;

  db.query(timeSql, [user_id, project_id], (err, [time]) => {
    if (err) {
      console.error("Time query error", err);
      return res.status(500).json({ error: "Database error" });
    }

    db.query(taskSql, [user_id, project_id], (err2, [tasks]) => {
      if (err2) {
        console.error("Task query error", err2);
        return res.status(500).json({ error: "Database error" });
      }

      const totalMinutes = Number(time?.total_minutes || 0);
      const estimated = Number(tasks?.estimated_hours || 0);
      const actual = Number(tasks?.actual_hours || 0);

      res.json({
        total_minutes: totalMinutes,
        avg_activity: time?.avg_activity || 0,
        tasks_completed: tasks?.tasks_completed || 0,
        estimated_hours: estimated,
        actual_hours: actual,
        remaining_hours: Math.max(estimated - actual, 0),
      });
    });
  });
});

module.exports = router;
