import { ArrowUp } from "lucide-react";
import { scrollToSection, lenisRef } from "@/lib/lenis";
import { Magnetic } from "@/components/ui";

const NAV = [
  { label: "About", hash: "#about" },
  { label: "Projects", hash: "#projects" },
  { label: "Skills", hash: "#skills" },
  { label: "Contact", hash: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/AhmadAkhtar32", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad-akhtar-2065532aa/", icon: "linkedin" },
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=100026754934500", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/ahmad_rao_32/", icon: "instagram" },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.95C18.05 21.45 22 17.3 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper pt-20">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-aqua/15 via-leaf/15 to-coral/15 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-aqua via-leaf to-coral font-display text-lg font-bold text-white">
                A
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                Ahmad<span className="text-gradient-prism">.</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              Software engineer from Lahore, Pakistan — building scalable applications, AI/ML
              tools, and exploring machine learning with Python and modern frameworks.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ label, href, icon }) => {
                const Icon = icon === "github" ? GithubIcon : icon === "linkedin" ? LinkedinIcon : icon === "facebook" ? FacebookIcon : InstagramIcon;
                return (
                  <Magnetic key={label} strength={0.4}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-mist text-ink transition-all duration-300 hover:border-aqua hover:bg-aqua hover:text-white"
                      data-hover
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-soft">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((link) => (
                <li key={link.hash}>
                  <button
                    onClick={() => scrollToSection(link.hash)}
                    className="group relative text-sm font-medium text-ink/80 transition-colors hover:text-aqua"
                    data-hover
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-aqua transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="group relative select-none border-t border-line py-6 text-center" data-hover>
          <h2 className="font-display text-[18vw] font-bold leading-none tracking-tighter text-ink/[0.06] transition-opacity duration-700 group-hover:opacity-0 md:text-[11rem]">
            AHMAD
          </h2>
          <h2 className="text-gradient-prism absolute inset-0 py-6 font-display text-[18vw] font-bold leading-none tracking-tighter opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:text-[11rem]">
            AHMAD
          </h2>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-line py-7 text-xs text-ink-soft sm:flex-row">
          <p>© {year} Ahmad Akhtar. All rights reserved.</p>
          <p>
            Crafted with obsession in <span className="font-semibold text-ink">Lahore, Pakistan</span>
          </p>
          <button
            onClick={toTop}
            className="group flex items-center gap-2 font-semibold text-ink transition-colors hover:text-aqua"
            data-hover
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-mist transition-all duration-300 group-hover:-translate-y-1 group-hover:border-aqua">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
