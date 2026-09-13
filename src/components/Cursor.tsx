import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "hidden";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const dotY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

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
      className="pointer-events-none fixed left-0 top-0 z-[95] h-3 w-3 rounded-full"
      style={{
        x: dotX,
        y: dotY,
        translateX: "-50%",
        translateY: "-50%",
        background: "linear-gradient(135deg, #22c3e6, #14b86a, #ff6b4a)",
      }}
      animate={variant}
      variants={{
        default: { scale: 1, opacity: 1 },
        hover: { scale: 2.2, opacity: 0.85 },
        hidden: { opacity: 0, scale: 0.4 },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}