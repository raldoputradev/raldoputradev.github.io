"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

const KEY = "rap-liked";

export function LikeButton({ locale }: { locale: Locale }) {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setLiked(localStorage.getItem(KEY) === "1");
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const label = liked
    ? locale === "en"
      ? "Thank you!"
      : "Terima kasih!"
    : locale === "en"
      ? "Like this site?"
      : "Suka situs ini?";

  const fire = () => {
    if (!liked) {
      setLiked(true);
      localStorage.setItem(KEY, "1");
    }
    const id = burst + 1;
    setBurst(id);
    timers.current.push(window.setTimeout(() => setBurst((b) => (b === id ? 0 : b)), 900));
  };

  const parts = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
    const d = 44 + Math.random() * 34;
    return {
      "--dx": `${Math.cos(a) * d}px`,
      "--dy": `${Math.sin(a) * d - 22}px`,
      "--dl": `${Math.random() * 120}ms`,
      "--rot": `${Math.random() * 120 - 60}deg`,
    } as React.CSSProperties;
  });

  return (
    <button
      type="button"
      onClick={fire}
      className={`like-btn${liked ? " is-liked" : ""}`}
      aria-pressed={liked}
      aria-label={label}
    >
      <span className="like-heart" aria-hidden>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M12 21s-7.5-4.9-10-9.2C.4 8.6 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.4h4c.9-1.3 2.3-2.4 4.3-2.4 3.4 0 5.3 3.6 3.7 6.8C19.5 16.1 12 21 12 21z"
            fill="currentColor"
          />
        </svg>
        {burst > 0 &&
          parts.map((p, i) => <i key={`${burst}-${i}`} className="like-part" style={p} />)}
      </span>
      <span className="like-label">{label}</span>
    </button>
  );
}
