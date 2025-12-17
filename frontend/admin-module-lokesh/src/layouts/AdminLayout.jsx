import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [isDark, setIsDark] = useState(false);

  /* LOAD SAVED THEME */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  /* TOGGLE THEME */
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");

    const enabled = root.classList.contains("dark");
    setIsDark(enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-darkBg transition-colors">
      {/* SIDEBAR */}
      <aside className="w-64 bg-indigo-600 dark:bg-[#0F172A] text-white p-6">
        <h1 className="text-xl font-bold mb-8">
          Admin Panel
        </h1>

        <nav className="space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block transition hover:opacity-80 ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `block transition hover:opacity-80 ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            Projects
          </NavLink>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="flex justify-end p-4">
          <button
            onClick={toggleTheme}
            className="
              px-3 py-1 rounded text-sm
              bg-gray-200 dark:bg-darkCard
              text-gray-800 dark:text-darkText
              transition
            "
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 text-gray-800 dark:text-darkText">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
