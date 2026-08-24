"use client";

import { useEffect, useState } from "react";
import { type Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

const links = ["home", "about", "skills", "projects"] as const;
const sections = ["home", "about", "skills", "projects", "contact"] as const;

export function Header({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const start = () => {
      const nodes = sections
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node));
      if (!nodes.length) {
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const id = visible[0]?.target.id;
          if (id) {
            setActive(id);
          }
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.5, 1] },
      );

      nodes.forEach((node) => observer?.observe(node));
    };

    let idleId = 0;
    let usedRic = false;
    if (typeof window.requestIdleCallback === "function") {
      usedRic = true;
      idleId = window.requestIdleCallback(start, { timeout: 2000 });
    } else {
      idleId = window.setTimeout(start, 400);
    }

    return () => {
      if (usedRic) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      observer?.disconnect();
    };
  }, []);

  return (
    <header className="site-nav">
      <div className={`site-nav-bar${open ? " is-open" : ""}`}>
        <a href="#home" className="site-nav-brand" onClick={() => setOpen(false)}>
          <span className="site-nav-name">{locale === "en" ? "Portfolio" : "Portofolio"}</span>
        </a>

        <nav className="site-nav-links" aria-label="Primary">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${active === id ? "is-active text-ink" : "hover:text-ink"}`}
            >
              {copy.nav[id]}
            </a>
          ))}
        </nav>

        <div className="site-nav-end">
          <ThemeToggle labels={copy.theme} />
          <LocaleSwitch locale={locale} />
          <a href="#contact" className="site-nav-cta" onClick={() => setOpen(false)}>
            {copy.nav.contact}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Menu"
            aria-controls={open ? "mobile-nav" : undefined}
            className="site-nav-menu md:hidden"
          >
            <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="site-nav-drawer md:hidden">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-2.5 transition-colors ${
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
