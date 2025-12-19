import React, { useRef, useState } from "react";
import {
  Clock,
  Activity,
  CheckCircle,
  Hourglass,
  Timer,
  Download,
} from "lucide-react";
import html2pdf from "html2pdf.js";

// Components
import KPICard from "../../components/common/KPICard";
import {
  WeeklyActivityChart,
  TaskDistributionChart,
} from "../../components/reports/ProductivityCharts";
import ScreenshotViewer from "../../components/reports/ScreenshotViewer";
import ActivityStats from "../../components/reports/ActivityStats";
import ClientReportDocument from "../../components/reports/ClientReportDocument";

// Mock Data
import {
  MOCK_ACTIVITY_DATA,
  MOCK_TASK_DISTRIBUTION,
  MOCK_SCREENSHOTS,
  KPI_SUMMARY,
  MOCK_TASKS,
} from "../../services/reportMockData";

const ClientDashboard = () => {
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  /* ================= EXPORT ================= */
  const handleExportPDF = async () => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 300));

    if (!reportRef.current) return;

    await html2pdf()
      .set({
        margin: 0.5,
        filename: "client-project-report.pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(reportRef.current)
      .save();

    setExporting(false);
  };

  /* ================= CALCULATIONS ================= */
  const totalEstimatedHours = MOCK_TASKS.reduce(
    (sum, task) => sum + task.estimatedHours,
    0
  );

  const totalActualHours = MOCK_TASKS.reduce(
    (sum, task) => sum + task.actualHours,
    0
  );

  const totalSubtasks = MOCK_TASKS.reduce(
    (sum, task) => sum + task.subtasks.length,
    0
  );

  const avgTaskCompletionTime =
    totalSubtasks > 0 ? totalActualHours / totalSubtasks : 0;

  const remainingHours = totalEstimatedHours - totalActualHours;

  return (
    <>
      {/* ================= DASHBOARD ================= */}
      <div className="antialiased space-y-10">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Project Analytics
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              High level overview
            </p>
          </div>

          <button
            onClick={handleExportPDF}
            className="
              flex items-center gap-2
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              text-slate-900 dark:text-slate-200
              px-4 py-2 rounded-lg
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
            "
          >
            <Download className="w-4 h-4" />
            Export Professional Report
          </button>
        </section>

        {/* KPI CARDS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <KPICard
              title="Total Hours"
              value={KPI_SUMMARY.totalHours}
              icon={Clock}
              colorClass="bg-blue-500/20 text-blue-500"
            />
            <KPICard
              title="Avg. Activity"
              value={KPI_SUMMARY.avgActivity}
              icon={Activity}
              colorClass="bg-purple-500/20 text-purple-500"
            />
            <KPICard
              title="Tasks Completed"
              value={KPI_SUMMARY.tasksCompleted}
              icon={CheckCircle}
              colorClass="bg-green-500/20 text-green-500"
            />
            <KPICard
              title="Estimated Project Hours"
              value={`${totalEstimatedHours} hrs`}
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
              title="Est. Time Remaining"
              value={`${remainingHours} hrs`}
              icon={Clock}
              colorClass="bg-orange-500/20 text-orange-500"
            />
          </div>
        </section>

        {/* QUICK SUMMARY */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard label="Project Health" value="On Track" color="text-green-600" />
          <SummaryCard label="Most Productive Day" value="Thursday" />
          <SummaryCard label="Risk Level" value="Low" color="text-blue-600" />
        </section>

        {/* CHARTS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyActivityChart data={MOCK_ACTIVITY_DATA} />
          </div>
          <TaskDistributionChart data={MOCK_TASK_DISTRIBUTION} />
        </section>

        {/* ACTIVITY STATS */}
        <ActivityStats />

        {/* RECENT ACTIVITY */}
        <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>🟢 Dashboard UI finalized</span>
              <span>Today</span>
            </li>
            <li className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>🟡 API integration pending</span>
              <span>Yesterday</span>
            </li>
            <li className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>🔵 6h logged this week</span>
              <span>This week</span>
            </li>
          </ul>
        </section>

        {/* SCREENSHOTS */}
        <ScreenshotViewer screenshots={MOCK_SCREENSHOTS} />
      </div>

      {/* PDF SOURCE */}
      {exporting && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div ref={reportRef}>
            <ClientReportDocument />
          </div>
        </div>
      )}
    </>
  );
};

/* ================= HELPERS ================= */
const SummaryCard = ({ label, value, color }) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className={`text-2xl font-semibold ${color || "text-slate-900 dark:text-white"}`}>
      {value}
    </p>
  </div>
);

export default ClientDashboard;
