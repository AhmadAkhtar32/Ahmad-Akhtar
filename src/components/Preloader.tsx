import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "AHMAD".split("");
const LETTER_COLORS = ["#22c3e6", "#14b86a", "#ff6b4a", "#22c3e6", "#14b86a"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const timer = setInterval(() => {
      n += Math.floor(Math.random() * 7) + 4;
      if (n >= 100) {
        n = 100;
        clearInterval(timer);
        setTimeout(onDone, 450);
      }
      setCount(n);
    }, 85);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-mist"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
    >
      {/* background aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,195,230,0.14),rgba(20,184,106,0.08)_45%,transparent_70%)]" />
      </div>

      {/* brand letters */}
      <div className="relative flex items-end gap-1 overflow-hidden">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", rotate: 8 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[16vw] font-semibold leading-none tracking-tight sm:text-7xl md:text-8xl"
            style={{ color: LETTER_COLORS[i] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-ink-soft"
      >
        Software Engineer
      </motion.p>

      {/* counter */}
      <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-leaf animate-pulse-dot" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Loading experience
          </span>
        </div>
        <span className="font-display text-6xl font-semibold tabular-nums text-ink md:text-7xl">
          {count}
          <span className="text-gradient-prism">%</span>
        </span>
      </div>

      {/* progress line */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-line/60">
        <motion.div
          className="h-full bg-gradient-to-r from-aqua via-leaf to-coral"
          animate={{ width: `${count}%` }}
          transition={{ ease: "easeOut", duration: 0.25 }}
        />
      </div>
    </motion.div>
  );
}
