import React, { useRef, useState } from "react";
import {
  Clock,
  Activity,
  CheckCircle,
  DollarSign,
  Download,
  Hourglass,
  Timer,
} from "lucide-react";
import html2pdf from "html2pdf.js";

// Dashboard Components
import KPICard from "../../components/common/KPICard";

import {
  WeeklyActivityChart,
  TaskDistributionChart,
} from "../../components/reports/ProductivityCharts";

import ScreenshotViewer from "../../components/reports/ScreenshotViewer";
import ActivityStats from "../../components/reports/ActivityStats";

// Professional Report
import ClientReportDocument from "../../components/reports/ClientReportDocument";

// Mock Data
import {
  MOCK_ACTIVITY_DATA,
  MOCK_TASK_DISTRIBUTION,
  MOCK_SCREENSHOTS,
  KPI_SUMMARY,
  MOCK_TASKS,
} from "../../services/reportMockData";


const AnalyticsDashboard = () => {
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef(null);

  // ================= EXPORT PROFESSIONAL REPORT =================
  const handleExportPDF = async () => {
    setExporting(true);

    // allow React to paint the report
    await new Promise((resolve) => setTimeout(resolve, 300));

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

  // ================= CALCULATIONS =================
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
      <div className="text-slate-200 antialiased">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Project Analytics
              </h1>
              <p className="text-slate-400">
                Monitoring report for "E-Commerce Platform Redesign"
              </p>
            </div>

            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-700"
            >
              <Download className="w-4 h-4" />
              Export Professional Report
            </button>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <KPICard title="Total Hours" value={KPI_SUMMARY.totalHours} icon={Clock} colorClass="bg-blue-500/20 text-blue-400" />
            <KPICard title="Avg. Activity" value={KPI_SUMMARY.avgActivity} icon={Activity} colorClass="bg-purple-500/20 text-purple-400" />
            <KPICard title="Tasks Completed" value={KPI_SUMMARY.tasksCompleted} icon={CheckCircle} colorClass="bg-green-500/20 text-green-400" />
            <KPICard title="Est. Earnings" value={KPI_SUMMARY.earnings} icon={DollarSign} colorClass="bg-amber-500/20 text-amber-400" />
            <KPICard title="Estimated Project Hours" value={`${totalEstimatedHours} hrs`} icon={Hourglass} colorClass="bg-indigo-500/20 text-indigo-400" />
            <KPICard title="Avg Task Completion" value={`${avgTaskCompletionTime.toFixed(1)} hrs`} icon={Timer} colorClass="bg-cyan-500/20 text-cyan-400" />
            <KPICard title="Est. Time Remaining" value={`${remainingHours} hrs`} icon={Clock} colorClass="bg-orange-500/20 text-orange-400" />
          </div>
        </section>

        {/* Charts */}
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeeklyActivityChart data={MOCK_ACTIVITY_DATA} />
            </div>
            <div className="lg:col-span-1">
              <TaskDistributionChart data={MOCK_TASK_DISTRIBUTION} />
            </div>
          </div>
        </section>

        {/* Activity Stats */}
        <section className="mb-10">
          <ActivityStats />
        </section>

        {/* Screenshots */}
        <section className="mb-10">
          <ScreenshotViewer screenshots={MOCK_SCREENSHOTS} />
        </section>
      </div>

      {/* ================= REPORT OVERLAY (PDF SOURCE) ================= */}
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

export default CLientDashboard;