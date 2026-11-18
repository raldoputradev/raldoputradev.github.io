"use client";

import { useEffect, useMemo, useRef } from "react";
import { Reveal } from "./Reveal";

type CertItem = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  link?: string;
  fit?: "cover" | "contain";
};

const LOOPS = 3;

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
  const drag = useRef({ on: false, x: 0, sl: 0, moved: false });

  const looped = useMemo(
    () => (items.length ? Array.from({ length: LOOPS }, () => items).flat() : []),
    [items]
  );

  // Start in the middle copy so both directions are immediately scrollable.
  useEffect(() => {
    const el = track.current;
    if (!el || !items.length) return;
    const id = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / LOOPS;
    });
    return () => cancelAnimationFrame(id);
  }, [items]);

  // Seamless wrap: near an edge, jump one full set invisibly (content is identical).
  const onScroll = () => {
    const el = track.current;
    if (!el || !items.length) return;
    const set = el.scrollWidth / LOOPS;
    if (el.scrollLeft >= set * 2 - 4) el.scrollLeft -= set;
    else if (el.scrollLeft <= 4) el.scrollLeft += set;
  };

  const slide = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ct");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 340) + 22), behavior: "smooth" });
  };

  const pointer = {
    down: (e: React.PointerEvent<HTMLUListElement>) => {
      const el = track.current;
      if (!el) return;
      drag.current = { on: true, x: e.clientX, sl: el.scrollLeft, moved: false };
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-drag");
    },
    move: (e: React.PointerEvent<HTMLUListElement>) => {
      const el = track.current;
      const d = drag.current;
      if (!el || !d.on) return;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > 5) d.moved = true;
      el.scrollLeft = d.sl - dx;
    },
    up: (e: React.PointerEvent<HTMLUListElement>) => {
      const el = track.current;
      if (!el) return;
      drag.current.on = false;
      el.classList.remove("is-drag");
      if (drag.current.moved) el.releasePointerCapture(e.pointerId);
    },
    clickCapture: (e: React.MouseEvent<HTMLUListElement>) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    },
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
      <ul
        className={`ct-grid${items.length ? " is-slider is-infinite" : ""}`}
        ref={track}
        onScroll={onScroll}
        onPointerDown={pointer.down}
        onPointerMove={pointer.move}
        onPointerUp={pointer.up}
        onPointerCancel={pointer.up}
        onClickCapture={pointer.clickCapture}
      >
        {items.length > 0
          ? looped.map((c, i) => (
              <Reveal
                as="li"
                key={i}
                delay={(i % items.length) * 80}
                variant="zoom"
                className="ct"
              >
                <a
                  className="ct-card"
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.preventDefault()}
                >
                  <span
                    className="ct-frame has-img"
                    data-cap={`${c.title} — ${c.issuer} · ${c.year}`}
                    data-href={c.link}
                    data-vlabel={verifyLabel}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={c.title}
                      className={c.fit === "contain" ? "is-contain" : ""}
                      loading="lazy"
                      draggable={false}
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
