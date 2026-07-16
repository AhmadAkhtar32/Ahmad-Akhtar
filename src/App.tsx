import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis, lenisRef } from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import { Analytics } from "@vercel/analytics/next"

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  /* lock scroll during preload */
  useEffect(() => {
    if (!lenisRef.current) return;
    if (loading) lenisRef.current.stop();
    else lenisRef.current.start();
  }, [loading]);

  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <div className="relative bg-mist font-body text-ink">
      <Cursor />

      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onDone={handleDone} />}
      </AnimatePresence>

      <Navbar ready={!loading} />

      <main>
        <Hero active={!loading} />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* film grain */}
      <div className="noise" />
    </div>
  );
}
