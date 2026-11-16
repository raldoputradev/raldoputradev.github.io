"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: "up" | "left" | "right" | "zoom" | "fade";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { "--d": `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} data-v={variant} style={style} className={`rv ${className}`}>
      {children}
    </Tag>
  );
}
