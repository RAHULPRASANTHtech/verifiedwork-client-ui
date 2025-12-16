import { projects } from "../../data/mockData";

const Dashboard = () => {
  const total = projects.length;
  const pending = projects.filter(p => p.status === "Pending").length;
  const inProgress = projects.filter(p => p.status === "In Progress").length;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Projects" value={total} />
        <Card title="Pending" value={pending} />
        <Card title="In Progress" value={inProgress} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow">
    <p className="text-gray-500">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
