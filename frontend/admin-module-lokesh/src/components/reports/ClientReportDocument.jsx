import React from "react";

/* ================= HELPERS ================= */

const formatMinutes = (minutes = 0) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

/* ================= COMPONENT ================= */

const ClientReportDocument = ({
  project = "Project Activity Report",
  client = "Client",
  periodLabel = "Report Summary",
  summary = {
    total_minutes: 0,
    avg_activity: 0,
    idle_minutes: 0,
    screenshots: 0,
  },
  days = [], // array of daily rows
}) => {
  const generatedDate = new Date().toLocaleDateString();

  return (
    <div className="bg-white text-gray-900 p-10 max-w-4xl mx-auto">

      {/* ================= COVER ================= */}
      <header className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">
          {project}
        </h1>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><strong>Client:</strong> {client}</p>
          <p><strong>Generated on:</strong> {generatedDate}</p>
          <p><strong>Reporting Period:</strong> {periodLabel}</p>
        </div>
      </header>

      {/* ================= EXECUTIVE SUMMARY ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          Executive Summary
        </h2>

        <p className="text-gray-700 leading-relaxed">
          During the reporting period, a total of{" "}
          <strong>{formatMinutes(summary.total_minutes)}</strong>{" "}
          was logged with an average productivity of{" "}
          <strong>{summary.avg_activity}%</strong>.{" "}
          Idle time accounted for{" "}
          <strong>{summary.idle_minutes} minutes</strong>, and{" "}
          <strong>{summary.screenshots}</strong>{" "}
          screenshots were captured.
        </p>
      </section>

      {/* ================= KEY METRICS ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Key Metrics
        </h2>

        <table className="w-full border border-gray-300 text-sm">
          <tbody>
            <MetricRow label="Total Hours Worked" value={formatMinutes(summary.total_minutes)} />
            <MetricRow label="Average Activity" value={`${summary.avg_activity}%`} />
            <MetricRow label="Idle Time" value={`${summary.idle_minutes} min`} />
            <MetricRow label="Screenshots Captured" value={summary.screenshots} />
          </tbody>
        </table>
      </section>

      {/* ================= DAILY ACTIVITY ================= */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Daily Activity Breakdown
        </h2>

        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Hours</th>
              <th className="border px-3 py-2">Activity (%)</th>
              <th className="border px-3 py-2">Idle (min)</th>
              <th className="border px-3 py-2">Screenshots</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.date}>
                <td className="border px-3 py-2 text-center">
                  {new Date(d.date).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2 text-center">
                  {formatMinutes(d.total_minutes)}
                </td>
                <td className="border px-3 py-2 text-center">
                  {d.avg_activity}%
                </td>
                <td className="border px-3 py-2 text-center">
                  {d.idle_minutes}
                </td>
                <td className="border px-3 py-2 text-center">
                  {d.screenshots}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t pt-6 text-sm text-gray-600">
        <p>
          This report was automatically generated from tracked activity data and
          is intended for client review purposes only.
        </p>
      </footer>
    </div>
  );
};

/* ================= SMALL HELPERS ================= */

const MetricRow = ({ label, value }) => (
  <tr>
    <td className="border px-4 py-2 font-medium">{label}</td>
    <td className="border px-4 py-2">{value}</td>
  </tr>
);

export default ClientReportDocument;
