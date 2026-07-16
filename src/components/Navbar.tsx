import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { scrollToSection, lenisRef } from "@/lib/lenis";
import { Magnetic } from "@/components/ui";

const LINKS = [
  { label: "About", hash: "#about" },
  { label: "Projects", hash: "#projects" },
  { label: "Skills", hash: "#skills" },
  { label: "Contact", hash: "#contact" },
];

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-2.5" data-hover>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-aqua via-leaf to-coral font-display text-lg font-bold text-white shadow-lg shadow-aqua/30 transition-transform duration-300 group-hover:rotate-12">
        A
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Ahmad<span className="text-gradient-prism">.</span>
      </span>
    </button>
  );
}

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = (hash: string) => {
    setOpen(false);
    setTimeout(() => scrollToSection(hash), open ? 350 : 0);
  };

  const toTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-8"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "glass border border-line shadow-[0_12px_40px_rgba(11,11,20,0.08)]"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Logo onClick={toTop} />

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.hash}
                onClick={() => go(l.hash)}
                className="group relative text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
                data-hover
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-aqua to-leaf transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block">
              <button
                onClick={() => go("#contact")}
                className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-aqua"
                data-hover
              >
                Let's Connect
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper shadow-sm lg:hidden"
              aria-label="Open menu"
              data-hover
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[85] flex flex-col bg-mist px-6 py-5"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-aqua/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-coral/15 blur-3xl" />
            </div>

            <div className="relative flex items-center justify-between">
              <Logo onClick={() => { setOpen(false); toTop(); }} />
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="relative mt-14 flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <div key={l.hash} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.08 * i + 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => go(l.hash)}
                    className="group flex items-baseline gap-4 py-2 text-left font-display text-5xl font-semibold tracking-tight"
                  >
                    <span className="text-sm font-medium text-ink-soft">0{i + 1}</span>
                    <span className="transition-colors duration-300 group-hover:text-aqua">
                      {l.label}
                    </span>
                  </motion.button>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="relative mt-auto space-y-1 border-t border-line pt-6 text-sm text-ink-soft"
            >
              <p className="font-semibold text-ink">Ahmad Akhtar</p>
              <p>Software Engineer — Lahore, Pakistan</p>
              <p className="text-gradient-prism font-semibold">ahmadrao3226@gmail.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
