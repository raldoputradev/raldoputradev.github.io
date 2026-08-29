"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import type { Copy, Project } from "@/lib/i18n";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

type View = { scale: number; x: number; y: number };

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function clampView(next: View, width: number, height: number): View {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
  const maxX = ((scale - 1) * width) / 2;
  const maxY = ((scale - 1) * height) / 2;
  return {
    scale,
    x: Math.min(maxX, Math.max(-maxX, next.x)),
    y: Math.min(maxY, Math.max(-maxY, next.y)),
  };
}

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
  const goPrev = useCallback(() => go(-1), [go]);
  const goNext = useCallback(() => go(1), [go]);

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
        <ProjectLightbox
          projectName={project.name}
          image={image}
          many={many}
          work={work}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      ) : null}
    </article>
  );
}

function ProjectLightbox({
  projectName,
  image,
  many,
  work,
  onClose,
  onPrev,
  onNext,
}: {
  projectName: string;
  image: Project["images"][number];
  many: boolean;
  work: Copy["work"];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<View>({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; scale: number; x: number; y: number } | null>(null);
  const pan = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const moved = useRef(false);
  const pinched = useRef(false);
  const lastTap = useRef(0);

  const applyView = (next: View) => {
    const stage = stageRef.current;
    const clamped = stage
      ? clampView(next, stage.clientWidth, stage.clientHeight)
      : { scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale)), x: next.x, y: next.y };
    viewRef.current = clamped;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transform = `translate3d(${clamped.x}px, ${clamped.y}px, 0) scale(${clamped.scale})`;
    }
  };

  const resetView = useCallback(() => {
    applyView({ scale: 1, x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetView();
  }, [image.src, resetView]);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        onNext();
      }
      if (event.key === "ArrowLeft") {
        onPrev();
      }
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 0.9 : 1.1;
      applyView({
        ...viewRef.current,
        scale: viewRef.current.scale * factor,
      });
    };
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const onStagePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    moved.current = false;
    if (pointers.current.size === 1) {
      pan.current = {
        x: event.clientX,
        y: event.clientY,
        ox: viewRef.current.x,
        oy: viewRef.current.y,
      };
    }
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        scale: viewRef.current.scale,
        x: viewRef.current.x,
        y: viewRef.current.y,
      };
      pan.current = null;
      pinched.current = true;
    }
  };

  const onStagePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) {
      return;
    }
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch.current && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      applyView({
        scale: pinch.current.scale * (distance / pinch.current.distance),
        x: pinch.current.x,
        y: pinch.current.y,
      });
      moved.current = true;
      return;
    }
    if (!pan.current) {
      return;
    }
    const dx = event.clientX - pan.current.x;
    const dy = event.clientY - pan.current.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      moved.current = true;
    }
    if (viewRef.current.scale > 1.02) {
      applyView({
        scale: viewRef.current.scale,
        x: pan.current.ox + dx,
        y: pan.current.oy + dy,
      });
    }
  };

  const onStagePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointers.current.get(event.pointerId);
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) {
      pinch.current = null;
    }
    if (pointers.current.size === 1) {
      const remaining = [...pointers.current.values()][0];
      pan.current = remaining
        ? { x: remaining.x, y: remaining.y, ox: viewRef.current.x, oy: viewRef.current.y }
        : null;
      return;
    }
    pan.current = null;

    if (pinched.current) {
      if (pointers.current.size === 0) {
        pinched.current = false;
      }
      return;
    }

    if (start && viewRef.current.scale <= 1.02) {
      const dx = event.clientX - start.x;
      if (Math.abs(dx) > 48) {
        if (dx > 0) {
          onPrev();
        } else {
          onNext();
        }
        return;
      }
    }

    if (moved.current || pointers.current.size > 0) {
      return;
    }

    const now = Date.now();
    if (now - lastTap.current < 280) {
      lastTap.current = 0;
      if (viewRef.current.scale > 1.05) {
        resetView();
      } else {
        applyView({ scale: 2.4, x: 0, y: 0 });
      }
      return;
    }
    lastTap.current = now;
  };

  return createPortal(
    <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={image.caption}>
      <button type="button" className="project-lightbox-close" aria-label={work.closeLabel} onClick={onClose}>
        <CloseIcon />
      </button>
      <div
        ref={stageRef}
        className="project-lightbox-stage"
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={onStagePointerUp}
        onPointerCancel={onStagePointerUp}
      >
        {many ? (
          <button
            type="button"
            className="project-arrow is-prev is-zoom"
            aria-label={work.prevImage}
            onClick={(event) => {
              event.stopPropagation();
              resetView();
              onPrev();
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <ChevronLeftIcon />
          </button>
        ) : null}
        <div ref={canvasRef} className="project-lightbox-canvas">
          <Image
            key={`zoom-${image.src}`}
            src={image.src}
            alt={`${projectName} — ${image.caption}`}
            width={image.width}
            height={image.height}
            className="project-lightbox-image"
            sizes="100vw"
            draggable={false}
            priority
          />
        </div>
        {many ? (
          <button
            type="button"
            className="project-arrow is-next is-zoom"
            aria-label={work.nextImage}
            onClick={(event) => {
              event.stopPropagation();
              resetView();
              onNext();
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <ChevronRightIcon />
          </button>
        ) : null}
      </div>
      <div className="project-lightbox-meta">
        <p className="text-sm text-muted">{image.caption}</p>
        <p className="project-lightbox-hint">
          {work.zoomViewerHint}
        </p>
      </div>
    </div>,
    document.body,
  );
}
