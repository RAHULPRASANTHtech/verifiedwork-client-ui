import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Projects from "./pages/admin/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* REDIRECT ROOT */}
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        {/* FALLBACK (VERY IMPORTANT) */}
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
