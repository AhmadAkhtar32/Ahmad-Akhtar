"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "hidden";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("hidden");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const cx = useSpring(x, {
    stiffness: 1200,
    damping: 55,
    mass: 0.25,
  });

  const cy = useSpring(y, {
    stiffness: 1200,
    damping: 55,
    mass: 0.25,
  });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setEnabled(true);

    const updateVariant = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;

      if (!element) {
        setVariant("default");
        return;
      }

      if (element.closest("input, textarea, select")) {
        setVariant("hidden");
      } else if (element.closest("a, button, [data-hover]")) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    const move = (e: MouseEvent) => {
      // Immediately hide if pointer is outside the viewport
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setVariant("hidden");
        return;
      }

      x.set(e.clientX);
      y.set(e.clientY);

      updateVariant(e.target);
    };

    const mouseOver = (e: MouseEvent) => {
      updateVariant(e.target);
    };

    const mouseOut = (e: MouseEvent) => {
      // relatedTarget === null means the pointer left the document
      if (e.relatedTarget === null) {
        setVariant("hidden");
      }
    };

    const mouseEnter = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      updateVariant(e.target);
    };

    const blur = () => {
      setVariant("hidden");
    };

    const focus = () => {
      setVariant("default");
    };

    window.addEventListener("mousemove", move, {
      passive: true,
    });

    window.addEventListener("mouseover", mouseOver, {
      passive: true,
    });

    window.addEventListener("mouseout", mouseOut, {
      passive: true,
    });

    window.addEventListener("mouseenter", mouseEnter, {
      passive: true,
    });

    window.addEventListener("blur", blur);

    window.addEventListener("focus", focus);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", mouseOver);
      window.removeEventListener("mouseout", mouseOut);
      window.removeEventListener("mouseenter", mouseEnter);
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", focus);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: cx,
        y: cy,
      }}
      animate={variant}
      variants={{
        default: {
          scale: 1,
          opacity: 1,
        },

        hover: {
          scale: 1.25,
          opacity: 1,
        },

        hidden: {
          scale: 0.6,
          opacity: 0,
        },
      }}
      transition={{
        duration: 0.12,
        ease: "easeOut",
      }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter:
            "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
        }}
      >
        <defs>
          <linearGradient
            id="cursorGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0"
              stopColor="#22c3e6"
            />

            <stop
              offset="0.5"
              stopColor="#14b86a"
            />

            <stop
              offset="1"
              stopColor="#ff6b4a"
            />
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