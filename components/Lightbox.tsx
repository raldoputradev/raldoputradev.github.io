"use client";

import { useEffect, useState } from "react";

export function Lightbox() {
  const [shot, setShot] = useState<{ src: string; cap: string } | null>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const fig = (e.target as HTMLElement).closest?.("figure.pd-shot, figure.pd-hero");
      if (!fig) return;
      const img = fig.querySelector("img");
      if (!img?.getAttribute("src")) return;
      setShot({ src: img.getAttribute("src")!, cap: fig.querySelector("figcaption")?.textContent ?? "" });
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
        <span className="lb-hint">{zoom ? "klik gambar untuk perkecil" : "klik gambar untuk zoom"} · esc untuk tutup</span>
      </figure>
      <button type="button" className="lb-close" aria-label="Close" onClick={() => setShot(null)}>
        ✕
      </button>
    </div>
  );
}
