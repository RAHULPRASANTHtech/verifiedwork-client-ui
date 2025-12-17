import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ClientSidebar = () => {
  const [reportsOpen, setReportsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-slate-200 px-4 py-6">
      {/* ===== Title ===== */}
      <h1 className="text-xl font-semibold mb-8">Client Panel</h1>

      {/* ===== Navigation ===== */}
      <nav className="space-y-2">
        {/* Dashboard */}
        <NavItem label="Dashboard" active />

        {/* Reports */}
        <button
          onClick={() => setReportsOpen(!reportsOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-slate-800/60 transition"
        >
          <span>Reports</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              reportsOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {reportsOpen && (
          <div className="ml-4">
            <NavItem label="Tracking Report" />
          </div>
        )}

        {/* ===== Profile (UNDER REPORTS) ===== */}
        <div className="mt-4 pt-4 border-t border-slate-800 relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800/60 transition"
          >
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold">
              JD
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-slate-200">John Doe</p>
              <p className="text-xs text-slate-400">Client</p>
            </div>

            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="mt-2 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
              <ProfileItem label="View Profile" />
              <ProfileItem label="Settings" />
              <div className="border-t border-slate-700">
                <ProfileItem label="Logout" danger />
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

/* ===== Helpers ===== */

const NavItem = ({ label, active }) => (
  <div
    className={`px-3 py-2 rounded cursor-pointer transition ${
      active ? "bg-slate-800 text-white" : "hover:bg-slate-800/60"
    }`}
  >
    {label}
  </div>
);

const ProfileItem = ({ label, danger }) => (
  <div
    className={`px-4 py-2 text-sm cursor-pointer transition ${
      danger
        ? "text-red-400 hover:bg-red-500/10"
        : "text-slate-200 hover:bg-slate-800/60"
    }`}
  >
    {label}
  </div>
);

export default ClientSidebar;