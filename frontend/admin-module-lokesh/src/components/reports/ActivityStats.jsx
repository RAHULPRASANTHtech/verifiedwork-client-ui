import { useEffect, useState } from "react";
import { Keyboard, Mouse } from "lucide-react";

const ActivityStats = ({ date }) => {
  const [stats, setStats] = useState({
    keyboard: 0,
    mouse: 0,
  });

  const [loading, setLoading] = useState(false);

  const userId = 1;

  useEffect(() => {
    if (!date) return;

    const fetchStats = async () => {
      try {
        setLoading(true);

        // convert Date object → YYYY-MM-DD
        const dateStr =
          date instanceof Date
            ? date.toLocaleDateString("en-CA")
            : date;

        const res = await fetch(
          `http://localhost:5000/api/activity-stats?user_id=${userId}&date=${dateStr}`
        );

        const data = await res.json();

        console.log("🔥 Activity stats:", data);

        setStats({
          keyboard: Number(data.keyboard || 0),
          mouse: Number(data.mouse || 0),
        });
      } catch (err) {
        console.error("Failed to fetch activity stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [date]);

  return (
    <div
      className="
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        p-6 rounded-xl
        shadow-sm dark:shadow-black/20
        transition-colors
      "
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-4">
        Activity Stats
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Keyboard */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-500">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keyboard Strokes
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {loading ? "—" : stats.keyboard.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Mouse */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20 text-green-500">
            <Mouse className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mouse Clicks
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {loading ? "—" : stats.mouse.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
