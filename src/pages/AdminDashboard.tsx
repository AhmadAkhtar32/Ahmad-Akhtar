import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-mist p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-ink-soft">Logged in as {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-line"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-paper p-8 text-sm text-ink-soft">
          Editing tools for Projects, Skills, and About content will appear here next.
        </div>
      </div>
    </div>
  );
}