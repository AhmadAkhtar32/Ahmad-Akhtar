import { Reveal, SectionTag } from "@/components/ui";

export default function AdminComingSoon({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  return (
    <div className="relative px-8 py-10 md:px-12 md:py-14">
      <Reveal>
        <SectionTag label="Dashboard" color={color} />
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 max-w-lg text-[15px] text-ink-soft">
          The editor for this section is coming up next.
        </p>
      </Reveal>
    </div>
  );
}