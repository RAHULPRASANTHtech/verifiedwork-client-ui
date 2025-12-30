import ScreenshotCard from "./ScreenshotCard";

/* ================= HELPERS ================= */

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const SLOTS = ["00-10", "10-20", "20-30", "30-40", "40-50", "50-60"];

const getActivityColor = (activity = 0) => {
  if (activity >= 75) return "bg-green-500";
  if (activity >= 40) return "bg-yellow-400";
  return "bg-red-400";
};

const formatRange = (hour, slot) => {
  const [s, e] = slot.split("-").map(Number);
  const endHour = e === 60 ? hour + 1 : hour;
  const endMin = e === 60 ? 0 : e;

  return `${hour.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")} – ${endHour
    .toString()
    .padStart(2, "0")}:${endMin.toString().padStart(2, "0")}`;
};

/* ================= COMPONENT ================= */

export default function TimeGrid({
  screenshots = [],
  showInactive = true,
  onSelectShot,
}) {
  // Map for fast lookup
  const slotMap = new Map();
  screenshots.forEach((s) => {
    slotMap.set(`${s.hour}-${s.slot}`, s);
  });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px] space-y-2">
        {/* ===== HEADER ROW (FIXED) ===== */}
        <div className="grid grid-cols-[80px_repeat(6,minmax(0,1fr))] gap-2">
          <div /> {/* empty hour column */}
          {SLOTS.map((slot) => (
            <div
              key={slot}
              className="text-xs text-center text-slate-500 dark:text-slate-400"
            >
              :{slot}
            </div>
          ))}
        </div>

        {/* ===== HOURS GRID ===== */}
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[80px_repeat(6,minmax(0,1fr))] gap-2"
          >
            {/* HOUR LABEL */}
            <div className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center">
              {hour.toString().padStart(2, "0")}
            </div>

            {/* 10 MIN CELLS */}
            {SLOTS.map((slot) => {
              const shot = slotMap.get(`${hour}-${slot}`);

              if (!shot && !showInactive) return <div key={slot} />;

              return (
                <div
                  key={slot}
                  className="
                    relative
                    h-[120px]
                    rounded-lg
                    border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800
                    flex items-center justify-center
                    hover:ring-2 hover:ring-blue-500/40
                    transition
                  "
                >
                  {shot?.images?.length ? (
                    <ScreenshotCard
                      compact
                      shot={{
                        image: shot.images[0].image_path,
                        app: shot.app,
                        activity: shot.activity,
                      }}
                      onClick={() =>
                        onSelectShot({
                          imageUrl: shot.images[0].image_path,
                          activity: shot.activity,
                          app: shot.app,
                          capturedAt: formatRange(hour, slot),
                          keyboard: shot.images[0].keyboard_count ?? "—",
                          mouse: shot.images[0].mouse_count ?? "—",
                          activityHistory: [],
                        })
                      }
                    />
                  ) : (
                    <span className="text-xs text-slate-400">
                      No screenshot
                    </span>
                  )}

                  {/* ACTIVITY BAR */}
                  <div className="absolute bottom-1 left-1 right-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getActivityColor(
                        shot?.activity || 0
                      )}`}
                      style={{ width: `${shot?.activity || 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
