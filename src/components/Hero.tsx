import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, BrainCircuit, Code2, Sparkles, Star } from "lucide-react";
import heroOrb from "@/assets/hero-orb.jpg";
import { Magnetic } from "@/components/ui";
import { scrollToSection } from "@/lib/lenis";

const lineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const lineChild: Variants = {
  hidden: { y: "115%", rotate: 4 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const CHIPS = [
  { icon: Code2, label: "Software Engineer", color: "#22c3e6", className: "-right-3 top-8 md:-right-8", delay: 1.5, dur: 5 },
  { icon: BrainCircuit, label: "AI/ML Enthusiast", color: "#14b86a", className: "-left-3 top-1/2 md:-left-10", delay: 1.65, dur: 6.5 },
  { icon: Star, label: "COMSATS Grad", color: "#ff6b4a", className: "bottom-10 right-6", delay: 1.8, dur: 5.6 },
];

export default function Hero({ active }: { active: boolean }) {
  const state = active ? "visible" : "hidden";

  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44">
      {/* background */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
      <motion.div
        className="absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-aqua/25 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[5%] top-1/3 h-[26rem] w-[26rem] rounded-full bg-leaf/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-coral/20 blur-[100px]"
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* Left — copy */}
        <motion.div variants={lineContainer} initial="hidden" animate={state}>
          <motion.div variants={fadeUp} className="mb-7">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper py-2 pl-3 pr-4 shadow-[0_2px_18px_rgba(34,195,230,0.08)]">
              <span className="flex items-center gap-0.5 rounded-full bg-gradient-to-r from-aqua to-leaf px-2.5 py-1 text-white">
                <Star className="h-3 w-3 fill-white" />
                <Star className="h-3 w-3 fill-white" />
                <Star className="h-3 w-3 fill-white" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                COMSATS University
              </span>
            </div>
          </motion.div>

          <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(2.7rem,7.2vw,6rem)]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineChild} className="block origin-left">
                BUILDING THE
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineChild} className="flex origin-left items-center gap-3 md:gap-5">
                <span className="text-gradient-prism">FUTURE</span>
                <motion.span
                  className="hidden h-[0.72em] w-[1.6em] shrink-0 overflow-hidden rounded-full shadow-lg shadow-aqua/30 sm:block"
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <img src={heroOrb} alt="" className="h-full w-full object-cover" />
                </motion.span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineChild} className="block origin-left">
                <span className="text-stroke">WITH CODE</span> & AI
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            I&apos;m Ahmad Akhtar a software engineer from Lahore, Pakistan. I build
            scalable applications, AI-powered tools, and explore machine learning. Currently
            studying Computer Science at COMSATS University.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToSection("#contact")}
                className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-aqua via-leaf to-coral px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-aqua/30 transition-shadow duration-300 hover:shadow-2xl hover:shadow-aqua/40"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Let's Connect
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToSection("#projects")}
                className="rounded-full border border-ink/15 bg-paper px-7 py-4 text-sm font-semibold text-ink shadow-sm transition-all duration-300 hover:border-aqua hover:text-aqua"
              >
                View Projects
              </button>
            </Magnetic>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9">
            <p className="text-sm text-ink-soft">
              2+ years of coding experience
            </p>
          </motion.div>
        </motion.div>

        {/* Right — orb visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={active ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="animate-blob relative aspect-square overflow-hidden bg-gradient-to-br from-aqua/20 via-leaf/15 to-coral/20 p-2 shadow-[0_40px_90px_rgba(34,195,230,0.25)]">
            <img
              src={heroOrb}
              alt="Abstract 3D artwork"
              className="animate-blob h-full w-full object-cover"
              style={{ animationDelay: "-8s" }}
            />
          </div>

          {/* orbiting badge */}
          <div className="absolute -left-6 -top-6 hidden h-28 w-28 md:block">
            <div className="animate-spin-slow h-full w-full">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text className="fill-ink text-[9.5px] font-semibold uppercase tracking-[0.24em]">
                  <textPath href="#circlePath">Open for freelance • Lahore PK •</textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-aqua to-leaf text-white shadow-lg shadow-aqua/40">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* floating chips */}
          {CHIPS.map((chip) => (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, y: 24, scale: 0.8 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: chip.delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute ${chip.className}`}
            >
              <div
                className="animate-float flex items-center gap-2.5 rounded-2xl border border-line bg-paper px-4 py-3 shadow-[0_16px_40px_rgba(11,11,20,0.1)]"
                style={{ animationDuration: `${chip.dur}s` }}
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-xl text-white"
                  style={{ background: chip.color }}
                >
                  <chip.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{chip.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="relative mt-16 hidden justify-center md:flex"
      >
        <button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-ink-soft transition-colors hover:text-aqua"
          data-hover
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}
