import React from "react";

// Mock Data (later replaced by backend)
import {
  KPI_SUMMARY,
  MOCK_TASKS,
  MOCK_ACTIVITY_DATA,
} from "../../services/reportMockData";

const ClientReportDocument = () => {
  const generatedDate = new Date().toLocaleDateString();

  return (
    <div className="bg-white text-gray-900 p-10 max-w-4xl mx-auto">
      {/* ================= COVER ================= */}
      <header className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">
          Project Activity Report
        </h1>
        <p className="text-gray-600">
          E-Commerce Platform Redesign
        </p>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><strong>Client:</strong> ABC Retail Pvt Ltd</p>
          <p><strong>Generated on:</strong> {generatedDate}</p>
          <p><strong>Reporting Period:</strong> Weekly Summary</p>
        </div>
      </header>

      {/* ================= EXECUTIVE SUMMARY ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          Executive Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          During the reporting period, a total of{" "}
          <strong>{KPI_SUMMARY.totalHours}</strong> was spent on the project.
          The average activity level recorded was{" "}
          <strong>{KPI_SUMMARY.avgActivity}</strong>, with{" "}
          <strong>{KPI_SUMMARY.tasksCompleted}</strong> tasks completed.
          The project is currently progressing as planned.
        </p>
      </section>

      {/* ================= KEY METRICS ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Key Metrics
        </h2>

        <table className="w-full border border-gray-300 text-sm">
          <tbody>
            <MetricRow label="Total Hours Worked" value={KPI_SUMMARY.totalHours} />
            <MetricRow label="Average Activity" value={KPI_SUMMARY.avgActivity} />
            <MetricRow label="Tasks Completed" value={KPI_SUMMARY.tasksCompleted} />
            <MetricRow label="Estimated Earnings" value={KPI_SUMMARY.earnings} />
          </tbody>
        </table>
      </section>

      {/* ================= TASK BREAKDOWN ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Task Breakdown
        </h2>

        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Task</th>
              <th className="border px-3 py-2">Estimated (hrs)</th>
              <th className="border px-3 py-2">Actual (hrs)</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TASKS.map((task) => (
              <tr key={task.id}>
                <td className="border px-3 py-2">{task.title}</td>
                <td className="border px-3 py-2 text-center">
                  {task.estimatedHours}
                </td>
                <td className="border px-3 py-2 text-center">
                  {task.actualHours}
                </td>
                <td className="border px-3 py-2 text-center">
                  {task.actualHours >= task.estimatedHours
                    ? "In Progress"
                    : "Completed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= ACTIVITY SUMMARY ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          Activity Overview
        </h2>

        <p className="text-gray-700 mb-4">
          The following table summarizes daily activity levels and hours worked
          during the reporting period.
        </p>

        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Day</th>
              <th className="border px-3 py-2">Hours Worked</th>
              <th className="border px-3 py-2">Activity (%)</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ACTIVITY_DATA.map((day) => (
              <tr key={day.name}>
                <td className="border px-3 py-2 text-center">{day.name}</td>
                <td className="border px-3 py-2 text-center">{day.hours}</td>
                <td className="border px-3 py-2 text-center">{day.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t pt-6 text-sm text-gray-600">
        <p>
          This report was automatically generated from tracked project activity
          data and is intended for client review purposes only.
        </p>
      </footer>
    </div>
  );
};

/* ===== Helpers ===== */

const MetricRow = ({ label, value }) => (
  <tr>
    <td className="border px-4 py-2 font-medium">{label}</td>
    <td className="border px-4 py-2">{value}</td>
  </tr>
);

export default ClientReportDocument;