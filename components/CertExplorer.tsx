"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

type CertItem = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  link?: string;
  fit?: "cover" | "contain";
};

type CertGroup = {
  label: string;
  note?: string;
  logos?: string[];
  items: CertItem[];
};

export function CertExplorer({
  groups,
  verifyLabel,
  emptyLabel,
}: {
  groups: CertGroup[];
  verifyLabel: string;
  emptyLabel: string;
}) {
  const [open, setOpen] = useState<number>(-1);

  // Klik di mana pun di luar folder -> folder menutup
  useEffect(() => {
    if (open < 0) return;
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".cf")) setOpen(-1);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  if (!groups.length) {
    return <p className="cx-empty">{emptyLabel}</p>;
  }

  return (
    <div className="cf-grid">
      {groups.map((g, gi) => {
        const n = g.items.length + (g.note ? 1 : 0);
        return (
          <Reveal key={gi} delay={gi * 120} variant="zoom" className="cf-wrap">
            <div className={`cf${open === gi ? " is-open" : ""}`}>
              <div
                className="cf-stage"
                role="button"
                tabIndex={0}
                aria-expanded={open === gi}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest(".cf-paper")) return;
                  setOpen(open === gi ? -1 : gi);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(open === gi ? -1 : gi);
                  }
                }}
              >
                <span className="cf-back" aria-hidden />
                <span className="cf-stack">
                  {g.items.map((c, i) => (
                    <button
                      type="button"
                      key={c.title}
                      className="cf-paper"
                      style={{ "--i": i, "--n": n } as React.CSSProperties}
                      data-src={c.image}
                      data-cap={`${c.title} — ${c.issuer} · ${c.year}`}
                      data-href={c.link}
                      data-vlabel={verifyLabel}
                      title={c.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.image} alt={c.title} loading="lazy" draggable={false} />
                    </button>
                  ))}
                  {g.note ? (
                    <span
                      className="cf-paper is-note"
                      style={{ "--i": g.items.length, "--n": n } as React.CSSProperties}
                    >
                      <span className="cf-note-txt">{g.note}</span>
                    </span>
                  ) : null}
                </span>
                <span className="cf-front" aria-hidden />
                {g.logos?.length ? (
                  <span className="cf-stamp" aria-hidden>
                    {g.logos.map((l) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img key={l} src={l} alt="" />
                    ))}
                  </span>
                ) : null}

              </div>
              <p className="cf-label">
                <span>{g.label}</span>
                <span className="cf-count">{n}</span>
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
