import { Code2 } from "lucide-react";

const ITEMS = [
  "React.js",
  "Next.js",
  "Python",
  "Node.js",
  "Firebase",
  "MySQL",
  "Convex",
  "AI/ML",
  "Tailwind CSS",
];

const COLORS = ["#22c3e6", "#14b86a", "#ff6b4a", "#22c3e6", "#14b86a", "#ff6b4a", "#22c3e6", "#14b86a"];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <div key={item} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-display text-2xl font-semibold tracking-tight text-ink/85 md:px-10 md:text-4xl">
            {item}
          </span>
          <Code2
            className="h-6 w-6 shrink-0 md:h-8 md:w-8"
            style={{ color: COLORS[i % COLORS.length] }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee-paused mask-x relative overflow-hidden border-y border-line bg-paper py-7 md:py-9">
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </section>
  );
}
