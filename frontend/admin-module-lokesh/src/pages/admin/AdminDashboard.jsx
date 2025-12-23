import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("admin_projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  const total = projects.length;
  const pending = projects.filter(p => p.status === "Pending").length;
  const inProgress = projects.filter(p => p.status === "In Progress").length;
  const unassigned = projects.filter(p => p.freelancer === "Not Assigned").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Admin Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Projects" value={total} />
        <Card title="Pending Projects" value={pending} />
        <Card title="In Progress" value={inProgress} />
        <Card title="Unassigned" value={unassigned} highlight />
      </div>

      {/* ACTION REQUIRED */}
      <div
        className="
          bg-white dark:bg-darkCard
          border dark:border-darkBorder
          rounded-lg p-5
        "
      >
        <h2 className="font-semibold mb-2">
          Action Required
        </h2>

        {unassigned > 0 ? (
          <button
            onClick={() => navigate('/admin/projects')}
            className="
              text-indigo-600 dark:text-accentBlue
              hover:underline
            "
          >
            {unassigned} project(s) need assignment →
          </button>
        ) : (
          <p className="text-sm text-gray-500 dark:text-darkMuted">
            No immediate admin actions.
          </p>
        )}
      </div>

      {/* RECENT ACTIVITY */}
      <div
        className="
          bg-white dark:bg-darkCard
          border dark:border-darkBorder
          rounded-lg p-5
        "
      >
        <h2 className="font-semibold mb-3">
          Recent Admin Activity
        </h2>

        {projects.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-darkMuted">
            No recent activity yet.
          </p>
        ) : (
          <ul className="text-sm space-y-2">
            {projects.slice(0, 4).map(p => (
              <li
                key={p.id}
                className="flex justify-between"
              >
                <span>{p.name}</span>
                <span className="text-gray-500 dark:text-darkMuted">
                  {p.lastUpdate}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div
        className="
          bg-white dark:bg-darkCard
          border dark:border-darkBorder
          rounded-lg p-5
        "
      >
        <h2 className="font-semibold mb-3">
          Quick Actions
        </h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/admin/projects")}
            className="
              px-4 py-2 rounded
              bg-indigo-600 text-white
              hover:bg-indigo-700
              transition
            "
          >
            Review Projects
          </button>

          <button
            onClick={() => navigate("/admin/projects")}
            className="
              px-4 py-2 rounded
              bg-gray-100 dark:bg-[#1E293B]
              text-gray-800 dark:text-darkText
              hover:bg-gray-200 dark:hover:bg-[#334155]
              transition
            "
          >
            Assign Freelancers
          </button>
        </div>
      </div>
    </div>
  );
}

/* KPI CARD */
function Card({ title, value, highlight }) {
  return (
    <div
      className="
        bg-white dark:bg-darkCard
        border dark:border-darkBorder
        rounded-lg p-5
        transition
      "
    >
      <p className="text-sm text-gray-500 dark:text-darkMuted">
        {title}
      </p>
      <h2
        className={`text-3xl font-bold ${
          highlight
            ? "text-red-600 dark:text-red-400"
            : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}
