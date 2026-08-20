import { Reveal } from "./Reveal";
import type { Copy } from "@/lib/i18n";

export function SkillGrid({ groups }: { groups: Copy["skills"]["groups"] }) {
  return (
    <div className="quiet-panel overflow-hidden">
      {groups.map((group, index) => (
        <Reveal key={group.title} delay={index * 50}>
          <div className="skill-row">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl italic text-ink">{group.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-muted sm:justify-end">
              {group.items.map((item, position) => (
                <span key={item} className="flex items-center gap-3">
                  {position > 0 ? <span className="text-line">&middot;</span> : null}
                  <span className="transition-colors hover:text-gold">{item}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
