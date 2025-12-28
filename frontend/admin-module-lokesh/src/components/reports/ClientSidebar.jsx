import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProfileDropdown from "../../pages/client/ProfileDropdown";

const ClientSidebar = () => {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(
    location.pathname.includes("/client/reports")
  );

  return (
    <aside
      className="
        w-64 min-h-screen
        bg-white dark:bg-slate-950
        text-slate-900 dark:text-slate-200
        border-r border-slate-200 dark:border-slate-800
        px-4 py-6 flex flex-col
        transition-colors
      "
    >
      {/* Title */}
      <h1 className="text-xl font-semibold mb-8">
        Client Panel
      </h1>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <NavItem to="/client/dashboard" label="Dashboard" />

        {/* Reports Dropdown */}
        <div>
          <button
            onClick={() => setReportsOpen(!reportsOpen)}
            className="
              w-full flex items-center justify-between
              px-3 py-2 rounded
              text-slate-700 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-800/60
              transition
            "
          >
            <span>Reports</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                reportsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {reportsOpen && (
            <div className="ml-3 mt-2 space-y-1">
              <NavItem
                to="/client/reports/tracking"
                label="Tracking Report"
                small
              />

              <NavItem
                to="/client/reports/monthly"
                label="Monthly Report"
                small
                end
              />


            </div>
          )}
        </div>
      </nav>

      {/* Profile */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-auto">
        <ProfileDropdown />
      </div>
    </aside>
  );
};

const NavItem = ({ to, label, small, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `
        block px-3 py-2 rounded transition
        ${small ? "text-sm" : ""}
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
        }
      `
    }
  >
    {label}
  </NavLink>
);

export default ClientSidebar;
