import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import workItinera from "@/assets/work-itinera.jpg";
import workAiTrip from "@/assets/work-ai-trip.jpg";
import { Reveal, SectionTag } from "@/components/ui";
import { scrollToSection } from "@/lib/lenis";

const PROJECTS = [
  {
    image: workItinera,
    title: "Itinera — AI-Powered Trip Planner",
    desc: "Final year project: AI-powered trip planner that designs full-stack itineraries with Next.js, Convex, Clerk Auth, and GPT-4. Integrated Mapbox and real-time data sync.",
    tags: ["Next.js", "Convex", "Clerk Auth", "GPT-4", "Mapbox"],
    links: [
      { icon: Code2, href: "https://github.com/YihongT/ITINERA", label: "GitHub" },
    ],
    year: "2025 — 2026",
    color: "#22c3e6",
  },
  {
    image: workAiTrip,
    title: "AI Trip Planner",
    desc: "Personal project: AI trip planner built with React and Firebase. Implemented core planning features with a responsive UI and real-time database sync.",
    tags: ["React", "Firebase", "Tailwind CSS", "AI"],
    links: [],
    year: "2024",
    color: "#14b86a",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-leaf/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionTag label="My Work" color="#22c3e6" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-tight">
                Projects that <span className="text-gradient-prism">solve problems.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
              A selection of projects I&apos;ve built — from personal experiments to full-stack
              applications.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={0.08 * i} className={i % 2 === 1 ? "md:mt-16" : ""}>
              <div className="group" data-hover>
                <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-[0_20px_60px_rgba(11,11,20,0.07)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.06, rotate: 0.5 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(160deg, ${project.color}22 0%, transparent 55%)`,
                      }}
                    />
                    <span
                      className="absolute left-5 top-5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-sm"
                      style={{ background: `${project.color}e6` }}
                    >
                      {i === 0 ? "Final Year Project" : "Personal Project"}
                    </span>
                    {project.links.length > 0 && (
                      <motion.span
                        className="absolute bottom-5 right-5 grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                        style={{ color: project.color }}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between px-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: project.color }}>
                      {project.title.split(" — ")[0]}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-[1.7rem]">
                      {project.title.split(" — ")[1]}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{project.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-mist px-3 py-1.5 text-xs font-medium text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink-soft">
                    {project.year}
                  </span>
                </div>

                {project.links.length > 0 && (
                  <div className="mt-4 flex gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-xs font-semibold transition-all duration-300 hover:border-aqua hover:bg-aqua hover:text-white"
                        data-hover
                      >
                        <link.icon className="h-3 w-3" />
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:rotate-45" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-20">
          <button
            onClick={() => scrollToSection("#contact")}
            className="group relative mx-auto flex w-full items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] border border-line bg-paper p-7 text-left shadow-[0_20px_60px_rgba(11,11,20,0.06)] transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(34,195,230,0.18)] md:p-9"
            data-hover
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-aqua via-leaf to-coral transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative z-10 font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-white md:text-3xl">
              Got a project idea? Let's build it together.
            </span>
            <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-ink md:h-14 md:w-14">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
