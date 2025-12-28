import { Outlet } from "react-router-dom";
import ClientSidebar from "../components/reports/ClientSidebar";
import { useTheme } from "../context/ThemeContext";

const ClientLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="
        flex min-h-screen
        bg-slate-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-200
        transition-colors
      "
    >
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-end px-8 py-4">
          <button
            onClick={toggleTheme}
            className="
              px-3 py-1 rounded text-sm
              bg-gray-200 dark:bg-slate-800
              text-gray-800 dark:text-slate-200
              border border-gray-300 dark:border-slate-700
              transition
            "
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-8 pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
