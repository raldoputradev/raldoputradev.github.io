export function SectionHeading({
  kicker,
  lead,
  accent,
  center = false,
}: {
  kicker: string;
  lead: string;
  accent: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">— {kicker}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
        {lead} <span className="text-gold italic">{accent}</span>
      </h2>
      <div className={`mt-3 h-px w-16 bg-accent ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
