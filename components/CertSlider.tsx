"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";

type CertItem = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  link?: string;
  fit?: "cover" | "contain";
};

export function CertSlider({
  items,
  verifyLabel,
  emptyLabel,
}: {
  items: CertItem[];
  verifyLabel: string;
  emptyLabel: string;
}) {
  const track = useRef<HTMLUListElement>(null);

  const slide = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ct");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 340) + 22), behavior: "smooth" });
  };

  return (
    <div className="ct-slider">
      {items.length > 1 && (
        <div className="ct-nav">
          <button type="button" onClick={() => slide(-1)} aria-label="Sebelumnya">
            ←
          </button>
          <button type="button" onClick={() => slide(1)} aria-label="Berikutnya">
            →
          </button>
        </div>
      )}
      <ul className={`ct-grid${items.length ? " is-slider" : ""}`} ref={track}>
        {items.length > 0
          ? items.map((c, i) => (
              <Reveal as="li" key={i} delay={i * 80} variant="zoom" className="ct">
                <a className="ct-card" href={c.link} target="_blank" rel="noreferrer">
                  <span className="ct-frame has-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={c.title}
                      className={c.fit === "contain" ? "is-contain" : ""}
                      loading="lazy"
                    />
                  </span>
                  <span className="ct-info">
                    <span className="ct-title">{c.title}</span>
                    <span className="ct-meta">
                      {c.issuer} · {c.year}
                    </span>
                    <span className="ct-verify">{verifyLabel} ↗</span>
                  </span>
                </a>
              </Reveal>
            ))
          : [0, 1, 2].map((i) => (
              <Reveal as="li" key={i} delay={i * 100} variant="zoom" className="ct">
                <span className="ct-frame">
                  <span className="ct-mark" aria-hidden />
                  <span className="ct-label">{emptyLabel}</span>
                </span>
                <span className="ct-lines">
                  <span className="ct-line" />
                  <span className="ct-line is-short" />
                </span>
              </Reveal>
            ))}
      </ul>
    </div>
  );
}
