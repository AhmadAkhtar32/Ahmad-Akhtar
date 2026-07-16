import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Magnetic, Reveal } from "@/components/ui";

const CONTACT_ROWS = [
  { icon: Mail, label: "ahmadrao3226@gmail.com", href: "mailto:ahmadrao3226@gmail.com" },
  { icon: MapPin, label: "Lahore, Pakistan", href: undefined },
  { icon: Clock, label: "Replies within 24 hours", href: undefined },
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

const inputClass =
  "w-full rounded-xl border border-line bg-mist px-4 py-3.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-all duration-300 focus:border-aqua focus:bg-paper focus:ring-4 focus:ring-aqua/10";

// ⚠️ Replace these two with your actual values from the EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_hs1cq6e";
const EMAILJS_TEMPLATE_ID = "template_havoysc";
const EMAILJS_PUBLIC_KEY = "oB9waspWO7t5TvwF3";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setError(false);

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 4000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setError(true);
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-8 shadow-[0_40px_120px_rgba(11,11,20,0.35)] md:p-14 lg:p-20">
            {/* animated gradient auras */}
            <motion.div
              className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-aqua/50 blur-[130px]"
              animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-leaf/45 blur-[120px]"
              animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-1/3 top-0 h-72 w-72 rounded-full bg-coral/30 blur-[110px]"
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="bg-grid absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full rounded-full bg-leaf animate-pulse-dot" />
                    <span className="relative h-2 w-2 rounded-full bg-leaf" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                    Open for freelance & collaboration
                  </span>
                </div>

                <h2 className="mt-8 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-white">
                  Let&apos;s build something <span className="text-gradient-prism">amazing.</span>
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                  Got a project, idea, or problem to solve? Drop me a message — I&apos;ll get back to
                  you within a day.
                </p>

                <div className="mt-10 space-y-4">
                  {CONTACT_ROWS.map((row) => {
                    const inner = (
                      <>
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <row.icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-sm font-medium text-white/90">{row.label}</span>
                      </>
                    );
                    return row.href ? (
                      <a key={row.label} href={row.href} className="group flex w-fit items-center gap-4" data-hover>
                        {inner}
                      </a>
                    ) : (
                      <div key={row.label} className="group flex w-fit items-center gap-4">
                        {inner}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 flex gap-3">
                  {SOCIALS.map(({ label, href, icon }) => {
                    const Icon = icon === "github" ? GithubIcon : icon === "linkedin" ? LinkedinIcon : icon === "facebook" ? FacebookIcon : InstagramIcon;
                    return (
                      <Magnetic key={label} strength={0.4}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={label}
                          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-ink"
                          data-hover
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      </Magnetic>
                    );
                  })}
                </div>
              </div>

              {/* Right — form card */}
              <div className="rounded-[1.75rem] border border-white/15 bg-white p-6 text-ink shadow-2xl md:p-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Send me a message
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">
                  It lands straight in my inbox — no spam, ever.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="name" required placeholder="Your name" className={inputClass} />
                    <input name="email" required type="email" placeholder="Email address" className={inputClass} />
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, idea, or question..."
                    className={`${inputClass} resize-none`}
                  />
                  <Magnetic className="block w-full">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-aqua via-leaf to-coral px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-aqua/30 transition-shadow duration-300 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      {sending ? "Sending..." : sent ? "Message sent!" : "Send Message"}
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </button>
                  </Magnetic>
                  {error && (
                    <p className="text-center text-sm font-medium text-red-500">
                      Something went wrong. Please try again or email me directly at{" "}
                      <a href="mailto:ahmadrao3226@gmail.com" className="underline">
                        ahmadrao3226@gmail.com
                      </a>
                      .
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}