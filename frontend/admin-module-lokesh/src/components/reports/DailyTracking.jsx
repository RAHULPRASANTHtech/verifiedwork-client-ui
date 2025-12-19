import { useState } from "react";
import ActivityStats from "./ActivityStats";
import TimeGrid from "./TimeGrid";
import ScreenshotDetailsModal from "./ScreenshotDetailsModal";
import { MOCK_SCREENSHOT_GRID } from "../../services/reportMockData";

export default function DailyTracking({
  showInactive,
  timezone,
  selectedDate,
}) {
  const [selectedShot, setSelectedShot] = useState(null);

  return (
    <div className="space-y-8">
      {/* DATE INFO */}
      <div
  className="
    bg-white dark:bg-slate-800
    border border-slate-200 dark:border-slate-700
    rounded-lg p-4
    transition-colors
  "
>
  <p className="text-slate-700 dark:text-slate-300 text-sm">
    📅 {selectedDate.toDateString()}
  </p>
  <p className="text-slate-500 dark:text-slate-400 text-xs">
    Timezone: {timezone.label}
  </p>
</div>


      {/* ACTIVITY STATS */}
      <ActivityStats />

      {/* TIME GRID */}
      <TimeGrid
        screenshots={MOCK_SCREENSHOT_GRID}
        showInactive={showInactive}
        onSelectShot={setSelectedShot}
      />

      {/* MODAL */}
      <ScreenshotDetailsModal
        shot={selectedShot}
        onClose={() => setSelectedShot(null)}
      />
    </div>
  );
}
