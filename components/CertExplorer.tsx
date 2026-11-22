"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const LOOPS = 3;

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
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, sl: 0, moved: false });

  // Gandakan 3x -> geser kiri/kanan tanpa ujung (infinite loop)
  const looped = useMemo(
    () =>
      groups.length
        ? Array.from({ length: LOOPS }, (_, li) =>
            groups.map((g, gi) => ({ g, gi, li }))
          ).flat()
        : [],
    [groups]
  );

  // Mulai dari salinan tengah
  useEffect(() => {
    const el = track.current;
    if (!el || !groups.length) return;
    const id = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / LOOPS;
    });
    return () => cancelAnimationFrame(id);
  }, [groups]);

  // Wrap tak kasat mata saat menyentuh ujung salinan
  const onScroll = () => {
    const el = track.current;
    if (!el || !groups.length) return;
    const set = el.scrollWidth / LOOPS;
    if (el.scrollLeft >= set * 2 - 4) el.scrollLeft -= set;
    else if (el.scrollLeft <= 4) el.scrollLeft += set;
  };

  // Klik di mana pun di luar folder -> folder menutup
  useEffect(() => {
    if (open < 0) return;
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".cf")) setOpen(-1);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  const slide = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".cf-wrap");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 340) + 38), behavior: "smooth" });
  };

  const pointer = {
    down: (e: React.PointerEvent<HTMLDivElement>) => {
      const el = track.current;
      if (!el) return;
      drag.current = { on: true, x: e.clientX, sl: el.scrollLeft, moved: false };
    },
    move: (e: React.PointerEvent<HTMLDivElement>) => {
      const el = track.current;
      const d = drag.current;
      if (!el || !d.on) return;
      const dx = e.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 5) {
        d.moved = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-drag");
      }
      if (d.moved) el.scrollLeft = d.sl - dx;
    },
    up: (e: React.PointerEvent<HTMLDivElement>) => {
      const el = track.current;
      if (!el) return;
      drag.current.on = false;
      el.classList.remove("is-drag");
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    },
    clickCapture: (e: React.MouseEvent<HTMLDivElement>) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    },
  };

  if (!groups.length) {
    return <p className="cx-empty">{emptyLabel}</p>;
  }

  return (
    <div className="cf-zone">
      <div className="cf-nav">
        <button type="button" onClick={() => slide(-1)} aria-label="Geser kiri">
          ←
        </button>
        <button type="button" onClick={() => slide(1)} aria-label="Geser kanan">
          →
        </button>
      </div>
      <div
        className="cf-grid is-loop"
        ref={track}
      onScroll={onScroll}
      onPointerDown={pointer.down}
      onPointerMove={pointer.move}
      onPointerUp={pointer.up}
      onPointerCancel={pointer.up}
      onClickCapture={pointer.clickCapture}
    >
      {looped.map(({ g, gi, li }) => {
        const n = g.items.length + (g.note ? 1 : 0);
        return (
          <Reveal key={`${li}-${gi}`} delay={gi * 120} variant="zoom" className="cf-wrap">
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
                      <span className="cf-vrf" aria-hidden>
                        ✓
                      </span>
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
    </div>
  );
}
