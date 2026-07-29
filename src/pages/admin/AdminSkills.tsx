import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Reveal, SectionTag } from "@/components/ui";
import {
  subscribeToSkills,
  addStack,
  updateStack,
  deleteStack,
} from "@/lib/firestore-skills";
import type { Stack, StackInput } from "@/lib/firestore-skills";
import { ICON_MAP, ICON_OPTIONS } from "@/lib/icon-map";

const EMPTY_FORM: StackInput = {
  icon: "Code2",
  title: "",
  items: [],
  color: "#22c3e6",
  order: 0,
};

const inputClass =
  "w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-aqua focus:bg-paper focus:ring-4 focus:ring-aqua/10";

export default function AdminSkills() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StackInput>(EMPTY_FORM);
  const [itemsText, setItemsText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeToSkills((data) => {
      setStacks(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const openNewForm = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: stacks.length });
    setItemsText("");
    setShowForm(true);
  };

  const openEditForm = (s: Stack) => {
    setEditingId(s.id);
    setForm(s);
    setItemsText(s.items.join(", "));
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: StackInput = {
      ...form,
      items: itemsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editingId) {
        await updateStack(editingId, payload);
      } else {
        await addStack(payload);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving this stack.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill group? This can't be undone.")) return;
    await deleteStack(id);
  };

  return (
    <div className="relative px-8 py-10 md:px-12 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal>
            <SectionTag label="Dashboard" color="#14b86a" />
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-tight">
              Skills
            </h1>
            <p className="mt-2 text-[15px] text-ink-soft">
              Changes here go live on your portfolio instantly.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <button
            onClick={openNewForm}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Stack
          </button>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {loading && <p className="text-sm text-ink-soft">Loading skills...</p>}
        {!loading && stacks.length === 0 && (
          <div className="sm:col-span-2 rounded-[1.75rem] border border-dashed border-line bg-paper/60 p-10 text-center text-sm text-ink-soft">
            No skill groups yet — click "Add Stack" to create your first one.
          </div>
        )}
        {stacks.map((s) => {
          const Icon = ICON_MAP[s.icon] ?? ICON_MAP.Code2;
          return (
            <div
              key={s.id}
              className="flex items-start gap-4 rounded-[1.5rem] border border-line bg-paper p-5 shadow-[0_10px_40px_rgba(11,11,20,0.04)]"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow"
                style={{ background: s.color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-semibold tracking-tight">{s.title}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-mist px-2.5 py-0.5 text-[10px] font-medium text-ink-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEditForm(s)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:bg-mist"
                  aria-label="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-red-500 transition-colors hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] border border-line bg-paper p-7 shadow-2xl md:p-9"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {editingId ? "Edit Stack" : "New Stack"}
                </h2>
                <button
                  onClick={closeForm}
                  className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-mist"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink-soft">Stack title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Frontend"
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-ink-soft">Icon</label>
                    <select
                      value={form.icon}
                      onChange={(e) => setForm({ ...form, icon: e.target.value })}
                      className={`${inputClass} mt-1.5`}
                    >
                      {ICON_OPTIONS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-ink-soft">Accent color</label>
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="mt-1.5 h-[46px] w-full cursor-pointer rounded-xl border border-line bg-mist px-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-soft">
                    Items (comma separated)
                  </label>
                  <input
                    value={itemsText}
                    onChange={(e) => setItemsText(e.target.value)}
                    placeholder="React.js, Next.js, Tailwind CSS"
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-aqua via-leaf to-coral px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Stack"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}