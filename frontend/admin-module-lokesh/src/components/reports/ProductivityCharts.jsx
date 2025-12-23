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

export const WeeklyActivityChart = ({ data }) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-xl
        shadow-sm dark:shadow-black/20
        p-6
        h-full
        flex flex-col
      "
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Weekly Productivity
      </h3>

      {/* Chart container */}
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

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#CBD5E1"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
            />

            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B" }}
              unit="%"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderRadius: "8px",
                border: "1px solid #334155",
                color: "#E5E7EB",
              }}
              labelStyle={{ color: "#CBD5E1" }}
            />

            <Area
              yAxisId="left"
              type="monotone"
              dataKey="hours"
              stroke="#3B82F6"
              fill="url(#colorHours)"
              name="Hours Worked"
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

/* ================= TASK BREAKDOWN ================= */

export const TaskDistributionChart = ({ data }) => {
  return (
    <div
      className="
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-xl
        shadow-sm dark:shadow-black/20
        p-6
        h-full
        flex flex-col
      "
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Task Breakdown
      </h3>

      {/* Chart */}
      <div className="flex-1 min-h-[260px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
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

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ color: "#64748B", fontSize: "14px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
