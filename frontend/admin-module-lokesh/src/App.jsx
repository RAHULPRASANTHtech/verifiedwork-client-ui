import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// HOME
import Home from "./pages/home/Home";

// LAYOUTS
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import Projects from "./pages/admin/Projects";

// CLIENT PAGES
import Dashboard from "./pages/client/Dashboard";
import TrackingReport from "./pages/client/TrackingReport";
import MonthlyReport from "./pages/client/MonthlyReport";
import Reports from "./pages/client/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}
        <Route path="/" element={<Navigate to="/client/dashboard" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        {/* CLIENT ROUTES */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports/tracking" element={<TrackingReport />} />
          <Route path="reports/monthly" element={<MonthlyReport />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* FALLBACKS */}
        <Route path="/client/*" element={<Navigate to="/client/dashboard" />} />
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
        <Route path="*" element={<Navigate to="/client/dashboard" />} />
      </Routes>
      
    </BrowserRouter>
  );
}