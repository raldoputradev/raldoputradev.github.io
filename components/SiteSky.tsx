"use client";

import { useEffect } from "react";

export function SiteSky() {
  useEffect(() => {
    const sync = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const audit = document.documentElement.dataset.audit === "1";
      const compact = window.innerWidth < 1024;
      document.documentElement.dataset.sky =
        document.hidden || reduce || audit || compact ? "idle" : "run";
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div className="site-sky" aria-hidden>
      <svg className="site-sky-orbit" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
        <g className="site-sky-tracks">
          <ellipse cx="620" cy="360" rx="640" ry="260" pathLength="1000" />
          <ellipse cx="820" cy="500" rx="520" ry="200" pathLength="1000" />
          <ellipse cx="540" cy="520" rx="400" ry="150" pathLength="1000" />
          <path d="M-40 210 C 180 140, 360 280, 560 230 S 980 90, 1440 180" pathLength="1000" />
          <path d="M-40 640 C 220 560, 480 720, 760 640 S 1120 520, 1440 610" pathLength="1000" />
          <path d="M-20 430 C 260 480, 520 360, 820 430 S 1180 510, 1460 400" pathLength="1000" />
        </g>
        <g className="site-sky-snakes">
          <ellipse className="is-a" cx="620" cy="360" rx="640" ry="260" pathLength="1000" />
          <path className="is-d" d="M-40 210 C 180 140, 360 280, 560 230 S 980 90, 1440 180" pathLength="1000" />
          <path className="is-e" d="M-40 640 C 220 560, 480 720, 760 640 S 1120 520, 1440 610" pathLength="1000" />
        </g>
      </svg>
    </div>
  );
}
