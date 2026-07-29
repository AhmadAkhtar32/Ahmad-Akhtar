import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Plus, X, Save } from "lucide-react";
import { Reveal, SectionTag } from "@/components/ui";
import {
  subscribeToContact,
  saveContact,
  DEFAULT_CONTACT,
} from "@/lib/firestore-contact";
import type { ContactContent, SocialLink } from "@/lib/firestore-contact";

const inputClass =
  "w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-aqua focus:bg-paper focus:ring-4 focus:ring-aqua/10";

const ICON_CHOICES: SocialLink["icon"][] = ["github", "linkedin", "facebook", "instagram"];

export default function AdminContact() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<ContactContent>(DEFAULT_CONTACT);

  useEffect(() => {
    const unsub = subscribeToContact((data) => {
      setForm(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateSocial = (i: number, patch: Partial<SocialLink>) => {
    const next = [...form.socials];
    next[i] = { ...next[i], ...patch };
    setForm({ ...form, socials: next });
  };

  const addSocial = () => {
    setForm({
      ...form,
      socials: [...form.socials, { label: "", href: "", icon: "github" }],
    });
  };

  const removeSocial = (i: number) => {
    setForm({ ...form, socials: form.socials.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveContact(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving Contact content.");
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
        <SectionTag label="Dashboard" color="#e14dcb" />
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-tight">
          Contact
        </h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Changes here go live on your portfolio instantly.
        </p>
      </Reveal>

      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-10">
        <section className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight">Contact details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink-soft">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className={`${inputClass} mt-1.5`}
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
              <label className="text-xs font-semibold text-ink-soft">Reply time note</label>
              <input
                required
                value={form.replyTime}
                onChange={(e) => setForm({ ...form, replyTime: e.target.value })}
                placeholder="Replies within 24 hours"
                className={`${inputClass} mt-1.5`}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold tracking-tight">Social links</h2>
            <button
              type="button"
              onClick={addSocial}
              className="flex items-center gap-1 text-xs font-semibold text-aqua"
            >
              <Plus className="h-3 w-3" /> Add link
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {form.socials.map((social, i) => (
              <div key={i} className="rounded-xl border border-line bg-mist p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-soft">Link {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeSocial(i)}
                    className="grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <select
                    value={social.icon}
                    onChange={(e) =>
                      updateSocial(i, { icon: e.target.value as SocialLink["icon"] })
                    }
                    className={`${inputClass} bg-paper`}
                  >
                    {ICON_CHOICES.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon.charAt(0).toUpperCase() + icon.slice(1)}
                      </option>
                    ))}
                  </select>
                  <input
                    value={social.label}
                    onChange={(e) => updateSocial(i, { label: e.target.value })}
                    placeholder="Label (e.g. GitHub)"
                    className={`${inputClass} bg-paper`}
                  />
                  <input
                    value={social.href}
                    onChange={(e) => updateSocial(i, { href: e.target.value })}
                    placeholder="https://..."
                    className={`${inputClass} col-span-2 bg-paper`}
                  />
                </div>
              </div>
            ))}
            {form.socials.length === 0 && (
              <p className="text-xs text-ink-soft/70">No social links yet.</p>
            )}
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aqua via-leaf to-coral px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}