import ScreenshotCard from "./ScreenshotCard";

/* ================= HELPERS ================= */

const getActivityColor = (activity = 0) => {
  if (activity >= 75) return "bg-green-500";
  if (activity >= 40) return "bg-yellow-400";
  return "bg-red-400";
};

const formatTimeRange = (hour, slot) => {
  const startMin = parseInt(slot.split("-")[0], 10);
  const endMin = startMin + 10;

  const startHour = hour;
  const endHour = endMin === 60 ? hour + 1 : hour;
  const finalEndMin = endMin === 60 ? 0 : endMin;

  const start = `${startHour.toString().padStart(2, "0")}:${startMin
    .toString()
    .padStart(2, "0")}`;

  const end = `${endHour.toString().padStart(2, "0")}:${finalEndMin
    .toString()
    .padStart(2, "0")}`;

  return `${start} – ${end}`;
};

/* ================= COMPONENT ================= */

export default function TimeGrid({
  screenshots = [],
  showInactive = true,
  onSelectShot,
}) {
  if (!screenshots.length && !showInactive) return null;

  return (
    <div className="space-y-4">
      {screenshots.map((shot) => (
        <div
          key={`${shot.hour}-${shot.slot}`}
          className="
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            rounded-xl p-4
            transition
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {formatTimeRange(shot.hour, shot.slot)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {shot.app || "Unknown application"}
              </p>
            </div>

            {/* ACTIVITY BAR */}
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getActivityColor(shot.activity)}`}
                  style={{ width: `${shot.activity || 0}%` }}
                />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {shot.activity || 0}%
              </span>
            </div>
          </div>

          {/* SCREENSHOTS */}
{shot.images && shot.images.length > 0 ? (
  <>
    {/* Screenshot count label */}
    <p className="text-xs text-slate-500 mb-2">
      📸 {shot.images.length} screenshot
      {shot.images.length > 1 ? "s" : ""}
    </p>

    <div className="flex gap-3 overflow-x-auto">
      {shot.images.map((img, idx) => (
        <div key={idx} className="min-w-[120px]">
          <ScreenshotCard
            shot={{
              ...shot,
              image: img.image_path,
              app: img.app,
              activity: img.activity,
            }}
            onClick={() =>
  onSelectShot({
    imageUrl: img.image_path,      // 👈 matches modal
    activity: img.activity,
    app: img.app,
    capturedAt: formatTimeRange(shot.hour, shot.slot),
    keyboard: img.keyboard_count ?? "—",
    mouse: img.mouse_count ?? "—",
    activityHistory: [],            // future ready
  })
}

          />
        </div>
      ))}
    </div>
  </>
) : showInactive ? (
  <div
    className="
      h-16 rounded-lg
      border border-dashed
      border-slate-300 dark:border-slate-700
      flex items-center justify-center
      text-xs text-slate-500 dark:text-slate-400
    "
  >
    No screenshots captured
  </div>
) : null}

        </div>
      ))}
    </div>
  );
}
