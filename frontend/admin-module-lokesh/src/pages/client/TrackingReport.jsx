import { useState } from "react";
import WeeklyTracking from "../../components/reports/WeeklyTracking";
import DailyTracking from "../../components/reports/DailyTracking";

const TIMEZONES = [
  { label: "GMT +5:30 (IST)", value: "Asia/Kolkata" },
  { label: "GMT +0 (UTC)", value: "UTC" },
  { label: "GMT -5 (EST)", value: "America/New_York" },
];

// 🔒 Assigned freelancer (mock – backend later)
const ASSIGNED_USER = {
  name: "Rahul Prasanth",
  role: "Frontend Developer",
  avatar: null,
};

export default function TrackingReport() {
  const [mode, setMode] = useState("daily");
  const [showInactive, setShowInactive] = useState(true);
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeDate = (days) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    setSelectedDate(next);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
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
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setMode("daily")}
            className={`px-4 py-2 rounded-md text-sm transition ${
              mode === "daily"
                ? "bg-blue-600 text-white"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setMode("weekly")}
            className={`px-4 py-2 rounded-md text-sm transition ${
              mode === "weekly"
                ? "bg-blue-600 text-white"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* ACTION BAR */}
      {mode === "daily" && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* USER INFO */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2">
            <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-900 dark:text-white">
              {ASSIGNED_USER.name.charAt(0)}
            </div>

            <div className="text-sm">
              <p className="text-slate-900 dark:text-slate-200 font-medium">
                {ASSIGNED_USER.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                {ASSIGNED_USER.role}
              </p>
            </div>
          </div>

          {/* DATE NAV */}
<div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">

  {/* PREVIOUS DAY */}
  <button
    onClick={() => changeDate(-1)}
    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    title="Previous day"
  >
    ⬅
  </button>

  {/* DATE PICKER */}
  <input
    type="date"
    value={selectedDate.toISOString().split("T")[0]}
    onChange={(e) => {
      const picked = new Date(e.target.value);
      if (!isNaN(picked)) setSelectedDate(picked);
    }}
    className="
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      rounded-md px-2 py-1 text-sm
      text-slate-900 dark:text-slate-200
      focus:outline-none focus:ring-2 focus:ring-blue-500
    "
  />

  {/* NEXT DAY */}
  <button
    onClick={() => changeDate(1)}
    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    title="Next day"
  >
    ➡
  </button>

</div>


          {/* TIMEZONE */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            🌍
            <select
              value={timezone.value}
              onChange={(e) =>
                setTimezone(
                  TIMEZONES.find((t) => t.value === e.target.value)
                )
              }
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-slate-200"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* ACTIONS */}
          <details className="relative">
            <summary className="cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
              ⚙ Actions
            </summary>

            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20">
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
                {showInactive
                  ? "🙈 Hide Inactive Slots"
                  : "👁 Show Inactive Slots"}
              </button>
            </div>
          </details>
        </div>
      )}

      {/* CONTENT */}
      {mode === "daily" ? (
        <DailyTracking
          showInactive={showInactive}
          timezone={timezone}
          selectedDate={selectedDate}
        />
      ) : (
        <WeeklyTracking />
      )}
    </div>
  );
}
