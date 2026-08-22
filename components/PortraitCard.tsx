import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { getCopy } from "@/lib/i18n";

export function PortraitCard({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);

  return (
    <div className="relative mx-auto mt-2 w-[9.25rem] sm:mt-0 sm:w-full sm:max-w-xs lg:max-w-sm">
      <div className="absolute -right-3 -top-3 hidden h-16 w-16 rounded-2xl border border-line/70 bg-raise/50 sm:block" />
      <div className="absolute -bottom-3 -left-3 hidden h-12 w-12 rounded-xl border border-line/70 bg-raise/50 sm:block" />
      <div className="portrait-shell">
        <div className="portrait-stage relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[22px]">
          <img
            src="/rayendra-aldo-putra-hero.webp"
            alt={site.name}
            width={400}
            height={400}
            decoding="async"
            className="w-full"
          />
          <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-bg/85 px-3.5 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-ink">
              {copy.hero.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
