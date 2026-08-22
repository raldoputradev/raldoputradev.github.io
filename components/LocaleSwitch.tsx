"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/site";

function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${next}/`;
  }
  segments[0] = next;
  return `/${segments.join("/")}/`;
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}/`;
  const router = useRouter();
  const next: Locale = locale === "id" ? "en" : "id";
  const href = swapLocale(pathname, next);

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => router.push(`${href}${window.location.hash}`)}
      aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <span className={`lang-toggle-thumb ${locale === "en" ? "is-en" : ""}`} />
      <span className={locale === "id" ? "is-on" : ""}>ID</span>
      <span className={locale === "en" ? "is-on" : ""}>EN</span>
    </button>
  );
}
