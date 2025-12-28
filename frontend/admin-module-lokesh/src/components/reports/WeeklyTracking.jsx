import { useEffect, useState } from "react";
import {
  WeeklyActivityChart,
  TaskDistributionChart,
} from "./ProductivityCharts";

/* ================= DATE HELPERS ================= */

const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (base, days) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

const formatDay = (date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

/* ================= COMPONENT ================= */

export default function WeeklyTracking({ selectedDate, onViewDay }) {
  const [weekRows, setWeekRows] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const monday = getMonday(selectedDate);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        setLoading(true);

        const weekStart = monday.toLocaleDateString("en-CA");

        const res = await fetch(
          `http://localhost:5000/api/time-entries/weekly?weekStart=${weekStart}&user_id=1`
        );

        const dbData = await res.json();

        const mapByDate = {};
        dbData.forEach((d) => {
          const key = new Date(d.date).toLocaleDateString("en-CA");
          mapByDate[key] = d;
        });

        const rows = [];
        const chart = [];

        for (let i = 0; i < 7; i++) {
          const date = addDays(monday, i);
          const key = date.toLocaleDateString("en-CA");
          const record = mapByDate[key];

          const totalMinutes = record ? Number(record.total_minutes) : 0;
          const hoursDecimal = +(totalMinutes / 60).toFixed(2);

          rows.push({
            date,
            day: formatDay(date),
            hours: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
            activity: record ? Number(record.avg_activity) : 0,
            idle: Number(record?.idle_minutes || 0),
            shots: record?.screenshots || 0,
          });

          chart.push({
            name: formatDay(date),
            hours: hoursDecimal,
            activity: record ? Number(record.avg_activity) : 0,
          });
        }

        setWeekRows(rows);
        setChartData(chart);
      } catch (err) {
        console.error("Weekly fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekly();
  }, [selectedDate]);

  /* ================= PIE VALUES ================= */

  const activeMinutes = weekRows.reduce((sum, d) => {
    const [h, m] = d.hours.replace("h", "").replace("m", "").split(" ");
    return sum + Number(h) * 60 + Number(m || 0);
  }, 0) - weekRows.reduce((sum, d) => sum + d.idle, 0);

  const idleMinutes = weekRows.reduce((sum, d) => sum + d.idle, 0);

  return (
    <div className="space-y-8">
      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyActivityChart data={chartData} />
          <p className="text-xs font-bold text-slate-400 mb-2">
  Week of {monday.toDateString()}
</p>
        </div>

        <TaskDistributionChart
          activeMinutes={Math.max(activeMinutes, 0)}
          idleMinutes={idleMinutes}
        />
      </div>

      {/* ================= WEEK TABLE ================= */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Weekly Work Summary</h3>
          <p className="text-sm text-slate-500">
            Click a day to inspect details
          </p>
        </div>


        {loading ? (
          <p className="p-4 text-sm text-slate-500">Loading weekly data…</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left">Day</th>
                <th className="px-4 py-2">Hours</th>
                <th className="px-4 py-2">Activity</th>
                <th className="px-4 py-2">Idle</th>
                <th className="px-4 py-2">Shots</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {weekRows.map((d) => (
                <tr
                  key={d.date.toISOString()}
                  className="border-t hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <td className="px-4 py-3 font-medium">{d.day}</td>
                  <td className="px-4 py-3">{d.hours}</td>
                  <td className="px-4 py-3">{d.activity}%</td>
                  <td className="px-4 py-3">{d.idle} min</td>
                  <td className="px-4 py-3">{d.shots}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onViewDay(d.date)}
                      className="text-blue-300 hover:underline"
                    >
                      View Day →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
