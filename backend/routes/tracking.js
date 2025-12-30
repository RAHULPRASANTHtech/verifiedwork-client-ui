const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const auth = require("../middleware/authMiddleware");

/* ================= CREATE TIME ENTRY ================= */
router.post("/time-entry", auth, (req, res) => {
  const {
    project_id,
    entry_date,
    start_time,
    end_time,
    activity_percent,
    idle_minutes,
    session_id,
  } = req.body;

  const user_id = req.user.user_id;

  const sql = `
    INSERT INTO time_entries
    (user_id, project_id, entry_date, start_time, end_time, activity_percent, idle_minutes, session_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      project_id,
      entry_date,
      start_time,
      end_time,
      activity_percent || 0,
      idle_minutes || 0,
      session_id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ success: true, time_entry_id: result.insertId });
    }
  );
});

/* ================= ACTIVITY LOG ================= */
router.post("/activity-log", auth, (req, res) => {
  const { time_entry_id, logs } = req.body;

  const values = logs.map((l) => [
    time_entry_id,
    l.log_time,
    l.app_name,
    l.keyboard_count,
    l.mouse_count,
  ]);

  const sql = `
    INSERT INTO activity_logs
    (time_entry_id, log_time, app_name, keyboard_count, mouse_count)
    VALUES ?
  `;

  db.query(sql, [values], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true });
  });
});

/* ================= SCREENSHOT ================= */
router.post("/screenshot", auth, (req, res) => {
  const {
    time_entry_id,
    image_path,
    captured_at,
    activity,
    app_name,
    keyboard_count,
    mouse_count,
  } = req.body;

  const sql = `
    INSERT INTO screenshots
    (time_entry_id, image_path, captured_at, activity, app_name, keyboard_count, mouse_count)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      time_entry_id,
      image_path,
      captured_at,
      activity,
      app_name,
      keyboard_count,
      mouse_count,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ success: true });
    }
  );
});

/* ================= UPDATE TASK ================= */
router.post("/update-task", auth, (req, res) => {
  const { task_id, actual_hours } = req.body;

  const sql = `
    UPDATE tasks
    SET actual_hours = ?
    WHERE id = ?
  `;

  db.query(sql, [actual_hours, task_id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true });
  });
});

module.exports = router;
