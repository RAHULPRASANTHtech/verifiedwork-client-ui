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
import ActivityStats from "../../components/reports/ActivityStats";
import ClientReportDocument from "../../components/reports/ClientReportDocument";

// ⚠️ KEEP MOCKS FOR DASHBOARD UI ONLY
import {
  MOCK_ACTIVITY_DATA,
  MOCK_TASK_DISTRIBUTION,
  MOCK_TASKS,
} from "../../services/reportMockData";

const USER_ID = 1;

const ClientDashboard = () => {
  const reportRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  // 🔹 REAL DATA FOR PDF ONLY
  const [reportData, setReportData] = useState(null);

  /* ================= EXPORT PDF ================= */
  const handleExportPDF = async () => {
    setExporting(true);

    try {
      // 🔹 Fetch WEEKLY data from DB
      const weekStart = "2025-12-22"; // you can make this dynamic later

      const res = await fetch(
        `http://localhost:5000/api/time-entries/weekly?weekStart=${weekStart}&user_id=${USER_ID}`
      );
      const weekly = await res.json();

      setReportData({
        weekly,
        generatedAt: new Date().toLocaleDateString(),
      });

      // ⏳ wait for DOM render
      await new Promise((r) => setTimeout(r, 500));

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
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExporting(false);
    }
  };

  /* ================= DASHBOARD CALCULATIONS (MOCK OK) ================= */
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
      {/* ================= DASHBOARD UI ================= */}
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
              value={`${totalActualHours} hrs`}
              icon={Clock}
              colorClass="bg-blue-500/20 text-blue-500"
            />
            <KPICard
              title="Avg. Activity"
              value="76%"
              icon={Activity}
              colorClass="bg-purple-500/20 text-purple-500"
            />
            <KPICard
              title="Tasks Completed"
              value={MOCK_TASKS.length}
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

        {/* CHARTS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyActivityChart data={MOCK_ACTIVITY_DATA} />
          </div>
          <TaskDistributionChart data={MOCK_TASK_DISTRIBUTION} />
        </section>

        {/* ACTIVITY STATS */}
        <ActivityStats />
      </div>

      {/* ================= PDF SOURCE (REAL DATA) ================= */}
      {exporting && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div ref={reportRef}>
            <ClientReportDocument data={reportData} />
          </div>
        </div>
      )}
    </>
  );
};

export default ClientDashboard;
