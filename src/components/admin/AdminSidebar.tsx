import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  User,
  Mail,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/skills", label: "Skills", icon: Sparkles },
  { to: "/admin/about", label: "About", icon: User },
  { to: "/admin/contact", label: "Contact", icon: Mail },
];

export default function AdminSidebar() {
  const { user } = useAuth();

  const handleLogout = () => signOut(auth);

  return (
    <aside className="relative flex h-screen w-full max-w-[17rem] flex-col overflow-hidden bg-ink text-white">
      {/* ambient gradient auras, echoing Contact section */}
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-aqua/40 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-leaf/30 blur-[110px]"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative flex items-center gap-2.5 px-7 pt-8">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-aqua via-leaf to-coral font-display text-sm font-bold">
          A
        </span>
        <div>
          <p className="font-display text-sm font-semibold tracking-tight">
            Ahmad Akhtar
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="relative mt-10 flex-1 space-y-1.5 px-4">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {({ isActive }) => (
              <span className="relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-300">
                {isActive && (
                  <motion.span
                    layoutId="admin-active-pill"
                    className="absolute inset-0 rounded-xl bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <item.icon
                  className={`relative h-4.5 w-4.5 transition-colors duration-300 ${
                    isActive ? "text-aqua" : "text-white/50"
                  }`}
                />
                <span
                  className={`relative transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="relative border-t border-white/10 px-7 py-6">
        <p className="truncate text-xs font-medium text-white/50">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition-colors duration-300 hover:bg-white hover:text-ink"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}