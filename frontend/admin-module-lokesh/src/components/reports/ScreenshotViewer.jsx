import React, { useState } from "react";
import { Monitor, Clock, MousePointer } from "lucide-react";

// App logos
import vscodeLogo from "../../assets/app-logos/vscode.svg";
import stackoverflowLogo from "../../assets/app-logos/stackoverflow.svg";
import slackLogo from "../../assets/app-logos/slack.svg";
import terminalLogo from "../../assets/app-logos/terminal.svg";
import figmaLogo from "../../assets/app-logos/figma.svg";
import idleLogo from "../../assets/app-logos/idle.svg";

// Logo map
const APP_LOGO_MAP = {
  vscode: vscodeLogo,
  stackoverflow: stackoverflowLogo,
  slack: slackLogo,
  terminal: terminalLogo,
  figma: figmaLogo,
  idle: idleLogo,
};

const ScreenshotViewer = ({ screenshots }) => {
  const [selectedShot, setSelectedShot] = useState(null);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg shadow-black/20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          Screenshot Timeline
        </h3>
        <span className="text-sm text-slate-400">Captured at intervals</span>
      </div>

      {/* Screenshot Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {screenshots.map((shot) => (
          <div
            key={shot.id}
            className="group cursor-pointer"
            onClick={() => setSelectedShot(shot)}
          >
            {/* Screenshot Card */}
            <div className="relative overflow-hidden rounded-lg border border-slate-600 bg-slate-700">

  {/* App Logo Overlay */}
  {APP_LOGO_MAP[shot.app] && (
    <div
      className="
        absolute top-2 left-2 z-20
        w-8 h-8
        flex items-center justify-center
        bg-slate-900/80
        rounded-md
      "
    >
      <img
        src={APP_LOGO_MAP[shot.app]}
        alt={shot.app}
        className="w-5 h-5 object-contain filter invert"
      />
    </div>
  )}

  {/* Activity Badge */}
  <div
    className={`absolute top-2 right-2 z-20 px-1.5 py-0.5 text-xs rounded font-medium ${
      parseInt(shot.activity) > 50
        ? "bg-green-500/20 text-green-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {shot.activity}
  </div>

  {/* Screenshot */}
  <img
    src={shot.img}
    alt={`Screenshot ${shot.time}`}
    className="w-full h-28 object-cover"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
</div>



            {/* Time */}
            <div className="mt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              {shot.time}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedShot && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedShot(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">
                  {selectedShot.app.toUpperCase()}
                </h4>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedShot.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MousePointer className="w-4 h-4" />
                    Activity: {selectedShot.activity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedShot(null)}
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Screenshot */}
            <img
              src={selectedShot.img}
              alt="Screenshot preview"
              className="w-full rounded-lg border border-slate-200 bg-slate-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotViewer;