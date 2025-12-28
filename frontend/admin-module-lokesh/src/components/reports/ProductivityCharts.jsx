import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ================= WEEKLY PRODUCTIVITY ================= */

export const WeeklyActivityChart = ({ data = [] }) => {
  return (
    <div className="
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      rounded-xl shadow-sm
      p-6 h-full flex flex-col
    ">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Weekly Productivity
        
      </h3>

      <div className="flex-1 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" unit="%" />
            <Tooltip />

            <Area
              yAxisId="left"
              type="monotone"
              dataKey="hours"
              stroke="#3B82F6"
              fill="url(#colorHours)"
              name="Hours"
            />

            <Area
              yAxisId="right"
              type="monotone"
              dataKey="activity"
              stroke="#10B981"
              fill="url(#colorActivity)"
              name="Activity %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ================= ACTIVE VS IDLE PIE ================= */

export const TaskDistributionChart = ({ activeMinutes = 0, idleMinutes = 0 }) => {
  const data = [
    { name: "Active", value: activeMinutes, color: "#10B981" },
    { name: "Idle", value: idleMinutes, color: "#EF4444" },
  ].filter(d => d.value > 0);

 if (!data || data.every(d => d.value === 0)) {

    return (
      <div className="
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-xl shadow-sm
        p-6 flex items-center justify-center
        text-slate-500
      ">
        No activity data
      </div>
    );
  }

  return (
    <div className="
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      rounded-xl shadow-sm
      p-6 h-full flex flex-col
    ">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Activity Breakdown
      </h3>

      <div className="flex-1 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
