"use client";

import Image from "next/image";
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
    <div
      className={`splash${leaving ? " is-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`${site.name}, ${site.splashRole}`}
    >
      <div className="splash-wash" aria-hidden />
      <div className="splash-mesh" aria-hidden />
      <span className="splash-orb is-mint" aria-hidden />
      <span className="splash-orb is-gold" aria-hidden />

      <div className="splash-mark">
        <Image
          src="/logo-rap.png"
          alt=""
          width={263}
          height={123}
          className="splash-logo"
          priority
        />
        <div className="splash-name-box">
          <p className="splash-name">{site.name}</p>
        </div>
        <p className="splash-role">{site.splashRole}</p>
        <div className="splash-load" aria-hidden>
          <div className="splash-dial">
            <svg className="splash-dial-face" viewBox="0 0 88 88">
              <g className="splash-ticks">
                {Array.from({ length: 24 }, (_, index) => {
                  const angle = (index / 24) * Math.PI * 2 - Math.PI / 2;
                  const inner = index % 6 === 0 ? 37.5 : 39.5;
                  return (
                    <line
                      key={index}
                      x1={44 + Math.cos(angle) * inner}
                      y1={44 + Math.sin(angle) * inner}
                      x2={44 + Math.cos(angle) * 42.5}
                      y2={44 + Math.sin(angle) * 42.5}
                    />
                  );
                })}
              </g>
              <circle className="splash-ring-track" cx="44" cy="44" r="32" />
              <circle className="splash-ring-arc" cx="44" cy="44" r="32" />
              <circle className="splash-ring-spin" cx="44" cy="44" r="23" />
            </svg>
            <div className="splash-dial-core">
              <svg className="splash-claw" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="22" r="3.2" />
                <path d="M16 19.2V12.4" />
                <path d="M16 12.6 8.8 7.4M16 12.6 23.2 7.4" />
                <path d="M8.8 7.4 6.6 10.2M23.2 7.4 25.4 10.2" />
              </svg>
              <span>RAP</span>
            </div>
          </div>
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
