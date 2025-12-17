import { Outlet } from "react-router-dom";
import ClientSidebar from "../components/reports/ClientSidebar";

const ClientLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
