import ScreenshotCard from "./ScreenshotCard";

const TIME_SLOTS = [
  "00-10",
  "10-20",
  "20-30",
  "30-40",
  "40-50",
  "50-60",
];

const HOURS = [9, 10, 11, 12, 13, 14];

export default function TimeGrid({
  screenshots = [],
  showInactive = true,
  onSelectShot,
}) {
  const getScreenshotForSlot = (hour, slot) =>
    screenshots.find((s) => s.hour === hour && s.slot === slot);

  return (
    <div
      className="
        overflow-x-auto rounded-xl
        border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-900
        transition-colors
      "
    >
      <table className="w-full border-collapse text-sm">
        {/* HEADER */}
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="w-16"></th>
            {TIME_SLOTS.map((slot) => (
              <th
                key={slot}
                className="px-3 py-3 text-center
                           text-slate-500 dark:text-slate-400
                           font-medium"
              >
                {slot}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {HOURS.map((hour) => (
            <tr
              key={hour}
              className="
                border-b border-slate-100 dark:border-slate-800
                hover:bg-slate-50 dark:hover:bg-slate-800/40
                transition
              "
            >
              {/* Hour */}
              <td className="px-3 py-4 text-slate-500 dark:text-slate-400 font-medium">
                {hour}
              </td>

              {TIME_SLOTS.map((slot) => {
                const shot = getScreenshotForSlot(hour, slot);

                return (
                  <td
                    key={slot}
                    className="px-2 py-3 align-top min-w-[150px]"
                  >
                    {shot ? (
                      <ScreenshotCard
                        shot={shot}
                        onClick={() => onSelectShot(shot)}
                      />
                    ) : showInactive ? (
                      <div
                        className="
                          h-28 rounded-md
                          border border-dashed
                          border-slate-300 dark:border-slate-700
                          bg-slate-50 dark:bg-transparent
                          opacity-70
                        "
                      />
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
