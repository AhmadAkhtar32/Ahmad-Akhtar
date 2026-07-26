import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FolderKanban, Sparkles, User, Mail, ArrowUpRight } from "lucide-react";
import { Counter, Reveal, SectionTag } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";

const SECTIONS = [
  {
    to: "/admin/projects",
    icon: FolderKanban,
    title: "Projects",
    desc: "Add, edit, or remove work you've built.",
    color: "#22c3e6",
    stat: 2,
    statLabel: "Live projects",
  },
  {
    to: "/admin/skills",
    icon: Sparkles,
    title: "Skills",
    desc: "Manage your tech stacks and tools.",
    color: "#14b86a",
    stat: 6,
    statLabel: "Stack groups",
  },
  {
    to: "/admin/about",
    icon: User,
    title: "About",
    desc: "Edit your bio, education, and stats.",
    color: "#ff6b4a",
    stat: 4,
    statLabel: "Highlight stats",
  },
  {
    to: "/admin/contact",
    icon: Mail,
    title: "Contact",
    desc: "Update contact details and socials.",
    color: "#e14dcb",
    stat: 4,
    statLabel: "Social links",
  },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const firstName = user?.email?.split("@")[0] ?? "there";

  return (
    <div className="relative px-8 py-10 md:px-12 md:py-14">
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-aqua/10 blur-[110px]" />

      <Reveal>
        <SectionTag label="Dashboard" color="#22c3e6" />
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-tight tracking-tight">
          {greeting()}, <span className="text-gradient-prism capitalize">{firstName}</span>.
        </h1>
        <p className="mt-2 max-w-lg text-[15px] text-ink-soft">
          Here&apos;s a snapshot of your portfolio. Pick a section below to start editing.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={0.08 + i * 0.06}>
            <Link to={s.to} data-hover>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-paper p-6 shadow-[0_16px_50px_rgba(11,11,20,0.05)] transition-shadow duration-500 hover:shadow-[0_26px_70px_rgba(11,11,20,0.1)]"
              >
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-25"
                  style={{ background: s.color }}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: s.color }}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-soft/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>

                <p className="relative mt-6 font-display text-3xl font-semibold tabular-nums tracking-tight">
                  <Counter to={s.stat} suffix="" decimals={0} />
                </p>
                <p className="relative mt-1 text-xs font-medium text-ink-soft">{s.statLabel}</p>

                <h3 className="relative mt-4 font-display text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="relative mt-1 text-[13px] leading-relaxed text-ink-soft">{s.desc}</p>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.32} className="mt-10">
        <div className="rounded-[1.75rem] border border-dashed border-line bg-paper/60 p-6 text-sm text-ink-soft">
          Editing tools for each section are being wired up next — changes you make there will
          appear live on your portfolio instantly.
        </div>
      </Reveal>
    </div>
  );
}