import { Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminComingSoon from "@/pages/AdminComingSoon";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route
          path="skills"
          element={<AdminComingSoon title="Skills" color="#14b86a" />}
        />
        <Route
          path="about"
          element={<AdminComingSoon title="About" color="#ff6b4a" />}
        />
        <Route
          path="contact"
          element={<AdminComingSoon title="Contact" color="#e14dcb" />}
        />
      </Route>
    </Routes>
  );
}