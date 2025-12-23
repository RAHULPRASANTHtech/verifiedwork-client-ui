import React from "react";
import { Keyboard, Mouse } from "lucide-react";

const ActivityStats = () => {
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
        Activity Stats (Mock)
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
              3,245
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
              1,892
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
