import { useState, useEffect } from "react";
import KPICard from "../common/KPICard";

import ActivityStats from "./ActivityStats";
import TimeGrid from "./TimeGrid";
import ScreenshotDetailsModal from "./ScreenshotDetailsModal";
const generateDaySlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 10) {
      const start = min.toString().padStart(2, "0");
      const end = (min + 10).toString().padStart(2, "0");
      slots.push({
        hour,
        slot: `${start}-${end}`,
        activity: 0,
        inactive: true,
        app: null,
      });
    }
  }
  return slots;
};

export default function DailyTracking({
  showInactive,
  timezone,
  selectedDate,
}) {
  const [selectedShot, setSelectedShot] = useState(null);
const [screenshots, setScreenshots] = useState([]);
const [loading, setLoading] = useState(false);
useEffect(() => {
  const fetchDailyEntries = async () => {
    try {
      setLoading(true);

      const dateStr = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD

      const res = await fetch(
        `http://localhost:5000/api/time-entries?date=${dateStr}&user_id=1`
      );

      const data = await res.json();

      // TEMP: directly store raw entries
      // (we’ll transform into grid in next step)
      const baseSlots = generateDaySlots();

const filledSlots = baseSlots.map((slot) => {
  const match = data.find((e) => {
  const [h, m] = e.start_time.split(":").map(Number);
  const [slotStart, slotEnd] = slot.slot.split("-").map(Number);

  return (
    h === slot.hour &&
    m >= slotStart &&
    m < slotEnd
  );
});


  return match
  ? {
      ...slot,
      activity: match.activity_percent,
      inactive: match.activity_percent === 0,
      app: match.screenshots?.[0]?.app || "Work Activity",
      images: match.screenshots || [],
    }
  : {
      ...slot,
      images: [],
    };

});

// 🔥 Trim timeline to active window (Worksnaps-style)
const activeIndexes = filledSlots
  .map((s, i) => (s.activity > 0 ? i : -1))
  .filter(i => i !== -1);


let visibleSlots = filledSlots;

if (activeIndexes.length > 0) {
  const start = Math.max(activeIndexes[0] - 6, 0); // 1 hour before
  const end = Math.min(activeIndexes.at(-1) + 6, filledSlots.length); // 1 hour after
  visibleSlots = filledSlots.slice(start, end);
}

setScreenshots(visibleSlots);



    } catch (err) {
      console.error("Failed to fetch time entries", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDailyEntries();
}, [selectedDate]);
function transformEntriesToGrid(entries) {
  return entries.map((entry) => {
    const [hour, minute] = entry.start_time.split(":").map(Number);
    const slotStart = minute.toString().padStart(2, "0");
    const slotEnd = ((minute + 10)%60).toString().padStart(2, "0");

    return {
      hour,
      slot: `${slotStart}-${slotEnd}`,
      activity: entry.activity_percent || 0,
      inactive: entry.activity_percent === 0,
      app: "Work Activity", // temp (from screenshots later)
      images: [], // screenshots come later
    };
  });
}

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
      <ActivityStats date={selectedDate} />


      {/* TIME GRID */}
      {loading ? (
  <p className="text-sm text-slate-500">Loading activity...</p>
) : (
  <TimeGrid
    screenshots={screenshots}
    showInactive={showInactive}
    onSelectShot={setSelectedShot}
  />
)}


      {/* MODAL */}
      <ScreenshotDetailsModal
        shot={selectedShot}
        onClose={() => setSelectedShot(null)}
      />
    </div>
  );
}
