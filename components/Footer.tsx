import type { Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const year = 2026;

  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto max-w-6xl space-y-4 px-5 py-10 text-center sm:px-8">
        <p className="mx-auto max-w-2xl font-display text-base italic leading-relaxed text-muted sm:text-lg">
          “{copy.contact.quote}”
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          © {year} {copy.footer}
        </p>
      </div>
    </footer>
  );
}
