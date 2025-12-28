import { Download } from "lucide-react";

export default function Reports() {
  const userId = 1;

  const handleExportMonthly = () => {
    const today = new Date();
    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
      .toISOString()
      .slice(0, 10); // YYYY-MM-DD

    // 🔥 REAL DB export
    window.location.href =
      `http://localhost:5000/api/time-entries/monthly/export?monthStart=${monthStart}&user_id=${userId}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Export Report
      </h1>

      <p className="text-slate-500 dark:text-slate-400">
        Download activity reports generated from tracked data.
      </p>

      <button
        onClick={handleExportMonthly}
        className="
          flex items-center gap-2
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          px-4 py-2 rounded-lg
          hover:bg-slate-100 dark:hover:bg-slate-700
          transition
        "
      >
        <Download className="w-4 h-4" />
        Export Monthly Report (CSV)
      </button>
    </div>
  );
}
