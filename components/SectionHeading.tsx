export function SectionHeading({
  kicker,
  lead,
  accent,
  blurb,
  center = false,
}: {
  kicker: string;
  lead: string;
  accent: string;
  blurb?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">+ {kicker}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
        {lead} <span className="text-gradient italic">{accent}</span>
      </h2>
      <div className={`section-rule mt-4 ${center ? "mx-auto" : ""}`} />
      {blurb ? <p className="mt-4 text-sm leading-relaxed text-muted">{blurb}</p> : null}
    </div>
  );
}
