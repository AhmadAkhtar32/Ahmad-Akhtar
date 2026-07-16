import Lenis from "lenis";
import { useEffect } from "react";

export const lenisRef: { current: Lenis | null } = { current: null };

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}

export function scrollToSection(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(hash, { offset: -84, duration: 1.4 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}
