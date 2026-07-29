import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Plus, X, ImagePlus, Loader2, Save } from "lucide-react";
import { Reveal, SectionTag } from "@/components/ui";
import { subscribeToAbout, saveAbout, DEFAULT_ABOUT } from "@/lib/firestore-about";
import type { AboutContent, AboutStat } from "@/lib/firestore-about";
import { ICON_MAP, ICON_OPTIONS } from "@/lib/icon-map";
import { uploadImage } from "@/lib/storage";

const inputClass =
  "w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-aqua focus:bg-paper focus:ring-4 focus:ring-aqua/10";

export default function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<AboutContent>(DEFAULT_ABOUT);
  const [rolesText, setRolesText] = useState("");
  const [courseworkText, setCourseworkText] = useState("");
  const [certsText, setCertsText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeToAbout((data) => {
      setForm(data);
      setRolesText(data.roles.join(", "));
      setCourseworkText(data.coursework.join(", "));
      setCertsText(data.certifications.join(", "));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, portrait: url }));
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const updateStat = (i: number, patch: Partial<AboutStat>) => {
    const next = [...form.stats];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, stats: next });
  };

  const addStat = () => {
    setForm({
      ...form,
      stats: [
        ...form.stats,
        { icon: "Code2", value: 0, suffix: "", decimals: 0, label: "", color: "#22c3e6" },
      ],
    });
  };

  const removeStat = (i: number) => {
    setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: AboutContent = {
      ...form,
      roles: rolesText.split(",").map((t) => t.trim()).filter(Boolean),
      coursework: courseworkText.split(",").map((t) => t.trim()).filter(Boolean),
      certifications: certsText.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      await saveAbout(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving About content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="px-8 py-10 text-sm text-ink-soft md:px-12 md:py-14">Loading...</div>
    );
  }

  return (
    <div className="relative px-8 py-10 md:px-12 md:py-14">
      <Reveal>
        <SectionTag label="Dashboard" color="#ff6b4a" />
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-tight">
          About
        </h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Changes here go live on your portfolio instantly.
        </p>
      </Reveal>

      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-10">
        {/* Portrait */}
        <section className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight">Portrait</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-line bg-mist transition-colors hover:border-aqua"
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-ink-soft" />
            ) : form.portrait ? (
              <img src={form.portrait} alt="Portrait" className="h-full w-full object-cover" />
            ) : (
              <ImagePlus className="h-5 w-5 text-ink-soft" />
            )}
          </button>
        </section>

        {/* Intro & bio */}
        <section className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight">Intro & Bio</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink-soft">
                Animated intro paragraph
              </label>
              <textarea
                required
                rows={3}
                value={form.paragraph}
                onChange={(e) => setForm({ ...form, paragraph: e.target.value })}
                className={`${inputClass} mt-1.5 resize-none`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-soft">Bio card text</label>
              <textarea
                required
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className={`${inputClass} mt-1.5 resize-none`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-soft">Location</label>
              <input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Lahore, Pakistan"
                className={`${inputClass} mt-1.5`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-soft">
                Role badges (comma separated)
              </label>
              <input
                value={rolesText}
                onChange={(e) => setRolesText(e.target.value)}
                placeholder="Graduated, Software Engineer, AI/ML Enthusiast"
                className={`${inputClass} mt-1.5`}
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold tracking-tight">Stat cards</h2>
            <button
              type="button"
              onClick={addStat}
              className="flex items-center gap-1 text-xs font-semibold text-aqua"
            >
              <Plus className="h-3 w-3" /> Add stat
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {form.stats.map((stat, i) => (
              <div key={i} className="rounded-xl border border-line bg-mist p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-soft">Stat {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeStat(i)}
                    className="grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <select
                    value={stat.icon}
                    onChange={(e) => updateStat(i, { icon: e.target.value })}
                    className={`${inputClass} bg-paper`}
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="color"
                    value={stat.color}
                    onChange={(e) => updateStat(i, { color: e.target.value })}
                    className="h-[46px] w-full cursor-pointer rounded-xl border border-line bg-paper px-2"
                  />
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) => updateStat(i, { value: Number(e.target.value) })}
                    placeholder="Value (e.g. 5)"
                    className={`${inputClass} bg-paper`}
                  />
                  <input
                    value={stat.suffix}
                    onChange={(e) => updateStat(i, { suffix: e.target.value })}
                    placeholder="Suffix (e.g. +)"
                    className={`${inputClass} bg-paper`}
                  />
                  <input
                    value={stat.label}
                    onChange={(e) => updateStat(i, { label: e.target.value })}
                    placeholder="Label (e.g. Projects Built)"
                    className={`${inputClass} col-span-2 bg-paper`}
                  />
                </div>
              </div>
            ))}
            {form.stats.length === 0 && (
              <p className="text-xs text-ink-soft/70">No stats yet.</p>
            )}
          </div>
        </section>

        {/* Education */}
        <section className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight">Education</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink-soft">Degree title</label>
              <input
                required
                value={form.degreeTitle}
                onChange={(e) => setForm({ ...form, degreeTitle: e.target.value })}
                placeholder="BS Computer Science"
                className={`${inputClass} mt-1.5`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-soft">Institution</label>
                <input
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  className={`${inputClass} mt-1.5`}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-soft">Years</label>
                <input
                  required
                  value={form.years}
                  onChange={(e) => setForm({ ...form, years: e.target.value })}
                  placeholder="2022 — 2026"
                  className={`${inputClass} mt-1.5`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-soft">
                Coursework (comma separated)
              </label>
              <textarea
                rows={2}
                value={courseworkText}
                onChange={(e) => setCourseworkText(e.target.value)}
                className={`${inputClass} mt-1.5 resize-none`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-soft">
                Certifications (comma separated)
              </label>
              <textarea
                rows={2}
                value={certsText}
                onChange={(e) => setCertsText(e.target.value)}
                className={`${inputClass} mt-1.5 resize-none`}
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={saving || uploading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aqua via-leaf to-coral px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}