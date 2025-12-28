import { useState, useEffect } from "react";
import DailyTracking from "../../components/reports/DailyTracking";
import WeeklyTracking from "../../components/reports/WeeklyTracking";
import { Clock, Activity, Camera, PauseCircle } from "lucide-react";

/* ================= CONSTANTS ================= */

const TIMEZONES = [
  { label: "GMT +5:30 (IST)", value: "Asia/Kolkata" },
  { label: "GMT +0 (UTC)", value: "UTC" },
  { label: "GMT -5 (EST)", value: "America/New_York" },
];

const ASSIGNED_USER = {
  id: 1,
  name: "Rahul Prasanth",
  role: "Frontend Developer",
};

/* ================= COMPONENT ================= */

export default function TrackingReport() {
  const [mode, setMode] = useState("daily");
  const [showInactive, setShowInactive] = useState(true);
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* ================= KPI SUMMARY STATE ================= */

  const [summary, setSummary] = useState({
    total_minutes: 0,
    avg_activity: 0,
    idle_minutes: 0,
    screenshots: 0,
  });

  /* ================= FETCH DAILY SUMMARY ================= */

  useEffect(() => {
    if (mode !== "daily") return;

    const fetchSummary = async () => {
      try {
        const dateStr = selectedDate.toLocaleDateString("en-CA");

        const res = await fetch(
          `http://localhost:5000/api/time-entries/summary?date=${dateStr}&user_id=${ASSIGNED_USER.id}`
        );

        const data = await res.json();

        setSummary({
          total_minutes: Number(data.total_minutes) || 0,
          avg_activity: Number(data.avg_activity) || 0,
          idle_minutes: Number(data.idle_minutes) || 0,
          screenshots: Number(data.screenshots) || 0,
        });
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    };

    fetchSummary();
  }, [selectedDate, mode]);

  /* ================= KPI CONFIG ================= */

  const kpis = [
    {
      label: mode === "daily" ? "Hours Logged" : "Hours This Week",
      value: `${Math.floor(summary.total_minutes / 60)}h ${
        summary.total_minutes % 60
      }m`,
      icon: Clock,
    },
    {
      label: "Avg Productivity",
      value: `${summary.avg_activity}%`,
      icon: Activity,
    },
    {
      label: mode === "daily" ? "Idle Time Today" : "Idle Time (Week)",
      value: `${summary.idle_minutes} min`,
      icon: PauseCircle,
    },
    {
      label: "Screenshots Captured",
      value: summary.screenshots,
      icon: Camera,
    },
  ];

  /* ================= VIEW DAY (FROM WEEKLY) ================= */

  const handleViewDay = (dateObj) => {
    setSelectedDate(dateObj);
    setMode("daily");
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tracking Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            View activity based on selected period
          </p>
        </div>

        {/* MODE TOGGLE */}
        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
          {["daily", "weekly"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-md text-sm transition ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {m === "daily" ? "Daily" : "Weekly"}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTROL BAR (DAILY ONLY) ================= */}
      {mode === "daily" && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* USER */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2">
            <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center font-semibold">
              {ASSIGNED_USER.name.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900 dark:text-slate-200">
                {ASSIGNED_USER.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {ASSIGNED_USER.role}
              </p>
            </div>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
            <button
              onClick={() =>
                setSelectedDate(
                  new Date(selectedDate.getTime() - 86400000)
                )
              }
            >
              ⬅
            </button>

            <input
              type="date"
              value={selectedDate.toLocaleDateString("en-CA")}
              onChange={(e) => {
                const [y, m, d] = e.target.value.split("-").map(Number);
                setSelectedDate(new Date(y, m - 1, d));
              }}
              className="bg-transparent text-sm focus:outline-none"
            />

            <button
              onClick={() =>
                setSelectedDate(
                  new Date(selectedDate.getTime() + 86400000)
                )
              }
            >
              ➡
            </button>
          </div>

          {/* TIMEZONE */}
          <select
            value={timezone.value}
            onChange={(e) =>
              setTimezone(TIMEZONES.find((t) => t.value === e.target.value))
            }
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>

          {/* ACTIONS */}
          <details className="relative">
            <summary className="cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm">
              ⚙ Actions
            </summary>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20">
              <button
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
                onClick={() => window.location.reload()}
              >
                🔄 Refresh
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
                onClick={() => setShowInactive((p) => !p)}
              >
                {showInactive ? "🙈 Hide Inactive" : "👁 Show Inactive"}
              </button>
            </div>
          </details>
        </div>
      )}

      {/* ================= KPI STRIP ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center gap-4"
          >
            <Icon className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {label}
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      {mode === "daily" ? (
        <DailyTracking
          showInactive={showInactive}
          timezone={timezone}
          selectedDate={selectedDate}
        />
      ) : (
        <WeeklyTracking
          selectedDate={selectedDate}
          onViewDay={handleViewDay}
        />
      )}
    </div>
  );
}
