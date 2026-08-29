import type { Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import Link from "next/link";

export function Footer({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const year = 2026;

  return (
    <footer className="site-close-foot">
      <div className="mx-auto max-w-6xl space-y-4 px-3.5 py-10 text-center sm:px-8">
        <p className="mx-auto max-w-2xl font-display text-base italic leading-relaxed text-muted sm:text-lg">
          “{copy.contact.quote}”
        </p>
        <p className="font-mono text-xs tracking-[0.08em] text-muted">
          <Link href="/id/" hrefLang="id" lang="id" className="hover:text-ink">
            Indonesia
          </Link>
          <span aria-hidden> · </span>
          <Link href="/en/" hrefLang="en" lang="en" className="hover:text-ink">
            English
          </Link>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          © {year} {copy.footer}
        </p>
      </div>
    </footer>
  );
}
