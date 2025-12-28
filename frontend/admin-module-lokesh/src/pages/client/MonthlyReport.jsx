import { useEffect, useState } from "react";
import { Download, Clock, Activity, PauseCircle, Camera } from "lucide-react";

/* ================= HELPERS ================= */

const formatMinutes = (minutes = 0) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

/* ================= COMPONENT ================= */

export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // YYYY-MM
  );

  const [summary, setSummary] = useState({
    total_minutes: 0,
    avg_activity: 0,
    idle_minutes: 0,
    screenshots: 0,
  });

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH MONTHLY DATA ================= */

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/time-entries/monthly?month=${selectedMonth}&user_id=1`
        );

        const data = await res.json();

        setSummary({
          total_minutes: data.summary?.total_minutes || 0,
          avg_activity: data.summary?.avg_activity || 0,
          idle_minutes: data.summary?.idle_minutes || 0,
          screenshots: data.summary?.screenshots || 0,
        });

        setRows(data.days || []);
      } catch (err) {
        console.error("Failed to fetch monthly report", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthly();
  }, [selectedMonth]);

  /* ================= CSV EXPORT ================= */

  const handleExportCSV = () => {
    const url = `http://localhost:5000/api/time-entries/export/monthly?month=${selectedMonth}&user_id=1`;
    window.open(url, "_blank");
  };

  /* ================= KPI CONFIG ================= */

  const kpis = [
    {
      label: "Hours Logged",
      value: formatMinutes(summary.total_minutes),
      icon: Clock,
    },
    {
      label: "Avg Productivity",
      value: `${summary.avg_activity}%`,
      icon: Activity,
    },
    {
      label: "Idle Time",
      value: `${summary.idle_minutes} min`,
      icon: PauseCircle,
    },
    {
      label: "Screenshots",
      value: summary.screenshots,
      icon: Camera,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Monthly Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Overview of activity for the selected month
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-1 text-sm"
          />

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* ================= KPI STRIP ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center gap-4"
          >
            <Icon className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-lg font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Daily Breakdown</h3>
          <p className="text-sm text-slate-500">
            Activity summary for each day
          </p>
        </div>

        {loading ? (
          <p className="p-4 text-sm text-slate-500">Loading monthly data…</p>
        ) : rows.length === 0 ? (
          <p className="p-4 text-sm text-slate-500">
            No activity recorded this month
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2">Hours</th>
                <th className="px-4 py-2">Activity</th>
                <th className="px-4 py-2">Idle</th>
                <th className="px-4 py-2">Shots</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.date} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(d.date).toISOString().slice(0, 10)}


                  </td>
                  <td className="px-4 py-2">
                    {formatMinutes(d.total_minutes)}
                  </td>
                  <td className="px-4 py-2">{d.avg_activity}%</td>
                  <td className="px-4 py-2">{d.idle_minutes} min</td>
                  <td className="px-4 py-2">{d.screenshots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
