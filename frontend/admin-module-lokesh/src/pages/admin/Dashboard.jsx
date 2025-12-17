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

  const totalProjects = projects.length;
  const pending = projects.filter(p => p.status === "Pending").length;
  const inProgress = projects.filter(p => p.status === "In Progress").length;
  const unassigned = projects.filter(p => p.freelancer === "Not Assigned").length;

  const recentActivity = projects
    .filter(p => p.lastUpdate)
    .slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard title="Total Projects" value={totalProjects} />
        <DashboardCard title="Pending Projects" value={pending} />
        <DashboardCard title="In Progress" value={inProgress} />
        <DashboardCard title="Unassigned" value={unassigned} highlight />
      </div>

      {/* ACTION REQUIRED */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold mb-4">Action Required</h2>

        {unassigned === 0 ? (
          <p className="text-sm text-gray-500">
            No immediate admin actions required.
          </p>
        ) : (
          <div className="space-y-2 text-sm">
            <p className="text-red-600 font-medium">
              {unassigned} project(s) need assignment
            </p>
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => navigate("/projects")}
            >
              Review & Assign Projects →
            </button>
          </div>
        )}
      </div>

      {/* RECENT ACTIVITY + QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="font-semibold mb-4">Recent Admin Activity</h2>

          {recentActivity.length === 0 ? (
            <p className="text-sm text-gray-500">
              No recent activity yet.
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {recentActivity.map(project => (
                <li key={project.id} className="flex justify-between">
                  <span>{project.name}</span>
                  <span className="text-gray-500">
                    {project.lastUpdate}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-col gap-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() => navigate("/projects")}
            >
              Review Projects
            </button>

            <button
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              onClick={() => navigate("/projects")}
            >
              Assign Freelancers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE CARD */
function DashboardCard({ title, value, highlight }) {
  return (
    <div
      className={`rounded-lg p-5 shadow bg-white ${
        highlight ? "border border-red-300" : ""
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-3xl font-bold mt-1 ${
          highlight ? "text-red-600" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}
