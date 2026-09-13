import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "hidden";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cx = useSpring(x, { stiffness: 800, damping: 45, mass: 0.4 });
  const cy = useSpring(y, { stiffness: 800, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("input, textarea, select")) setVariant("hidden");
      else if (t.closest("a, button, [data-hover]")) setVariant("hover");
      else setVariant("default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: cx, y: cy }}
      animate={variant}
      variants={{
        default: { scale: 1, opacity: 1 },
        hover: { scale: 1.25, opacity: 1 },
        hidden: { opacity: 0, scale: 0.6 },
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))" }}
      >
        <defs>
          <linearGradient id="cursorGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22c3e6" />
            <stop offset="0.5" stopColor="#14b86a" />
            <stop offset="1" stopColor="#ff6b4a" />
          </linearGradient>
        </defs>
        <path
          d="M2 1.5L22.5 12.2L13.4 14.1L9.3 22.9L2 1.5Z"
          fill="url(#cursorGradient)"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}