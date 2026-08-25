"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, type Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import { ThemeToggle } from "./ThemeToggle";

const links = ["home", "about", "skills", "projects"] as const;
const sections = ["home", "about", "skills", "projects", "contact"] as const;

export function Header({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const lockRef = useRef<string | null>(null);

  const goTo = (id: string) => {
    setActive(id);
    lockRef.current = id;
    setOpen(false);
    window.setTimeout(() => {
      if (lockRef.current === id) {
        lockRef.current = null;
      }
    }, 900);
  };

  useEffect(() => {
    const pick = () => {
      if (lockRef.current) {
        return;
      }

      const offset = 112;
      let current: string = "home";
      for (const id of sections) {
        const node = document.getElementById(id);
        if (!node) {
          continue;
        }
        if (node.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && window.scrollY >= maxScroll - 28) {
        current = "contact";
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const hash = window.location.hash.replace("#", "");
    if (sections.includes(hash as (typeof sections)[number])) {
      setActive(hash);
    } else {
      pick();
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(pick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", pick);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", pick);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-nav">
      <div className={`site-nav-bar${open ? " is-open" : ""}`}>
        <a href="#home" className="site-nav-brand" onClick={() => goTo("home")}>
          <Image
            src="/logo-rap.png"
            alt={site.name}
            width={263}
            height={123}
            className="site-nav-logo"
            priority
          />
        </a>

        <nav className="site-nav-links" aria-label="Primary">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => goTo(id)}
              className={`nav-link ${active === id ? "is-active text-ink" : "hover:text-ink"}`}
            >
              {copy.nav[id]}
            </a>
          ))}
        </nav>

        <div className="site-nav-end">
          <ThemeToggle labels={copy.theme} />
          <LocaleSwitch locale={locale} />
          <a
            href="#contact"
            className={`site-nav-cta${active === "contact" ? " is-active" : ""}`}
            onClick={() => goTo("contact")}
          >
            {copy.nav.contact}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Menu"}
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
              onClick={() => goTo(id)}
              className={`site-nav-drawer-link${active === id ? " is-active" : ""}`}
            >
              {copy.nav[id]}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => goTo("contact")}
            className={`site-nav-drawer-cta${active === "contact" ? " is-active" : ""}`}
          >
            {copy.nav.contact}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
