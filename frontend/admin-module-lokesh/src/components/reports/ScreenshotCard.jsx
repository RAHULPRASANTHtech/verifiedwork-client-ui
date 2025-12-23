const ScreenshotCard = ({ shot, onClick }) => {
  const lowActivity = shot.activity < 60;

  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer overflow-hidden rounded-lg
        border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-900
        hover:ring-2 hover:ring-blue-500
        transition
      "
    >
      {/* Screenshot */}
      <img
        src={shot.imageUrl || shot.img}
        alt="Screenshot"
        className="w-full h-40 object-cover"
      />

      {/* Info */}
      <div className="p-3 text-sm space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-700 dark:text-slate-200">
            {shot.capturedAt || shot.time}
          </span>

          <span
            className={`px-2 py-0.5 rounded text-xs ${
              lowActivity
                ? "bg-red-500/20 text-red-500"
                : "bg-green-500/20 text-green-500"
            }`}
          >
            {shot.activity}%
          </span>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {shot.app?.name || shot.app}
        </div>
      </div>
    </div>
  );
};

export default ScreenshotCard;
