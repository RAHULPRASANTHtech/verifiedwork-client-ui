import { freelancers } from "../data/mockData";

const AssignModal = ({ project, onClose, onAssign }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-80">
        <h3 className="font-semibold mb-4">
          Assign: {project.title}
        </h3>

        {freelancers.map(f => (
          <button
            key={f.id}
            onClick={() => onAssign(f.name)}
            className="block w-full text-left p-2 hover:bg-gray-100"
          >
            {f.name}
          </button>
        ))}

        <button
          onClick={onClose}
          className="mt-4 text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignModal;
