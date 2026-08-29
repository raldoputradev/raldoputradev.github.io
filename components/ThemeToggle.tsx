"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./Icons";

type Theme = "dark" | "light";

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  window.localStorage.setItem("theme", next);
}

export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? labels.toLight : labels.toDark;

  const toggle = async (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canReveal = !reduce && typeof document.startViewTransition === "function";

    if (!canReveal) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.documentElement.classList.add("theme-revealing");
    const transition = document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 720,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      await transition.finished;
    } finally {
      document.documentElement.classList.remove("theme-revealing");
    }
  };

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={label} title={label}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
