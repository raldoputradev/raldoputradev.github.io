"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { SkillLogo } from "./SkillLogo";
import { skillIsInk, skillTone, SKILL_FILTERS, type SkillFilterId } from "@/lib/skill-mark";

export function SkillGrid({
  items,
  filters,
  learningTitle,
  learning,
}: {
  items: string[];
  filters: Record<SkillFilterId, string>;
  learningTitle: string;
  learning: string[];
}) {
  const [filter, setFilter] = useState<SkillFilterId>("all");
  const shown = useMemo(() => {
    const allow = SKILL_FILTERS[filter];
    if (!allow) {
      return items;
    }
    const set = new Set<string>(allow);
    return items.filter((item) => set.has(item));
  }, [filter, items]);

  return (
    <Reveal>
      <div className="skill-filters" role="tablist" aria-label={filters?.all ?? "Filter"}>
        {(Object.keys(SKILL_FILTERS) as SkillFilterId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={`skill-filter${filter === id ? " is-on" : ""}`}
            onClick={() => setFilter(id)}
          >
            {filters[id]}
          </button>
        ))}
      </div>
      <ul className="skill-tiles">
        {shown.map((item) => (
          <li
            key={item}
            className={`skill-tile${skillIsInk(item) ? " is-ink" : ""}`}
            style={{ color: skillTone(item) }}
            tabIndex={0}
            title={item}
            aria-label={item}
          >
            <span className="skill-mark">
              <SkillLogo name={item} />
            </span>
            <span className="skill-tile-name">{item}</span>
          </li>
        ))}
      </ul>
      {learning.length > 0 ? (
        <div className="skill-learning">
          <p className="skill-learning-title">{learningTitle}</p>
          <ul>
            {learning.map((item) => (
              <li
                key={item}
                className={`skill-tile is-learn${skillIsInk(item) ? " is-ink" : ""}`}
                style={{ color: skillTone(item) }}
                tabIndex={0}
                title={item}
                aria-label={item}
              >
                <span className="skill-mark">
                  <SkillLogo name={item} />
                </span>
                <span className="skill-tile-name">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Reveal>
  );
}
