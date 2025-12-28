import { useEffect, useState } from "react";
import {
  Clock,
  Activity,
  CheckCircle,
  Hourglass,
  Timer,
  TrendingUp,
} from "lucide-react";

import KPICard from "../../components/common/KPICard";

/* ================= CONFIG ================= */
const USER_ID = 1;
const PROJECT_ID = 1;

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD SUMMARY ================= */
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/dashboard/summary?user_id=${USER_ID}&project_id=${PROJECT_ID}`
        );

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch dashboard summary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  /* ================= LOADING STATE ================= */
  if (loading || !summary) {
    return (
      <p className="text-sm text-slate-500">
        Loading dashboard...
      </p>
    );
  }

  const avgTaskCompletionTime =
    summary.tasks_completed > 0
      ? summary.actual_hours / summary.tasks_completed
      : 0;

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Project Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          High level overview
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <KPICard
          title="Total Hours Logged"
          value={`${(summary.total_minutes / 60).toFixed(1)} hrs`}
          icon={Clock}
          colorClass="bg-blue-500/20 text-blue-500"
        />

        <KPICard
          title="Avg. Activity"
          value={`${summary.avg_activity}%`}
          icon={Activity}
          colorClass="bg-purple-500/20 text-purple-500"
        />

        <KPICard
          title="Tasks Completed"
          value={summary.tasks_completed}
          icon={CheckCircle}
          colorClass="bg-green-500/20 text-green-500"
        />

        <KPICard
          title="Estimated Project Hours"
          value={`${summary.estimated_hours} hrs`}
          icon={Hourglass}
          colorClass="bg-indigo-500/20 text-indigo-500"
        />

        <KPICard
          title="Avg Task Completion"
          value={`${avgTaskCompletionTime.toFixed(1)} hrs`}
          icon={Timer}
          colorClass="bg-cyan-500/20 text-cyan-500"
        />

        <KPICard
          title="Time Remaining"
          value={`${summary.remaining_hours} hrs`}
          icon={Clock}
          colorClass="bg-orange-500/20 text-orange-500"
        />
      </div>

      {/* ================= QUICK SUMMARY ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Work Progress"
          value="On Track"
          description="Project is progressing as planned"
          icon={TrendingUp}
        />

        <SummaryCard
          title="Productivity Trend"
          value="Stable"
          description="Consistent activity this week"
          icon={Activity}
        />

        <SummaryCard
          title="Delivery Risk"
          value="Low"
          description="No delays detected"
          icon={CheckCircle}
        />
      </div>

      {/* ================= RECENT HIGHLIGHTS ================= */}
      <div
        className="
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-xl p-6
        "
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Recent Highlights
        </h3>

        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li>• {summary.tasks_completed} tasks completed so far</li>
          <li>• Average activity around {summary.avg_activity}%</li>
          <li>• Remaining work estimated at {summary.remaining_hours} hrs</li>
        </ul>
      </div>
    </div>
  );
};

/* ================= HELPER ================= */

const SummaryCard = ({ title, value, description, icon: Icon }) => (
  <div
    className="
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      rounded-xl p-5
      flex items-start gap-4
    "
  >
    <div className="p-3 rounded-lg bg-blue-500/20 text-blue-500">
      <Icon className="w-5 h-5" />
    </div>

    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="text-lg font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  </div>
);

export default Dashboard;
