import { Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminAbout from "@/pages/admin/AdminAbout";
import AdminContact from "@/pages/admin/AdminContact";
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
        <Route path="skills" element={<AdminSkills />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="contact" element={<AdminContact />} />
      </Route>
    </Routes>
  );
}