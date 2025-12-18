import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 3 },
];

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-8">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-1">
        Welcome back, {user.role.toUpperCase()}
      </h1>
      <p className="text-gray-400 mb-8">
        Overview of your productivity & projects
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value="12" />
        <StatCard title="Active Projects" value="6" />
        <StatCard title="Completed" value="4" />
        <StatCard title="Avg Activity" value="82%" />
      </div>

      {/* CHART + ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART */}
        <div className="lg:col-span-2 bg-[#111A2E] p-6 rounded-lg">
          <h2 className="font-semibold mb-4">
            Weekly Productivity
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QUICK ACTION */}
        <div className="bg-[#111A2E] p-6 rounded-lg flex flex-col justify-between">
          <div>
            <h2 className="font-semibold mb-2">
              Quick Action
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Continue to your workspace
            </p>
          </div>

          {user.role === "admin" ? (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded"
            >
              Go to Admin Panel →
            </button>
          ) : (
            <button
              onClick={() => navigate("/client/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded"
            >
              Go to Client Panel →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111A2E] p-5 rounded-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
