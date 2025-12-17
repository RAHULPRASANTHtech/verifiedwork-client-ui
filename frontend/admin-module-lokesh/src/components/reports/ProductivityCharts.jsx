import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Weekly Activity & Hours Chart
export const WeeklyActivityChart = ({ data }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg shadow-black/20 h-96">

      <h3 className="text-lg font-semibold text-white mb-4">
Weekly Productivity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
<YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
<YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} unit="%" />

          <Tooltip
  contentStyle={{
    backgroundColor: '#0F172A',
    borderRadius: '8px',
    border: '1px solid #334155',
    color: '#E5E7EB',
  }}
  labelStyle={{ color: '#CBD5E1' }}
/>

          <Area 
            yAxisId="left" 
            type="monotone" 
            dataKey="hours" 
            stroke="#3B82F6" 
            fillOpacity={1} 
            fill="url(#colorHours)" 
            name="Hours Worked"
          />
          <Area 
            yAxisId="right" 
            type="monotone" 
            dataKey="activity" 
            stroke="#10B981" 
            fillOpacity={1} 
            fill="url(#colorActivity)" 
            name="Activity %"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Task Distribution Chart
export const TaskDistributionChart = ({ data }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg shadow-black/20 h-96">

      <h3 className="text-lg font-semibold text-slate-200 mb-4">
  Task Breakdown
</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
  verticalAlign="bottom"
  height={36}
  iconType="circle"
  wrapperStyle={{ color: '#CBD5E1' }}
/>


        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};