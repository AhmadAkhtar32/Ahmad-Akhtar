import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { MapPin } from "lucide-react";
import { Counter, Reveal, SectionTag } from "@/components/ui";
import { subscribeToAbout, DEFAULT_ABOUT } from "@/lib/firestore-about";
import type { AboutContent } from "@/lib/firestore-about";
import { ICON_MAP } from "@/lib/icon-map";
import { lenisRef } from "@/lib/lenis";

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const [about, setAbout] = useState<AboutContent>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });

  useEffect(() => {
    const unsub = subscribeToAbout((data) => {
      setAbout(data);
      setLoading(false);
      // Content just changed the page's height — tell Lenis to
      // re-measure so scroll-linked animations stay in sync.
      // Double rAF ensures the new DOM has actually painted first.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => lenisRef.current?.resize?.());
      });
    });
    return unsub;
  }, []);

  const words = about.paragraph.split(" ").filter(Boolean);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 transition-opacity duration-500 md:py-36"
      style={{ opacity: loading ? 0.4 : 1 }}
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-aqua/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionTag label="About Me" color="#22c3e6" />
        </Reveal>

        <p
          ref={textRef}
          className="mt-10 max-w-5xl font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-medium leading-[1.2] tracking-tight"
        >
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / (words.length || 1), (i + 1) / (words.length || 1)]}
            >
              {word}
            </Word>
          ))}
        </p>

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Bio card */}
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden rounded-[2rem] border border-line bg-paper p-8 shadow-[0_20px_60px_rgba(11,11,20,0.06)] md:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-aqua/20 to-leaf/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-xl shadow-aqua/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                  {about.portrait && (
                    <img
                      src={about.portrait}
                      alt="Portrait"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-leaf">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse-dot" />
                  Available
                </span>
              </div>

              <p className="relative mt-7 flex items-center gap-1.5 text-sm text-ink-soft">
                <MapPin className="h-3.5 w-3.5 text-coral" /> {about.location}
              </p>

              <p className="relative mt-5 text-[15px] leading-relaxed text-ink-soft">
                {about.bio}
              </p>

              <div className="relative mt-7 flex flex-wrap gap-2">
                {about.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-3.5 py-1.5 text-xs font-semibold text-ink"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {about.stats.map((stat, i) => {
              const Icon = ICON_MAP[stat.icon] ?? ICON_MAP.Code2;
              return (
                <Reveal key={stat.label} delay={0.12 + i * 0.08} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[2rem] border border-line bg-paper p-7 shadow-[0_20px_60px_rgba(11,11,20,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(11,11,20,0.1)] md:p-9">
                    <div
                      className="absolute -bottom-14 -right-14 h-40 w-40 rounded-full opacity-15 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"
                      style={{ background: stat.color }}
                    />
                    <span
                      className="relative grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg transition-transform duration-500 group-hover:rotate-12"
                      style={{ background: stat.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="relative mt-6 font-display text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
                      <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </p>
                    <p className="relative mt-2 text-sm font-medium text-ink-soft">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Education */}
        <Reveal delay={0.2} className="mt-20">
          <div className="rounded-[2rem] border border-line bg-paper p-8 shadow-[0_20px_60px_rgba(11,11,20,0.06)] md:p-12">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {about.degreeTitle}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">{about.institution}</p>
              </div>
              <span className="rounded-full border border-line bg-mist px-4 py-2 text-xs font-semibold text-ink-soft">
                {about.years}
              </span>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  Relevant Coursework
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {about.coursework.map((course) => (
                    <li key={course} className="flex items-center gap-2.5">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-aqua/15 text-aqua">
                        <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
                      </span>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  Certifications
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {about.certifications.map((cert) => (
                    <li key={cert} className="flex items-center gap-2.5">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-leaf/15 text-leaf">
                        <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                      </span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}