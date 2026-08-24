"use client";

import { useEffect, useState } from "react";
import { waitForSplash } from "./AnimatedName";
import { isAuditClient } from "@/lib/audit";

export function TypewriterText({
  phrases,
  className = "",
  as: Tag = "p",
  startDelay = 400,
  typeMs = 42,
  deleteMs = 26,
  holdMs = 1600,
}: {
  phrases: string[];
  className?: string;
  as?: "span" | "h1" | "p";
  startDelay?: number;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}) {
  const list = phrases.filter(Boolean);
  const phraseKey = list.join("\u0000");
  const [shown, setShown] = useState(list[0] ?? "");

  useEffect(() => {
    const phrasesList = phraseKey.split("\u0000").filter(Boolean);
    if (phrasesList.length < 2) {
      setShown(phrasesList[0] ?? "");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || isAuditClient()) {
      setShown(phrasesList[0] ?? "");
      return;
    }

    let cancelled = false;
    let timer = 0;
    let stopSplashWait = () => {};
    let stopIdle = () => {};
    let phraseIndex = 0;
    let charIndex = Array.from(phrasesList[0] ?? "").length;
    let mode: "hold" | "delete" | "type" = "hold";
    setShown(phrasesList[0] ?? "");

    const step = () => {
      if (cancelled) {
        return;
      }

      const chars = Array.from(phrasesList[phraseIndex] ?? "");

      if (mode === "hold") {
        mode = "delete";
        timer = window.setTimeout(step, holdMs);
        return;
      }

      if (mode === "delete") {
        charIndex -= 1;
        setShown(chars.slice(0, Math.max(0, charIndex)).join(""));
        if (charIndex <= 0) {
          phraseIndex = (phraseIndex + 1) % phrasesList.length;
          mode = "type";
          timer = window.setTimeout(step, 180);
          return;
        }
        timer = window.setTimeout(step, deleteMs);
        return;
      }

      charIndex += 1;
      setShown(Array.from(phrasesList[phraseIndex] ?? "").slice(0, charIndex).join(""));
      if (charIndex >= Array.from(phrasesList[phraseIndex] ?? "").length) {
        mode = "hold";
        timer = window.setTimeout(step, holdMs);
        return;
      }
      timer = window.setTimeout(step, typeMs);
    };

    stopSplashWait = waitForSplash(() => {
      if (cancelled) {
        return;
      }
      const begin = () => {
        if (cancelled) {
          return;
        }
        timer = window.setTimeout(step, startDelay);
      };
      if (typeof window.requestIdleCallback === "function") {
        const idle = window.requestIdleCallback(begin, { timeout: 1800 });
        stopIdle = () => window.cancelIdleCallback(idle);
        return;
      }
      const late = window.setTimeout(begin, 400);
      stopIdle = () => window.clearTimeout(late);
    });
    return () => {
      cancelled = true;
      stopSplashWait();
      stopIdle();
      window.clearTimeout(timer);
    };
  }, [deleteMs, holdMs, phraseKey, startDelay, typeMs]);

  return (
    <Tag className={className} aria-label={list.join(" · ")}>
      {shown}
      {list.length > 1 ? <span className="type-caret" aria-hidden /> : null}
    </Tag>
  );
}
