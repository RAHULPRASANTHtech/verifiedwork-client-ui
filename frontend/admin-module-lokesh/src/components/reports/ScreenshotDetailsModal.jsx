const ScreenshotDetailsModal = ({ shot, onClose }) => {
  if (!shot) return null;

  const hasActivityHistory =
    Array.isArray(shot.activityHistory) &&
    shot.activityHistory.length > 0;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white text-gray-900 w-full max-w-3xl rounded-lg p-6 relative overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Screenshot Details
        </h2>

        {/* IMAGE */}
        <img
          src={shot.imageUrl || shot.img}
          alt="Screenshot"
          className="w-full rounded mb-4"
        />

        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <strong>Time Logged:</strong>{" "}
            {shot.capturedAt || shot.time || "—"}
          </div>

          <div>
            <strong>Activity:</strong> {shot.activity}%
          </div>

          {shot.duration && (
            <div>
              <strong>Duration:</strong> {shot.duration}
            </div>
          )}

          {shot.task && (
            <div>
              <strong>Task:</strong> {shot.task}
            </div>
          )}

          {shot.sessionId && (
            <div>
              <strong>Session:</strong> {shot.sessionId}
            </div>
          )}

          {shot.url && (
            <div className="col-span-2 truncate">
              <strong>URL:</strong> {shot.url}
            </div>
          )}
        </div>

        {/* ACTIVITY HISTORY (OPTIONAL) */}
        {hasActivityHistory ? (
          <>
            <h3 className="font-semibold mb-2">
              Activity History
            </h3>

            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Application</th>
                  <th className="border px-2 py-1">Keys</th>
                  <th className="border px-2 py-1">Mouse</th>
                </tr>
              </thead>
              <tbody>
                {shot.activityHistory.map((row, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">
                      {row.time}
                    </td>
                    <td className="border px-2 py-1">
                      {row.app}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {row.keyboard}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {row.mouse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            No detailed activity history available for this screenshot.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScreenshotDetailsModal;
