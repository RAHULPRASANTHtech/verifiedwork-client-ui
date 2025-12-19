import React, { useState } from "react";
import ScreenshotCard from "./ScreenshotCard";
import ScreenshotDetailsModal from "./ScreenshotDetailsModal";
import { SCREENSHOTS } from "../../data/screenshotMockData";

const ScreenshotViewer = ({ screenshots }) => {
  const [selectedShot, setSelectedShot] = useState(null);

  return (
    <div
      className="
        bg-white dark:bg-slate-800
        p-6 rounded-xl
        border border-slate-200 dark:border-slate-700
        shadow-sm dark:shadow-black/20
        transition-colors
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">
          Screenshot Timeline
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Captured at intervals
        </span>
      </div>

      {/* Screenshot Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {SCREENSHOTS.map((shot) => (
          <ScreenshotCard
            key={shot.id}
            shot={shot}
            onClick={() => setSelectedShot(shot)}
          />
        ))}
      </div>

      {/* Modal */}
      <ScreenshotDetailsModal
        shot={selectedShot}
        onClose={() => setSelectedShot(null)}
      />
    </div>
  );
};

export default ScreenshotViewer;
