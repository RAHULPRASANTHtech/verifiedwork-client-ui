import { useEffect, useState } from "react";

/* MOCK DATA */
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
    status: "Pending",
    progress: 0,
    description: "UI design for a cross-platform mobile application.",
    budget: "₹30,000",
    deadline: "25 Dec 2025",
    priority: "High",
    freelancer: "Not Assigned",
    lastActive: "—",
    lastUpdate: "Created today",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState("");

  /* LOAD FROM LOCALSTORAGE */
  useEffect(() => {
    const storedProjects = localStorage.getItem("admin_projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(initialProjects);
      localStorage.setItem(
        "admin_projects",
        JSON.stringify(initialProjects)
      );
    }
  }, []);

  /* SAVE TO LOCALSTORAGE */
  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    localStorage.setItem(
      "admin_projects",
      JSON.stringify(updatedProjects)
    );
  };

  /* ASSIGN HANDLER */
  const handleAssign = () => {
    if (!selectedFreelancer || !selectedProject) return;

    const updatedProjects = projects.map((p) =>
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

    saveProjects(updatedProjects);

    setSelectedProject(
      updatedProjects.find((p) => p.id === selectedProject.id)
    );

    setShowAssignModal(false);
    setSelectedFreelancer("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Project Review</h1>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Progress</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className={`border-t ${
                  selectedProject?.id === project.id
                    ? "bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <td
                  className="p-3 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name}
                </td>

                <td
                  className="p-3 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.client}
                </td>

                <td
                  className="p-3 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                    {project.status}
                  </span>
                </td>

                <td
                  className="p-3 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </td>

                <td
                  className="p-3 text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => {
                    setSelectedProject(project);
                    setShowAssignModal(true);
                  }}
                >
                  Assign
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!selectedProject && (
        <div className="mt-6 text-center text-gray-500">
          Select a project to view admin insights
        </div>
      )}

      {selectedProject && (
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Project Summary</h2>
          <p className="text-sm text-gray-600 mb-3">
            {selectedProject.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Client</p>
              <p className="font-medium">{selectedProject.client}</p>
            </div>
            <div>
              <p className="text-gray-500">Budget</p>
              <p className="font-medium">{selectedProject.budget}</p>
            </div>
            <div>
              <p className="text-gray-500">Deadline</p>
              <p className="font-medium text-red-600">
                {selectedProject.deadline}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Assigned To</p>
              <p className="font-medium">{selectedProject.freelancer}</p>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Assign Project
            </h2>

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
                className="px-4 py-2 text-gray-600"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                disabled={!selectedFreelancer}
                onClick={handleAssign}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
