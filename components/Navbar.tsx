"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, type Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";
import { LocaleSwitch } from "./LocaleSwitch";

const links = ["home", "about", "focus", "skills", "projects", "certs", "contact"] as const;

export function Navbar({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const pathname = usePathname() || `/${locale}/`;
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);
  const lockRef = useRef<string | null>(null);

  const goTo = (id: string) => {
    setActive(id);
    lockRef.current = id;
    setOpen(false);
    window.setTimeout(() => {
      if (lockRef.current === id) lockRef.current = null;
    }, 900);
  };

  useEffect(() => {
    const pick = () => {
      if (!lockRef.current) {
        const offset = window.innerHeight * 0.42;
        let current = "home";
        for (const id of links) {
          const node = document.getElementById(id);
          if (node && node.getBoundingClientRect().top - offset <= 0) current = id;
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && window.scrollY >= max - 28) current = "contact";
        setActive((prev) => (prev === current ? prev : current));
      }
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      }
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const items = links.map((id) => (
    <a
      key={id}
      href={homeHref(locale, id)}
      onClick={() => goTo(id)}
      className={`nv-link${active === id ? " is-on" : ""}`}
    >
      {copy.nav[id]}
    </a>
  ));

  return (
    <header className={`nv${scrolled ? " is-scrolled" : ""}`}>
      <span ref={barRef} className="nv-progress" aria-hidden />
      <div className="nv-inner">
        <a href={homeHref(locale, "home")} className="nv-brand" onClick={() => goTo("home")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/rap-logo.png" alt={site.name} className="nv-logo" />
          <span className="sr-only">{site.name}</span>
        </a>
        <nav className="nv-links" aria-label="Primary">
          {items}
        </nav>
        <div className="nv-side">
          <a href={homeHref(locale, "contact")} className="nv-hire" onClick={() => goTo("contact")}>
            {copy.nav.hire}
          </a>
          <LocaleSwitch locale={locale} />
          <button
            type="button"
            className="nv-burger"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nv-bar${open ? " is-top" : ""}`} />
            <span className={`nv-bar${open ? " is-bot" : ""}`} />
          </button>
        </div>
      </div>
      {open ? <nav className="nv-drawer">{items}</nav> : null}
    </header>
  );
}
