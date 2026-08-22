"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Copy, Project } from "@/lib/i18n";

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
  const [zoomed, setZoomed] = useState(false);
  const statusLabel = {
    live: work.statusLive,
    study: work.statusStudy,
    soon: work.statusSoon,
  }[project.status];
  const image = project.images[activeImage];
  const portrait = image.height > image.width;
  const flip = index % 2 === 1;

  const close = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
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
  }, [zoomed, close]);

  return (
    <article className="card card-lift overflow-hidden p-5 sm:p-7">
      <div className={`grid gap-8 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
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

          <ul className="mt-5 space-y-2 text-sm text-muted">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <span className="text-accent">&rarr;</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
            {project.contributionTitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</p>

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

        <div>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-bg/60 ${
              portrait ? "flex justify-center py-4" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={`${project.name} — ${image.caption}`}
              width={image.width}
              height={image.height}
              className={`transition-transform duration-500 group-hover:scale-[1.02] ${
                portrait ? "h-[26rem] w-auto rounded-xl sm:h-[30rem]" : "h-auto w-full"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
              {image.tag}
            </span>
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {image.caption}
            <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              {image.placeholder ? work.placeholderNote : work.zoomHint}
            </span>
          </p>

          {project.images.length > 1 ? (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {project.images.map((item, position) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActiveImage(position)}
                    aria-label={item.caption}
                    title={item.tag}
                    className={`overflow-hidden rounded-lg border transition-all ${
                      position === activeImage
                        ? "border-accent opacity-100"
                        : "border-line opacity-55 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.caption}
                      width={item.width}
                      height={item.height}
                      className={`object-cover object-top ${
                        item.height > item.width ? "h-14 w-9" : "h-14 w-24"
                      }`}
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
          <Image
            src={image.src}
            alt={`${project.name} — ${image.caption}`}
            width={image.width}
            height={image.height}
            className={`rounded-xl border border-line object-contain ${
              portrait ? "h-auto max-h-[85vh] w-auto" : "h-auto max-h-[82vh] w-full max-w-6xl"
            }`}
          />
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
