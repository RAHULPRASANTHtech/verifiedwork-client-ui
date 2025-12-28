const express = require("express");
const router = express.Router();
const db = require("../db/connection");

/**
 * GET /api/activity-stats
 * ?user_id=1&date=YYYY-MM-DD
 */
router.get("/", (req, res) => {
  const { user_id, date } = req.query;

  if (!user_id || !date) {
    return res.status(400).json({ error: "user_id and date required" });
  }

  const sql = `
    SELECT
      COALESCE(SUM(al.keyboard_count), 0) AS keyboard,
      COALESCE(SUM(al.mouse_count), 0) AS mouse
    FROM activity_logs al
    JOIN time_entries te ON te.id = al.time_entry_id
    WHERE te.user_id = ?
      AND te.entry_date = ?
  `;

  db.query(sql, [user_id, date], (err, [row]) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      keyboard: Number(row.keyboard),
      mouse: Number(row.mouse),
    });
  });
});


module.exports = router;
