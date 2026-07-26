import { Outlet } from "react-router-dom";
import Cursor from "@/components/Cursor";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-mist font-body text-ink">
      <Cursor />
      <AdminSidebar />
      <div className="relative flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}