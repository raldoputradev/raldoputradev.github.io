"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import type { Copy, Project } from "@/lib/i18n";
import { workHref } from "@/lib/paths";
import type { Locale } from "@/lib/site";
import { isAuditClient } from "@/lib/audit";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export function WorkGallery({
  projects,
  locale,
  work,
}: {
  projects: Project[];
  locale: Locale;
  work: Copy["work"];
}) {
  const router = useRouter();
  const askTitleId = useId();
  const deck = projects.length === 2 ? [...projects, ...projects] : projects;
  const total = deck.length;
  const [active, setActive] = useState(0);
  const [ask, setAsk] = useState<Project | null>(null);
  const drag = useRef<{ x: number } | null>(null);
  const pause = useRef(false);
  const dragged = useRef(false);

  const go = useCallback(
    (delta: number) => {
      if (total < 2) {
        return;
      }
      setActive((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total < 2 || isAuditClient()) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      if (!pause.current && !ask && !document.hidden) {
        go(1);
      }
    }, 4800);
    return () => window.clearInterval(timer);
  }, [ask, go, total]);

  useEffect(() => {
    if (!ask) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAsk(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ask]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX };
    pause.current = true;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) {
      return;
    }
    const dx = event.clientX - drag.current.x;
    drag.current = null;
    window.setTimeout(() => {
      pause.current = false;
    }, 2400);
    if (Math.abs(dx) < 42) {
      dragged.current = false;
      return;
    }
    dragged.current = true;
    go(dx < 0 ? 1 : -1);
  };

  const current = deck[active];
  const statusLabel = current
    ? { live: work.statusLive, study: work.statusStudy, soon: work.statusSoon }[current.status]
    : work.statusSoon;

  if (total === 0) {
    return null;
  }

  return (
    <div
      className="work-gallery"
      onMouseEnter={() => {
        pause.current = true;
      }}
      onMouseLeave={() => {
        pause.current = false;
      }}
    >
      <div
        className="work-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {deck.map((project, index) => {
          const offset = ((index - active + total) % total + total) % total;
          const wrapped = offset > total / 2 ? offset - total : offset;
          const slot =
            wrapped === 0 ? "is-center" : wrapped === -1 ? "is-prev" : wrapped === 1 ? "is-next" : "is-far";
          const cover = project.images.find((image) => image.width >= image.height) ?? project.images[0];

          return (
            <button
              key={`${project.slug}-${index}`}
              type="button"
              className={`work-poster ${slot}`}
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                if (slot === "is-center") {
                  setAsk(project);
                  return;
                }
                if (slot === "is-next") {
                  go(1);
                  return;
                }
                if (slot === "is-prev") {
                  go(-1);
                }
              }}
              aria-label={
                slot === "is-center"
                  ? `${work.ask} ${project.name}`
                  : slot === "is-prev"
                    ? `${work.prevProject}: ${project.name}`
                    : `${work.nextProject}: ${project.name}`
              }
              aria-hidden={slot === "is-far" ? true : undefined}
              tabIndex={slot === "is-far" ? -1 : 0}
              aria-current={index === active ? "true" : undefined}
            >
              {cover ? (
                <Image
                  src={cover.src}
                  alt={cover.caption}
                  width={cover.width}
                  height={cover.height}
                  sizes="(min-width: 768px) 42rem, 86vw"
                />
              ) : null}
              <span className="work-poster-meta">{project.name}</span>
            </button>
          );
        })}
      </div>

      {total > 1 ? (
        <div className="work-swipe">
          <button type="button" className="work-swipe-dir" onClick={() => go(-1)} aria-label={work.prevProject}>
            <ChevronLeftIcon />
          </button>
          <span>{work.swipe}</span>
          <button type="button" className="work-swipe-dir" onClick={() => go(1)} aria-label={work.nextProject}>
            <ChevronRightIcon />
          </button>
        </div>
      ) : null}

      {current ? (
        <div className="work-caption">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {current.role} · {statusLabel}
          </p>
          <h3 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">{current.name}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{current.summary}</p>
          <button type="button" className="work-open" onClick={() => setAsk(current)}>
            {work.open} →
          </button>
        </div>
      ) : null}

      {ask ? (
        <div className="cv-soon-layer" role="presentation" onClick={() => setAsk(null)}>
          <div
            className="cv-soon-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={askTitleId}
            onClick={(event) => event.stopPropagation()}
          >
            <p id={askTitleId} className="cv-soon-title">
              {work.ask}
            </p>
            <p className="cv-soon-copy">{ask.name}</p>
            <div className="work-ask-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setAsk(null)}>
                {work.askCancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push(workHref(locale, ask.slug))}
              >
                {work.askOpen}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
