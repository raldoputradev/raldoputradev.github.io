import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { getCopy } from "@/lib/i18n";

export function PortraitCard({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);

  return (
    <div className="relative mx-auto mt-2 flex w-[9.25rem] flex-col items-center sm:mt-0 sm:w-full sm:max-w-[17rem]">
      <div className="portrait-shell w-full">
        <div className="portrait-stage relative aspect-square overflow-hidden rounded-full">
          <img
            src="/rayendra-aldo-putra-hero.webp?v=2"
            alt={site.name}
            width={400}
            height={400}
            decoding="async"
            loading="lazy"
            fetchPriority="low"
            className="h-full w-full object-cover object-[center_12%]"
          />
        </div>
      </div>
      <div className="mt-4 hidden items-center gap-2 rounded-full border border-line bg-bg/85 px-3.5 py-1.5 sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-ink">
          {copy.hero.status}
        </span>
      </div>
    </div>
  );
}
