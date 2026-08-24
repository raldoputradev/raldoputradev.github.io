export function CodeCard({
  caption,
  className = "",
}: {
  caption: string;
  className?: string;
}) {
  return (
    <aside className={`code-card is-on${className ? ` ${className}` : ""}`}>
      <div className="code-card-bar" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="code-card-body">
        <span className="code-line is-a" />
        <span className="code-line is-b" />
        <span className="code-line is-c" />
        <p className="code-card-caption">{caption}</p>
      </div>
    </aside>
  );
}
