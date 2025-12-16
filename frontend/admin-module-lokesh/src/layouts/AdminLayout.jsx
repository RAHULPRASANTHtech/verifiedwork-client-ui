import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-600 text-white p-6">
        <h1 className="text-xl font-bold mb-8">
          Admin Panel
        </h1>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:underline">
            Dashboard
          </Link>
          <Link to="/admin/projects" className="block hover:underline">
            Projects
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
