"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isAuditClient } from "@/lib/audit";
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
    if (
      document.documentElement.dataset.splash === "skip" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      isAuditClient()
    ) {
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
      <div className="splash-wash" aria-hidden />
      <div className="splash-mesh" aria-hidden />
      <span className="splash-orb is-mint" aria-hidden />
      <span className="splash-orb is-gold" aria-hidden />

      <div className="splash-mark">
        <p className="splash-kicker">Portfolio</p>
        <div className="splash-name-box">
          <p className="splash-name">{site.name}</p>
        </div>
        <div className="splash-load" aria-hidden>
          <svg className="splash-ring" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="20" />
            <circle className="splash-ring-arc" cx="26" cy="26" r="20" />
          </svg>
          <span className="splash-dots">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}
