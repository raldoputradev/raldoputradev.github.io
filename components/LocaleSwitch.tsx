"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/site";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;

  const swap = (next: Locale) => {
    const seg = pathname.split("/").filter(Boolean);
    if (seg.length === 0) return `/${next}/`;
    seg[0] = next;
    return `/${seg.join("/")}/`;
  };

  return (
    <div className="lng" role="group" aria-label="Language">
      {(["id", "en"] as Locale[]).map((l) => (
        <a key={l} href={swap(l)} className={`lng-btn${locale === l ? " is-on" : ""}`} aria-current={locale === l ? "true" : undefined}>
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
