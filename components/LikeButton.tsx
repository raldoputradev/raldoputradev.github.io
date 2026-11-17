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
    timers.current.push(window.setTimeout(() => setBurst((b) => (b === id ? 0 : b)), 3200));
  };

  const parts = Array.from({ length: 18 }, (_, i) => {
    const colors = ["#f87171", "#ef4444", "#fb7185", "#fda4af", "#f472b6"];
    return {
      "--dx": `${(Math.random() - 0.5) * 110}px`,
      "--dy": `${-(140 + Math.random() * 220)}px`,
      "--dl": `${i * 90 + Math.random() * 60}ms`,
      "--dur": `${1.5 + Math.random() * 0.9}s`,
      "--rot": `${Math.random() * 60 - 30}deg`,
      "--sz": `${10 + Math.random() * 12}px`,
      "--c": colors[i % colors.length],
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
        {burst > 0 && (
          <>
            <i key={`ring-${burst}`} className="like-ring" />
            {parts.map((p, i) => (
              <svg
                key={`${burst}-${i}`}
                className="like-part"
                style={p}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  d="M12 21s-7.5-4.9-10-9.2C.4 8.6 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.4h4c.9-1.3 2.3-2.4 4.3-2.4 3.4 0 5.3 3.6 3.7 6.8C19.5 16.1 12 21 12 21z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </>
        )}
      </span>
      <span className="like-label">{label}</span>
    </button>
  );
}
