const ScreenshotDetailsModal = ({ shot, onClose }) => {
  if (!shot) return null;

  const {
    imageUrl,
    img,
    capturedAt,
    time,
    activity = 0,
    app,
    keyboard = 0,
    mouse = 0,
    activityHistory = [],
  } = shot;

  const hasActivityHistory = activityHistory.length > 0;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 w-full max-w-5xl rounded-xl shadow-xl relative overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold">
              Screenshot Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {capturedAt || time || "—"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">

          {/* LEFT — IMAGE */}
          <div>
            <img
              src={imageUrl || img}
              alt="Screenshot"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 mb-4"
            />

            {/* APP + ACTIVITY */}
            <div className="space-y-3">
              {app && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">
                  🖥️ <span className="font-medium">{app}</span>
                </div>
              )}

              {/* ACTIVITY BAR */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 dark:text-slate-400">
                  <span>Activity</span>
                  <span>{activity}%</span>
                </div>
                <div className="h-2 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full ${
                      activity >= 80
                        ? "bg-green-500"
                        : activity >= 50
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${activity}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div className="space-y-6 text-sm">

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Duration" value="10 min" />
              <Stat label="Session" value="Active (10 min slot)" />
              <Stat label="Keyboard" value={keyboard} />
              <Stat label="Mouse" value={mouse} />
            </div>

            {/* ACTIVITY HISTORY */}
            <div>
              <h3 className="font-semibold mb-2">
                Activity Timeline
              </h3>

              {hasActivityHistory ? (
                <div className="overflow-auto border rounded-lg border-slate-200 dark:border-slate-700">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="px-3 py-2 text-left">Time</th>
                        <th className="px-3 py-2 text-left">App</th>
                        <th className="px-3 py-2 text-center">Keys</th>
                        <th className="px-3 py-2 text-center">Mouse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityHistory.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t border-slate-200 dark:border-slate-700"
                        >
                          <td className="px-3 py-2">{row.time}</td>
                          <td className="px-3 py-2">{row.app}</td>
                          <td className="px-3 py-2 text-center">
                            {row.keyboard}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {row.mouse}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  No detailed activity history available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* SMALL HELPER */
const Stat = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500 dark:text-slate-400">
      {label}
    </p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default ScreenshotDetailsModal;
