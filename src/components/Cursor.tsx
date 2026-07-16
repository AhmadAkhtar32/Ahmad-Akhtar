import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "hidden";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.7 });

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
    <>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-aqua"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={variant}
        variants={{
          default: { scale: 1, opacity: 1 },
          hover: { scale: 0.6, opacity: 1 },
          hidden: { opacity: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
      {/* trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[94] h-9 w-9 rounded-full border-[1.5px] border-aqua/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={variant}
        variants={{
          default: { scale: 1, opacity: 0.9, backgroundColor: "rgba(34,195,230,0)" },
          hover: { scale: 1.9, opacity: 1, backgroundColor: "rgba(34,195,230,0.08)" },
          hidden: { opacity: 0, scale: 0.6 },
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
    </>
  );
}
