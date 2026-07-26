import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-mist font-body text-ink">
      <AdminSidebar />
      <div className="relative flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}