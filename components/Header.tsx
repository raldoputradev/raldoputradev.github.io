"use client";

import { useEffect, useState } from "react";
import { site, type Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

const sections = ["home", "about", "skills", "projects", "contact"] as const;

export function Header({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#home"
          className="font-display text-xl italic tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.shortName}.
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center gap-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-muted md:flex lg:gap-7">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${active === id ? "is-active text-ink" : "hover:text-ink"}`}
              >
                {copy.nav[id]}
              </a>
            ))}
          </nav>

          <div className="hidden h-5 w-px bg-line md:block" />

          <ThemeToggle labels={copy.theme} />
          <LocaleSwitch locale={locale} />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Menu"
            aria-controls={open ? "mobile-nav" : undefined}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-full border border-line md:hidden"
          >
            <span
              className={`h-px w-4 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-line/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted md:hidden">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 transition-colors ${
                active === id ? "bg-raise text-ink" : "hover:bg-raise/60 hover:text-ink"
              }`}
            >
              {copy.nav[id]}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
