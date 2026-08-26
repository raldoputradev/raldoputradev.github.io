"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { Copy, Project } from "@/lib/i18n";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export function ProjectShowcase({
  project,
  index,
  work,
}: {
  project: Project;
  index: number;
  work: Copy["work"];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const skipZoom = useRef(false);
  const drag = useRef<{ x: number } | null>(null);
  const statusLabel = {
    live: work.statusLive,
    study: work.statusStudy,
    soon: work.statusSoon,
  }[project.status];
  const total = project.images.length;
  const image = project.images[activeImage];
  const portrait = image.height > image.width;
  const flip = index % 2 === 1;
  const many = total > 1;

  const go = useCallback(
    (delta: number) => {
      if (total < 2) {
        return;
      }
      setDirection(delta > 0 ? 1 : -1);
      setActiveImage((current) => (current + delta + total) % total);
    },
    [total],
  );

  const jump = (position: number) => {
    if (position === activeImage) {
      return;
    }
    setDirection(position > activeImage ? 1 : -1);
    setActiveImage(position);
  };

  const close = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        go(1);
      }
      if (event.key === "ArrowLeft") {
        go(-1);
      }
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close, go, zoomed]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) {
      return;
    }
    const dx = event.clientX - drag.current.x;
    drag.current = null;
    if (Math.abs(dx) > 48) {
      skipZoom.current = true;
      go(dx > 0 ? -1 : 1);
    }
  };

  const openZoom = () => {
    if (skipZoom.current) {
      skipZoom.current = false;
      return;
    }
    setZoomed(true);
  };

  return (
    <article className="card card-lift overflow-hidden p-5 sm:p-7">
      <div className={`grid gap-8 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="project-copy">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Project {String(index + 1).padStart(2, "0")}
            </p>
            <span className="rounded-full border border-accent-dim px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              {statusLabel}
            </span>
          </div>
          <h3 className="mt-3 font-display text-3xl italic text-ink">{project.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
            &mdash; {project.role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>

          <ul className="project-points">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="project-note">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              {project.contributionTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="pill">
                {item}
              </li>
            ))}
          </ul>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-ink"
            >
              {work.repoLink}
              {project.repoLabel ? <span className="text-muted">· {project.repoLabel}</span> : null}
            </a>
          ) : null}
        </div>

        <div className="project-gallery">
          <div
            className={`project-stage${portrait ? " is-portrait" : ""}`}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            <button type="button" onClick={openZoom} className="project-frame">
              <Image
                key={`${image.src}-${direction}`}
                src={image.src}
                alt={`${project.name} — ${image.caption}`}
                width={image.width}
                height={image.height}
                className={`project-slide ${direction < 0 ? "is-prev" : "is-next"} ${
                  portrait ? "is-tall" : ""
                }`}
                loading="lazy"
              />
              <span className="project-tag">{image.tag}</span>
            </button>

            {many ? (
              <>
                <button
                  type="button"
                  className="project-arrow is-prev"
                  aria-label={work.prevImage}
                  onClick={() => go(-1)}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  className="project-arrow is-next"
                  aria-label={work.nextImage}
                  onClick={() => go(1)}
                >
                  <ChevronRightIcon />
                </button>
                <p className="project-count">
                  {String(activeImage + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
              </>
            ) : null}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            {image.caption}
            <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              {image.placeholder ? work.placeholderNote : work.zoomHint}
            </span>
          </p>

          {many ? (
            <div className="mt-4">
              <div className="project-thumbs">
                {project.images.map((item, position) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => jump(position)}
                    aria-label={item.caption}
                    aria-current={position === activeImage ? "true" : undefined}
                    title={item.tag}
                    className={`project-thumb${position === activeImage ? " is-active" : ""}`}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      className={item.height > item.width ? "is-tall" : ""}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {work.galleryHint}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.caption}
          onClick={close}
          className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-bg/95 p-4 sm:p-8"
        >
          {many ? (
            <button
              type="button"
              className="project-arrow is-prev is-zoom"
              aria-label={work.prevImage}
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeftIcon />
            </button>
          ) : null}
          <Image
            key={`zoom-${image.src}`}
            src={image.src}
            alt={`${project.name} — ${image.caption}`}
            width={image.width}
            height={image.height}
            className={`project-slide ${direction < 0 ? "is-prev" : "is-next"} rounded-xl border border-line object-contain ${
              portrait ? "h-auto max-h-[85vh] w-auto" : "h-auto max-h-[82vh] w-full max-w-6xl"
            }`}
          />
          {many ? (
            <button
              type="button"
              className="project-arrow is-next is-zoom"
              aria-label={work.nextImage}
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
            >
              <ChevronRightIcon />
            </button>
          ) : null}
          <p className="max-w-2xl text-center text-sm text-muted">
            {image.caption}
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              esc &middot; {work.closeLabel}
            </span>
          </p>
        </div>
      ) : null}
    </article>
  );
}
