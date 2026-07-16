import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { BrainCircuit, Code2, Database, Globe, Paintbrush, Server } from "lucide-react";
import { Reveal, SectionTag } from "@/components/ui";

const STACKS = [
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "JavaScript/TypeScript", "HTML/CSS", "Urdu", "English"],
    color: "#22c3e6",
  },
  {
    icon: Globe,
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "ShadCN", "Framer Motion"],
    color: "#14b86a",
  },
  {
    icon: Server,
    title: "Backend & Databases",
    items: ["Node.js", "Firebase", "MySQL", "Convex", "REST APIs"],
    color: "#ff6b4a",
  },
  {
    icon: Database,
    title: "Tools & Practices",
    items: ["Git/GitHub", "OOP", "Data Structures", "Algorithms", "CI/CD"],
    color: "#e14dcb",
  },
  {
    icon: BrainCircuit,
    title: "AI & ML",
    items: ["TensorFlow", "OpenCV", "Prompt Engineering", "Machine Learning"],
    color: "#ffab1a",
  },
  {
    icon: Paintbrush,
    title: "Design",
    items: ["Figma", "UI/UX Principles", "Responsive Design", "Prototyping"],
    color: "#6e56f5",
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.5"],
  });

  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-aqua/12 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="flex justify-center">
          <SectionTag label="My Skills" color="#14b86a" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-tight">
            Tech I <span className="text-gradient-prism">work with.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20">
          {/* progress line */}
          <div className="absolute left-0 right-0 top-6 hidden h-[3px] rounded-full bg-line lg:block" />
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute left-0 right-0 top-6 hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-aqua via-leaf to-coral lg:block"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STACKS.map((stack, i) => (
              <Reveal key={stack.title} delay={0.1 * i} className="h-full">
                <div className="group relative h-full rounded-[1.75rem] border border-line bg-paper p-7 shadow-[0_16px_50px_rgba(11,11,20,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(11,11,20,0.1)]">
                  <span
                    className="absolute right-6 top-4 font-display text-6xl font-bold opacity-[0.07] transition-opacity duration-500 group-hover:opacity-20"
                    style={{ color: stack.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="relative grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
                    style={{ background: stack.color }}
                  >
                    <stack.icon className="h-5 w-5" />
                  </span>

                  <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight">
                    {stack.title}
                  </h3>
                  <ul className="relative mt-4 space-y-2 text-sm text-ink-soft">
                    {stack.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-mist text-ink">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stack.color }} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span
                    className="absolute bottom-0 left-7 right-7 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: stack.color }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
