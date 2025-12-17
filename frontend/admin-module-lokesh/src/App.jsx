import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";

import Projects from "./pages/admin/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* REDIRECT ROOT */}
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="projects" element={<Projects />} />
        </Route>
      <Route path="/client" element={<ClientLayout />}>
      <Route path="dashboard" element={<ClientDashboard />} />
      </Route>
        {/* FALLBACK (VERY IMPORTANT) */}
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
      

    </BrowserRouter>
  );
}
