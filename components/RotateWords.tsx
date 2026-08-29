"use client";

import { useEffect, useState } from "react";
import { waitForSplash } from "./AnimatedName";
import { isAuditClient } from "@/lib/audit";

export function RotateWords({
  words,
  className = "",
  holdMs = 2200,
}: {
  words: string[];
  className?: string;
  holdMs?: number;
}) {
  const list = words.filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length < 2) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isAuditClient()) {
      return;
    }

    let timer = 0;
    const stopSplash = waitForSplash(() => {
      timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % list.length);
      }, holdMs);
    });

    return () => {
      stopSplash();
      window.clearInterval(timer);
    };
  }, [holdMs, list.length]);

  if (list.length === 0) {
    return null;
  }

  return (
    <span className={`hero-hello-role ${className}`.trim()} aria-label={list.join(" · ")}>
      <span key={list[index]} className="hero-hello-role-word">
        {list[index]}
      </span>
    </span>
  );
}
