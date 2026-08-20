import Image from "next/image";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { getCopy } from "@/lib/i18n";

export function PortraitCard({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);

  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-2xl border border-line/70 bg-raise/50" />
      <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-xl border border-line/70 bg-raise/50" />
      <div className="portrait-shell">
        <div className="portrait-stage relative aspect-[4/5] overflow-hidden rounded-[22px]">
          <Image
            src="/rayendra-aldo-putra.png"
            alt={site.name}
            width={768}
            height={768}
            priority
            className="absolute bottom-0 left-1/2 w-[102%] -translate-x-1/2"
          />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-bg/85 px-3.5 py-1.5">
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
