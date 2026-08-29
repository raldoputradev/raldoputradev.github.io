"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./Icons";

type Theme = "dark" | "light";

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  window.localStorage.setItem("theme", next);
}

function buttonCenter(button: HTMLElement) {
  const rect = button.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

/** View Transition pakai snapshot root; di HP itu bergeser di bawah address bar. */
function snapshotShift() {
  try {
    const sheet = getComputedStyle(document.documentElement, "::view-transition");
    const left = Number.parseFloat(sheet.left);
    const top = Number.parseFloat(sheet.top);
    if ((Number.isFinite(left) && left !== 0) || (Number.isFinite(top) && top !== 0)) {
      return { x: -(left || 0), y: -(top || 0) };
    }
  } catch {
    /* older engines */
  }
  const view = window.visualViewport;
  if (!view) {
    return { x: 0, y: 0 };
  }
  return { x: view.offsetLeft, y: view.offsetTop };
}

export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? labels.toLight : labels.toDark;

  const toggle = async (event: MouseEvent<HTMLButtonElement>) => {
    const origin = buttonCenter(event.currentTarget);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canReveal = !reduce && typeof document.startViewTransition === "function";

    if (!canReveal) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    document.documentElement.classList.add("theme-revealing");
    const transition = document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });

    try {
      await transition.ready;
      const shift = snapshotShift();
      const x = origin.x + shift.x;
      const y = origin.y + shift.y;
      const width = Math.max(window.innerWidth, window.visualViewport?.width ?? 0) + Math.max(0, shift.x);
      const height = Math.max(window.innerHeight, window.visualViewport?.height ?? 0) + Math.max(0, shift.y);
      const xPct = (x / width) * 100;
      const yPct = (y / height) * 100;
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${xPct}% ${yPct}%)`, `circle(150vmax at ${xPct}% ${yPct}%)`],
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
