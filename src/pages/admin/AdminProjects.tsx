import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, GripVertical, ExternalLink } from "lucide-react";
import { Reveal, SectionTag } from "@/components/ui";
import {
  subscribeToProjects,
  addProject,
  updateProject,
  deleteProject,
} from "@/lib/firestore-projects";
import type { Project, ProjectInput } from "@/lib/firestore-projects";

const EMPTY_FORM: ProjectInput = {
  image: "",
  title: "",
  desc: "",
  tags: [],
  links: [],
  year: "",
  color: "#22c3e6",
  order: 0,
};

const inputClass =
  "w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-aqua focus:bg-paper focus:ring-4 focus:ring-aqua/10";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectInput>(EMPTY_FORM);
  const [tagsText, setTagsText] = useState("");
  const [links, setLinks] = useState<{ label: string; href: string }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProjects((data) => {
      setProjects(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const openNewForm = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, order: projects.length });
    setTagsText("");
    setLinks([]);
    setShowForm(true);
  };

  const openEditForm = (p: Project) => {
    setEditingId(p.id);
    setForm(p);
    setTagsText(p.tags.join(", "));
    setLinks(p.links);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: ProjectInput = {
      ...form,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      links: links.filter((l) => l.label && l.href),
    };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await addProject(payload);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving this project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await deleteProject(id);
  };

  return (
    <div className="relative px-8 py-10 md:px-12 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal>
            <SectionTag label="Dashboard" color="#22c3e6" />
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-tight">
              Projects
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
            Add Project
          </button>
        </Reveal>
      </div>

      {/* List */}
      <div className="mt-10 space-y-4">
        {loading && (
          <p className="text-sm text-ink-soft">Loading projects...</p>
        )}
        {!loading && projects.length === 0 && (
          <div className="rounded-[1.75rem] border border-dashed border-line bg-paper/60 p-10 text-center text-sm text-ink-soft">
            No projects yet — click "Add Project" to create your first one.
          </div>
        )}
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-5 rounded-[1.5rem] border border-line bg-paper p-4 shadow-[0_10px_40px_rgba(11,11,20,0.04)]"
          >
            <GripVertical className="h-4 w-4 shrink-0 text-ink-soft/30" />
            <div
              className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist"
              style={{ boxShadow: `0 0 0 2px ${p.color}33` }}
            >
              {p.image && (
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-semibold tracking-tight">
                {p.title}
              </p>
              <p className="mt-0.5 truncate text-xs text-ink-soft">{p.desc}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-mist px-2.5 py-0.5 text-[10px] font-medium text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => openEditForm(p)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:bg-mist"
                aria-label="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-red-500 transition-colors hover:bg-red-50"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
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
                  {editingId ? "Edit Project" : "New Project"}
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
                  <label className="text-xs font-semibold text-ink-soft">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Itinera — AI-Powered Trip Planner"
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-soft">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    className={`${inputClass} mt-1.5 resize-none`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-soft">Image URL</label>
                  <input
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-ink-soft">Year</label>
                    <input
                      required
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      placeholder="2025 — 2026"
                      className={`${inputClass} mt-1.5`}
                    />
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
                    Tags (comma separated)
                  </label>
                  <input
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="Next.js, Convex, GPT-4"
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-ink-soft">
                      Links (optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => setLinks([...links, { label: "", href: "" }])}
                      className="flex items-center gap-1 text-xs font-semibold text-aqua"
                    >
                      <Plus className="h-3 w-3" /> Add link
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {links.map((link, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={link.label}
                          onChange={(e) => {
                            const next = [...links];
                            next[i] = { ...next[i], label: e.target.value };
                            setLinks(next);
                          }}
                          placeholder="Live Demo"
                          className={`${inputClass} w-2/5`}
                        />
                        <input
                          value={link.href}
                          onChange={(e) => {
                            const next = [...links];
                            next[i] = { ...next[i], href: e.target.value };
                            setLinks(next);
                          }}
                          placeholder="https://..."
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => setLinks(links.filter((_, idx) => idx !== i))}
                          className="grid h-[46px] w-10 shrink-0 place-items-center rounded-xl border border-line text-ink-soft transition-colors hover:bg-mist"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {links.length === 0 && (
                      <p className="flex items-center gap-1.5 text-xs text-ink-soft/70">
                        <ExternalLink className="h-3 w-3" /> No links added.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-aqua via-leaf to-coral px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Project"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}