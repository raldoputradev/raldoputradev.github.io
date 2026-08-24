"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { isAuditClient } from "@/lib/audit";

const MODES = ["rise", "wave", "wipe", "pop"] as const;

type Mode = (typeof MODES)[number];
type Phase = "in" | "hold" | "out";

function whenIdle(run: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(run, { timeout: 1800 });
    return () => window.cancelIdleCallback(id);
  }
  const timer = window.setTimeout(run, 400);
  return () => window.clearTimeout(timer);
}

export function waitForSplash(onReady: () => void) {
  if (document.documentElement.dataset.splash !== "play") {
    onReady();
    return () => {};
  }

  const observer = new MutationObserver(() => {
    if (document.documentElement.dataset.splash !== "play") {
      observer.disconnect();
      onReady();
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-splash"],
  });
  return () => observer.disconnect();
}

export function AnimatedName({
  text,
  className = "",
  as: Tag = "p",
  loop = false,
  waitSplash = false,
}: {
  text: string;
  className?: string;
  as?: "p" | "h1" | "span";
  loop?: boolean;
  waitSplash?: boolean;
}) {
  const words = text.split(" ").filter(Boolean);
  const [mode, setMode] = useState<Mode>("rise");
  const [phase, setPhase] = useState<Phase>("in");
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const quiet = () => media.matches || isAuditClient();
    const sync = () => setReduce(quiet());
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) {
      return;
    }

    const start = () => whenIdle(() => setReady(true));
    if (waitSplash) {
      let stopIdle = () => {};
      const stopSplash = waitForSplash(() => {
        stopIdle = start();
      });
      return () => {
        stopSplash();
        stopIdle();
      };
    }
    return start();
  }, [reduce, waitSplash]);

  useEffect(() => {
    if (!ready || reduce || !loop) {
      return;
    }

    let modeIndex = 0;
    let step = 0;

    const cycle = () => {
      step = window.setTimeout(() => {
        setPhase("out");
        step = window.setTimeout(() => {
          modeIndex = (modeIndex + 1) % MODES.length;
          setMode(MODES[modeIndex]);
          setPhase("in");
          step = window.setTimeout(() => {
            setPhase("hold");
            cycle();
          }, 900);
        }, 400);
      }, 2600);
    };

    step = window.setTimeout(() => {
      setPhase("hold");
      cycle();
    }, 900);

    return () => window.clearTimeout(step);
  }, [loop, ready, reduce]);

  if (!ready || reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  let letterIndex = 0;

  return (
    <Tag className={`${className} name-anim is-${mode} is-${phase}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span className="name-word" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((letter, index) => {
            const i = letterIndex;
            letterIndex += 1;
            return (
              <span className="name-letter" key={`${word}-${index}`} style={{ "--i": i } as CSSProperties}>
                {letter}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
