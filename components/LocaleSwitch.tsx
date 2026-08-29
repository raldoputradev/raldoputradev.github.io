"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/site";

function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${next}/`;
  }
  segments[0] = next;
  return `/${segments.join("/")}/`;
}

function TranslateIcon() {
  return (
    <span className="translate-mark" aria-hidden>
      <span className="translate-tile translate-tile-wen">文</span>
      <span className="translate-tile translate-tile-a">A</span>
    </span>
  );
}

function FlagID() {
  return (
    <span className="lang-flag" aria-hidden>
      <i className="lang-flag-id-red" />
      <i className="lang-flag-id-white" />
    </span>
  );
}

function FlagGB() {
  return (
    <span className="lang-flag" aria-hidden>
      <svg viewBox="15 0 30 30" className="lang-flag-svg" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="60" height="30" fill="#012169" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="2" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </svg>
    </span>
  );
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointer = (event: PointerEvent) => {
      if (!box.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (next: Locale) => {
    setOpen(false);
    if (next === locale) {
      return;
    }
  };

  return (
    <div className="lang-switch" ref={box}>
      <button
        type="button"
        className="lang-switch-btn"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={locale === "id" ? "Pilih bahasa" : "Choose language"}
        onClick={() => setOpen((value) => !value)}
      >
        <TranslateIcon />
      </button>
      {open ? (
        <div className="lang-bubble" role="listbox" aria-label={locale === "id" ? "Bahasa" : "Language"}>
          <Link
            href={`${swapLocale(pathname, "id")}${hash}`}
            hrefLang="id"
            lang="id"
            role="option"
            aria-selected={locale === "id"}
            className={locale === "id" ? "is-on" : ""}
            onClick={() => go("id")}
          >
            <FlagID />
            Indonesia
          </Link>
          <Link
            href={`${swapLocale(pathname, "en")}${hash}`}
            hrefLang="en"
            lang="en"
            role="option"
            aria-selected={locale === "en"}
            className={locale === "en" ? "is-on" : ""}
            onClick={() => go("en")}
          >
            <FlagGB />
            English
          </Link>
        </div>
      ) : null}
    </div>
  );
}
