"use client";

import { useEffect, useState } from "react";

export function Lightbox() {
  const [shot, setShot] = useState<{ src: string; cap: string; href?: string; vlabel?: string } | null>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Link verifikasi di dalam baris file -> biarkan navigasi normal
      if (t.closest?.(".ct-file a")) return;
      const el = t.closest?.("figure.pd-shot, figure.pd-hero, .ct-card, .ct-file, .cf-paper") as
        | HTMLElement
        | null;
      if (!el) return;
      const frame = (
        el.classList.contains("ct-card") ? el.querySelector(".ct-frame.has-img") : el
      ) as HTMLElement | null;
      if (!frame) return;
      const src = frame.querySelector("img")?.getAttribute("src") ?? frame.getAttribute("data-src");
      if (!src) return;
      if (el.classList.contains("ct-card")) e.preventDefault();
      setShot({
        src,
        cap: frame.getAttribute("data-cap") ?? frame.querySelector("figcaption")?.textContent ?? "",
        href: frame.getAttribute("data-href") ?? undefined,
        vlabel: frame.getAttribute("data-vlabel") ?? undefined,
      });
      setZoom(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShot(null);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!shot) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [shot]);

  if (!shot) return null;

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={shot.cap} onClick={() => setShot(null)}>
      <figure className={`lb-fig${zoom ? " is-zoom" : ""}`} onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.cap} onClick={() => setZoom((z) => !z)} />
        {shot.cap ? <figcaption>{shot.cap}</figcaption> : null}
        {shot.href ? (
          <a className="lb-verify" href={shot.href} target="_blank" rel="noreferrer">
            ✓ {shot.vlabel ?? "Verifikasi"} ↗
          </a>
        ) : null}
        <span className="lb-hint">{zoom ? "klik gambar untuk perkecil" : "klik gambar untuk zoom"} · esc untuk tutup</span>
      </figure>
      <button type="button" className="lb-close" aria-label="Close" onClick={() => setShot(null)}>
        ✕
      </button>
    </div>
  );
}
