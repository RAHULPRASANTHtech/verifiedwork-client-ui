import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";

const ProjectTable = ({ projects, onAssign }) => {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Project</th>
          <th>Client</th>
          <th>Status</th>
          <th>Progress</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {projects.map(project => (
          <tr key={project.id} className="border-t">
            <td className="p-3">{project.title}</td>
            <td>{project.client}</td>
            <td><StatusBadge status={project.status} /></td>
            <td><ProgressBar value={project.progress} /></td>
            <td>
              <button
                onClick={() => onAssign(project)}
                className="text-indigo-600"
              >
                Assign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
