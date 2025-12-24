const express = require("express");
const router = express.Router();
const db = require("../db/connection");

/* ================= CREATE TIME ENTRY ================= */
router.post("/", (req, res) => {
  const {
    user_id,
    project_id,
    entry_date,
    start_time,
    end_time,
    activity_percent,
    idle_minutes,
  } = req.body;

  if (!user_id || !project_id || !entry_date || !start_time || !end_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO time_entries
    (user_id, project_id, entry_date, start_time, end_time, activity_percent, idle_minutes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
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
    ],
    (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({ id: result.insertId });
    }
  );
});

/* ================= DAILY SUMMARY ================= */
router.get("/summary", (req, res) => {
  const { date, user_id } = req.query;

  if (!date || !user_id) {
    return res.status(400).json({ error: "date and user_id required" });
  }

  const sql = `
    SELECT
      COUNT(*) * 10 AS total_minutes,
      SUM(idle_minutes) AS idle_minutes,
      ROUND(AVG(activity_percent)) AS avg_activity
    FROM time_entries
    WHERE entry_date = ?
      AND user_id = ?
  `;

  const screenshotsSql = `
    SELECT COUNT(*) AS screenshots
    FROM screenshots s
    JOIN time_entries te ON te.id = s.time_entry_id
    WHERE te.entry_date = ?
      AND te.user_id = ?
  `;

  db.query(sql, [date, user_id], (err, [summary]) => {
    if (err) return res.status(500).json({ error: "Database error" });

    db.query(screenshotsSql, [date, user_id], (err2, [shots]) => {
      if (err2) return res.status(500).json({ error: "Database error" });

      res.json({
        total_minutes: summary?.total_minutes || 0,
        idle_minutes: summary?.idle_minutes || 0,
        avg_activity: summary?.avg_activity || 0,
        screenshots: shots?.screenshots || 0,
      });
    });
  });
});

/* ================= WEEKLY SUMMARY ================= */
router.get("/weekly", (req, res) => {
  const { weekStart, user_id } = req.query;

  if (!weekStart || !user_id) {
    return res.status(400).json({ error: "weekStart and user_id required" });
  }

  const sql = `
    SELECT
      te.entry_date AS date,
      COUNT(te.id) * 10 AS total_minutes,
      ROUND(AVG(te.activity_percent)) AS avg_activity,
      SUM(te.idle_minutes) AS idle_minutes,
      COUNT(s.id) AS screenshots
    FROM time_entries te
    LEFT JOIN screenshots s ON s.time_entry_id = te.id
    WHERE te.user_id = ?
      AND te.entry_date BETWEEN DATE(?) AND DATE_ADD(?, INTERVAL 6 DAY)
    GROUP BY te.entry_date
    ORDER BY te.entry_date ASC
  `;

  db.query(sql, [user_id, weekStart, weekStart], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

/* ================= MONTHLY REPORT ================= */
router.get("/monthly", (req, res) => {
  const { month, user_id } = req.query;

  if (!month || !user_id) {
    return res.status(400).json({ error: "month and user_id required" });
  }

  const monthStart = `${month}-01`;

  const summarySql = `
    SELECT
      COUNT(te.id) * 10 AS total_minutes,
      ROUND(AVG(te.activity_percent)) AS avg_activity,
      SUM(te.idle_minutes) AS idle_minutes,
      COUNT(s.id) AS screenshots
    FROM time_entries te
    LEFT JOIN screenshots s ON s.time_entry_id = te.id
    WHERE te.user_id = ?
      AND te.entry_date >= DATE(?)
      AND te.entry_date < DATE_ADD(DATE(?), INTERVAL 1 MONTH)
  `;

  const dailySql = `
  SELECT
    DATE_FORMAT(te.entry_date, '%Y-%m-%d') AS date,
    COUNT(te.id) * 10 AS total_minutes,
    ROUND(AVG(te.activity_percent)) AS avg_activity,
    SUM(te.idle_minutes) AS idle_minutes,
    COUNT(s.id) AS screenshots
  FROM time_entries te
  LEFT JOIN screenshots s ON s.time_entry_id = te.id
  WHERE te.user_id = ?
    AND te.entry_date >= DATE(?)
    AND te.entry_date < DATE_ADD(DATE(?), INTERVAL 1 MONTH)
  GROUP BY DATE_FORMAT(te.entry_date, '%Y-%m-%d')
  ORDER BY DATE_FORMAT(te.entry_date, '%Y-%m-%d') ASC
`;


  db.query(summarySql, [user_id, monthStart, monthStart], (err, [summary]) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    db.query(dailySql, [user_id, monthStart, monthStart], (err2, days) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        summary: summary || {
          total_minutes: 0,
          avg_activity: 0,
          idle_minutes: 0,
          screenshots: 0,
        },
        days: days || [],
      });
    });
  });
});

/* ================= MONTHLY CSV EXPORT ================= */
router.get("/export/monthly", (req, res) => {
  const { month, user_id } = req.query;

  if (!month || !user_id) {
    return res.status(400).json({ error: "month and user_id required" });
  }

  const sql = `
    SELECT
      te.entry_date AS date,
      COUNT(te.id) * 10 AS total_minutes,
      ROUND(AVG(te.activity_percent)) AS avg_activity,
      SUM(te.idle_minutes) AS idle_minutes,
      COUNT(s.id) AS screenshots
    FROM time_entries te
    LEFT JOIN screenshots s ON s.time_entry_id = te.id
    WHERE te.user_id = ?
      AND DATE_FORMAT(te.entry_date, '%Y-%m') = ?
    GROUP BY te.entry_date
    ORDER BY te.entry_date ASC
  `;

  db.query(sql, [user_id, month], (err, rows) => {
    if (err) {
      console.error("Monthly export error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    let csv = "Date,Hours,Activity %,Idle (min),Screenshots\n";

    rows.forEach((r) => {
      const hours = `${Math.floor(r.total_minutes / 60)}h ${
        r.total_minutes % 60
      }m`;

      const dateStr =
  typeof r.date === "string"
    ? r.date.slice(0, 10)
    : new Date(r.date).toLocaleDateString("en-CA"); // YYYY-MM-DD

csv += `="${dateStr}",${hours},${r.avg_activity},${r.idle_minutes},${r.screenshots}\n`;

    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="monthly-report-${month}.csv"`
    );

    res.send(csv);
  });
});

/* ================= DAILY ENTRIES ================= */
router.get("/", (req, res) => {
  const { date, user_id } = req.query;

  if (!date || !user_id) {
    return res.status(400).json({ error: "date and user_id required" });
  }

  const sql = `
    SELECT 
      te.id AS time_entry_id,
      te.start_time,
      te.activity_percent,
      s.id AS screenshot_id,
      s.image_path,
      s.activity AS screenshot_activity,
      s.app_name
    FROM time_entries te
    LEFT JOIN screenshots s ON s.time_entry_id = te.id
    WHERE te.entry_date = ?
      AND te.user_id = ?
    ORDER BY te.start_time ASC
  `;

  db.query(sql, [date, user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const grouped = {};
    rows.forEach((r) => {
      if (!grouped[r.time_entry_id]) {
        grouped[r.time_entry_id] = {
          time_entry_id: r.time_entry_id,
          start_time: r.start_time,
          activity_percent: r.activity_percent,
          screenshots: [],
        };
      }

      if (r.screenshot_id) {
        grouped[r.time_entry_id].screenshots.push({
          id: r.screenshot_id,
          image_path: r.image_path,
          activity: r.screenshot_activity,
          app: r.app_name,
        });
      }
    });

    res.json(Object.values(grouped));
  });
});

module.exports = router;
