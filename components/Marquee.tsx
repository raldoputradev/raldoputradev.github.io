export function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="marquee-track" aria-hidden>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="font-display text-xl italic text-ink/85 sm:text-2xl">{item}</span>
          <span className="text-accent">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee border-y border-line/60 py-5">
      {track}
      {track}
    </div>
  );
}
