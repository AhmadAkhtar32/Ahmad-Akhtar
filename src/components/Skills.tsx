import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Reveal, SectionTag } from "@/components/ui";
import { subscribeToSkills } from "@/lib/firestore-skills";
import type { Stack } from "@/lib/firestore-skills";
import { lenisRef } from "@/lib/lenis";
import { ICON_MAP } from "@/lib/icon-map";

export default function Skills() {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.5"],
  });

  useEffect(() => {
    const unsub = subscribeToSkills((data) => {
      setStacks(data);
      setLoading(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => lenisRef.current?.resize?.());
      });
    });
    return unsub;
  }, []);

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
          <div className="absolute left-0 right-0 top-6 hidden h-[3px] rounded-full bg-line lg:block" />
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute left-0 right-0 top-6 hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-aqua via-leaf to-coral lg:block"
          />

          {!loading && stacks.length === 0 && (
            <p className="text-center text-sm text-ink-soft">Skills coming soon.</p>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stacks.map((stack, i) => {
              const Icon = ICON_MAP[stack.icon] ?? ICON_MAP.Code2;
              return (
                <Reveal key={stack.id} delay={0.1 * i} className="h-full">
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
                      <Icon className="h-5 w-5" />
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}