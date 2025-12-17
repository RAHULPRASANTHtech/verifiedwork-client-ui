import { useEffect, useState } from "react";

/* ---------------- MOCK DATA ---------------- */
const freelancers = [
  "John Freelancer",
  "Anita Designer",
  "Rahul Developer",
  "Sneha Tester",
];

const initialProjects = [
  {
    id: 1,
    name: "Portfolio Website",
    client: "Client A",
    status: "Pending",
    progress: 0,
    description: "Personal portfolio website for showcasing projects.",
    budget: "₹15,000",
    deadline: "20 Dec 2025",
    priority: "Medium",
    freelancer: "Not Assigned",
    lastActive: "—",
    lastUpdate: "Created 2 days ago",
  },
  {
    id: 2,
    name: "Mobile App UI",
    client: "Client B",
    status: "In Progress",
    progress: 45,
    description: "UI design for a cross-platform mobile application.",
    budget: "₹30,000",
    deadline: "25 Dec 2025",
    priority: "High",
    freelancer: "John Freelancer",
    lastActive: "10:17 AM, 16 Dec 2025",
    lastUpdate: "Updated 2 hours ago",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState("");
  const [filter, setFilter] = useState("All");

  /* ---------------- LOAD / SAVE ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("admin_projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(initialProjects);
      localStorage.setItem(
        "admin_projects",
        JSON.stringify(initialProjects)
      );
    }
  }, []);

  const saveProjects = (updated) => {
    setProjects(updated);
    localStorage.setItem("admin_projects", JSON.stringify(updated));
  };

  /* ---------------- ASSIGN ---------------- */
  const handleAssign = () => {
    if (!selectedFreelancer || !selectedProject) return;

    const updated = projects.map((p) =>
      p.id === selectedProject.id
        ? {
            ...p,
            freelancer: selectedFreelancer,
            status: "In Progress",
            progress: 10,
            lastUpdate: "Assigned just now",
            lastActive: "Waiting for freelancer",
          }
        : p
    );

    saveProjects(updated);
    setSelectedProject(
      updated.find((p) => p.id === selectedProject.id)
    );
    setShowAssignModal(false);
    setSelectedFreelancer("");
  };

  /* ---------------- FILTER ---------------- */
  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Unassigned") return p.freelancer === "Not Assigned";
    return p.status === filter;
  });

  const statusBadge = (status) =>
    status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  const priorityBadge = (priority) =>
    priority === "High"
      ? "bg-red-100 text-red-700"
      : priority === "Medium"
      ? "bg-orange-100 text-orange-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Project Review</h1>

      {/* FILTERS */}
      <div className="flex gap-3 text-sm">
        {["All", "Pending", "In Progress", "Unassigned"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded transition ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p) => (
              <tr
                key={p.id}
                className={`border-t transition-colors duration-200 ${
                  selectedProject?.id === p.id
                    ? "bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <td
                  className="p-3 cursor-pointer"
                  onClick={() => setSelectedProject(p)}
                >
                  {p.name}
                </td>
                <td
                  className="p-3 cursor-pointer"
                  onClick={() => setSelectedProject(p)}
                >
                  {p.client}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${statusBadge(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${priorityBadge(
                      p.priority
                    )}`}
                  >
                    {p.priority}
                  </span>
                </td>
                <td
                  className="p-3 text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => {
                    setSelectedProject(p);
                    setShowAssignModal(true);
                  }}
                >
                  {p.freelancer === "Not Assigned"
                    ? "Assign"
                    : "Reassign"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {!selectedProject && (
        <p className="text-center text-gray-500">
          Select a project to view admin insights
        </p>
      )}

      {/* SELECTED PROJECT (FADE IN) */}
      {selectedProject && (
        <div className="bg-white rounded-lg shadow p-4 animate-fadeIn">
          <h2 className="font-semibold text-lg mb-1">
            Selected Project: {selectedProject.name}
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Status: {selectedProject.status} | Assigned to{" "}
            {selectedProject.freelancer}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Info label="Client" value={selectedProject.client} />
            <Info label="Budget" value={selectedProject.budget} />
            <Info label="Deadline" value={selectedProject.deadline} />
            <Info label="Priority" value={selectedProject.priority} />
          </div>
        </div>
      )}

      {/* ASSIGN MODAL (SCALE IN) */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md animate-modalIn">
            <h2 className="font-semibold mb-4">Assign Freelancer</h2>

            <select
              className="w-full border rounded p-2 mb-4"
              value={selectedFreelancer}
              onChange={(e) => setSelectedFreelancer(e.target.value)}
            >
              <option value="">Select Freelancer</option>
              {freelancers.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={!selectedFreelancer}
                onClick={handleAssign}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modalIn {
          animation: modalIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
