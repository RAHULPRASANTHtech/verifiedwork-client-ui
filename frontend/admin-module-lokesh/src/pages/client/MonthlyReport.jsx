import React from "react";

const MonthlyReport = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Monthly Report
      </h1>

      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Select a date range to view activity summary.
      </p>

      {/* Placeholder */}
      <div
        className="
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-lg p-6
          transition-colors
        "
      >
        <p className="text-slate-700 dark:text-slate-300">
          📅 Calendar view will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default MonthlyReport;
