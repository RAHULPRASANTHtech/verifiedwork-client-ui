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

  // 🔥 Theme state (reads from Admin/Login)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    // Auth check
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }

    // Apply theme
    document.documentElement.className = theme;

    // Listen for theme changes
    const handleThemeChange = () => {
      const newTheme = localStorage.getItem("theme") || "dark";
      setTheme(newTheme);
      document.documentElement.className = newTheme;
    };

    window.addEventListener("storage", handleThemeChange);
    return () =>
      window.removeEventListener("storage", handleThemeChange);
  }, [navigate, theme]);

  if (!user) return null;

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#0B1220] text-white"
          : "bg-[#F8FAFC] text-black"
      }`}
    >
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-1">
        Welcome back, {user.role.toUpperCase()}
      </h1>
      <p
        className={`mb-8 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Overview of your productivity & projects
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value="12" theme={theme} />
        <StatCard title="Active Projects" value="6" theme={theme} />
        <StatCard title="Completed" value="4" theme={theme} />
        <StatCard title="Avg Activity" value="82%" theme={theme} />
      </div>

      {/* CHART + ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART */}
        <div
          className={`lg:col-span-2 p-6 rounded-lg
          ${
            theme === "dark"
              ? "bg-[#111A2E]"
              : "bg-white shadow"
          }`}
        >
          <h2 className="font-semibold mb-4">
            Weekly Productivity
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
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
        <div
          className={`p-6 rounded-lg flex flex-col justify-between
          ${
            theme === "dark"
              ? "bg-[#111A2E]"
              : "bg-white shadow"
          }`}
        >
          <div>
            <h2 className="font-semibold mb-2">
              Quick Action
            </h2>
            <p
              className={`text-sm mb-6 ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Continue to your workspace
            </p>
          </div>

          {user.role === "admin" ? (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded text-white"
            >
              Go to Admin Panel →
            </button>
          ) : (
            <button
              onClick={() => navigate("/client/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded text-white"
            >
              Go to Client Panel →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, theme }) {
  return (
    <div
      className={`p-5 rounded-lg
      ${
        theme === "dark"
          ? "bg-[#111A2E] text-white"
          : "bg-white text-black shadow"
      }`}
    >
      <p
        className={`text-sm ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        {title}
      </p>
      <h2 className="text-3xl font-bold mt-1">
        {value}
      </h2>
    </div>
  );
}
