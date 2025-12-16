import { useEffect, useState } from "react";
import ProjectTable from "../../components/ProjectTable";
import AssignModal from "../../components/AssignModal";
import { getAllProjects, assignProject } from "../../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  const handleAssign = (freelancer) => {
    assignProject(selectedProject.id, freelancer).then(() => {
      setProjects(prev =>
        prev.map(p =>
          p.id === selectedProject.id
            ? { ...p, assignedTo: freelancer, status: "In Progress" }
            : p
        )
      );
      setSelectedProject(null);
    });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">
        Project Review
      </h2>

      <ProjectTable
        projects={projects}
        onAssign={setSelectedProject}
      />

      {selectedProject && (
        <AssignModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onAssign={handleAssign}
        />
      )}
    </>
  );
};

export default Projects;
