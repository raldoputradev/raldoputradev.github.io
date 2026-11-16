"use client";

import { useEffect, useRef, useState } from "react";

const BANDS = [
  "ROBOTIC ENGINEER",
  "FULL-STACK DEVELOPER",
  "UI/UX DESIGNER",
  "EMBEDDED · IOT · FIRMWARE",
  "SMARTBRAIL — AFIS",
  "OPEN TO INTERNSHIP",
  "RAYENDRA ALDO PUTRA",
  "LARAVEL · REACT · FLUTTER",
  "PORTFOLIO — 2026",
  "ESP32 · FREERTOS",
  "POLIBATAM · BATAM",
  "C# · TYPESCRIPT",
];
const SEGS = 16;

export function Intro({ name }: { name: string }) {
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const segsRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const t0 = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      }
      const lit = Math.round(eased * SEGS);
      segsRef.current?.querySelectorAll("i").forEach((el, i) => {
        el.classList.toggle("is-lit", i < lit);
      });
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        rootRef.current?.classList.add("is-done");
        window.setTimeout(() => setDone(true), 800);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="intro" aria-hidden>
      <div className="intro-bands">
        {BANDS.map((b, i) => (
          <div key={b} className="intro-band" style={{ animationDelay: `${i * 0.1}s` }}>
            <span>{`${b} · `.repeat(8)}</span>
            <span>{`${b} · `.repeat(8)}</span>
          </div>
        ))}
      </div>
      <div className="intro-box">
        <p className="intro-name">{name}</p>
        <p className="intro-sub">PORTFOLIO</p>
        <div ref={segsRef} className="intro-segs">
          {Array.from({ length: SEGS }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      <span ref={countRef} className="intro-count">000</span>
    </div>
  );
}
