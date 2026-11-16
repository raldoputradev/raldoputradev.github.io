export function Marquee({ items }: { items: string[] }) {
  const row = items.map((item, i) => (
    <span key={`${item}-${i}`} className="mq-item">
      {item}
      <span className="mq-dot" aria-hidden />
    </span>
  ));

  return (
    <div className="mq" aria-hidden>
      <div className="mq-track">
        {row}
        {row}
      </div>
    </div>
  );
}
