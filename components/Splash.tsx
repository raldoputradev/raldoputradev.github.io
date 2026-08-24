"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedName } from "./AnimatedName";
import { site } from "@/lib/site";

const SPLASH_MS = 4200;
const EXIT_MS = 700;

export function Splash() {
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const finishing = useRef(false);

  const finish = useCallback(() => {
    if (finishing.current) {
      return;
    }
    finishing.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      document.documentElement.dataset.splash = "skip";
      setShow(false);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.splash = "skip";
      setShow(false);
      return;
    }

    document.documentElement.dataset.splash = "play";
    const playTimer = window.setTimeout(finish, SPLASH_MS);
    return () => window.clearTimeout(playTimer);
  }, [finish]);

  if (!show) {
    return null;
  }

  return (
    <div className={`splash${leaving ? " is-out" : ""}`} role="status" aria-live="polite" aria-label={site.name}>
      <div className="splash-grid" aria-hidden />
      <span className="splash-scan" aria-hidden />
      <span className="splash-shape is-sq" aria-hidden />
      <span className="splash-shape is-ring" aria-hidden />
      <span className="splash-shape is-plus" aria-hidden />
      <span className="splash-corner is-tl" aria-hidden />
      <span className="splash-corner is-tr" aria-hidden />
      <span className="splash-corner is-bl" aria-hidden />
      <span className="splash-corner is-br" aria-hidden />

      <div className="splash-mark">
        <p className="splash-kicker">Portfolio</p>
        <AnimatedName text={site.name} className="splash-name" />
        <div className="splash-loader" aria-hidden>
          <span className="splash-orbit" />
          <span className="splash-diamond" />
        </div>
      </div>
    </div>
  );
}
