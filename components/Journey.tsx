"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { Copy } from "@/lib/i18n";

type JourneyItem = Copy["journey"]["items"][number];

type Era = {
  year: string;
  items: { item: JourneyItem; side: "is-left" | "is-right" }[];
};

function kindFromTag(tag: string) {
  const value = tag.toLowerCase();
  if (value.includes("mekanikal") || value.includes("mechanical")) {
    return "mechanical";
  }
  if (value.includes("organisasi") || value.includes("organization")) {
    return "org";
  }
  if (value.includes("pendidikan") || value.includes("education")) {
    return "education";
  }
  return "project";
}

function groupEras(items: JourneyItem[]): Era[] {
  const eras: Era[] = [];
  for (const item of items) {
    const last = eras[eras.length - 1];
    if (last?.year === item.year) {
      last.items.push({ item, side: "is-left" });
    } else {
      eras.push({ year: item.year, items: [{ item, side: "is-left" }] });
    }
  }

  return eras.map((era, eraIndex) => ({
    ...era,
    items: era.items.map((entry, index) => {
      const side =
        era.items.length === 1
          ? eraIndex % 2 === 0
            ? "is-right"
            : "is-left"
          : index % 2 === 0
            ? "is-left"
            : "is-right";
      return { ...entry, side };
    }),
  }));
}

export function Journey({ copy }: { copy: Copy["journey"] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const eras = useMemo(() => groupEras(copy.items), [copy.items]);
  const last = Math.max(eras.length - 1, 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let frame = 0;
    const measure = () => {
      const rect = root.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.38;
      const travel = Math.max(rect.height - view * 0.22, 1);
      const next = Math.min(1, Math.max(0, (start - rect.top) / travel));
      setProgress((prev) => (Math.abs(prev - next) < 0.008 ? prev : next));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="journey" className="journey-band mx-auto max-w-6xl scroll-mt-8 px-3.5 py-20 sm:px-8">
      <Reveal>
        <SectionHeading
          kicker={copy.kicker}
          lead={copy.titleLead}
          accent={copy.titleAccent}
          blurb={copy.blurb}
          center
        />
      </Reveal>
      <div ref={rootRef} className="journey-story mt-14">
        <svg className="journey-spine" viewBox="0 0 32 1000" preserveAspectRatio="none" aria-hidden>
          <path
            className="journey-spine-track"
            d="M16 8 C 2 90, 30 180, 16 270 S 2 450, 16 540 S 30 720, 16 810 S 2 930, 16 992"
            pathLength="1000"
          />
          <path
            className="journey-spine-fill"
            d="M16 8 C 2 90, 30 180, 16 270 S 2 450, 16 540 S 30 720, 16 810 S 2 930, 16 992"
            pathLength="1000"
            style={{ strokeDashoffset: 1000 - progress * 1000 }}
          />
          <path
            className="journey-spine-snake"
            d="M16 8 C 2 90, 30 180, 16 270 S 2 450, 16 540 S 30 720, 16 810 S 2 930, 16 992"
            pathLength="1000"
          />
        </svg>
        <ol className="journey-eras">
          {eras.map((era, eraIndex) => {
            const reached = last <= 0 ? progress > 0.04 : progress >= eraIndex / last - 0.08;
            return (
              <li key={era.year} className={`journey-era${reached ? " is-on" : ""}`}>
                <div className="journey-era-year">
                  <span>{era.year}</span>
                </div>
                {era.items.map(({ item, side }) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className={`journey-card ${side}`}
                    data-kind={kindFromTag(item.tag)}
                  >
                    <p className="journey-tag">{item.tag}</p>
                    <p className="journey-range">{item.range}</p>
                    <h3 className="journey-title">{item.title}</h3>
                    <p className="journey-place">{item.place}</p>
                    <p className="journey-text">{item.text}</p>
                    {item.stack.length > 0 ? (
                      <ul className="journey-stack">
                        {item.stack.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
