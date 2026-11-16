"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/i18n";
import type { Locale } from "@/lib/site";
import { stackIcon } from "@/lib/stack-icons";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectTabs({
  projects,
  locale,
  statusLive,
  statusStudy,
  statusSoon,
  open,
}: {
  projects: Project[];
  locale: Locale;
  statusLive: string;
  statusStudy: string;
  statusSoon: string;
  open: string;
}) {
  const [active, setActive] = useState(0);
  const [img, setImg] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const p = projects[active];
  const shot = p.images[img] ?? p.images[0];
  const href = `/${locale}/work/${p.slug}/`;

  const go = (next: number) => {
    const wrapped = (next + projects.length) % projects.length;
    setDir(wrapped > active || (active === projects.length - 1 && wrapped === 0) ? 1 : -1);
    setActive(wrapped);
    setImg(0);
  };

  const statusLabel = { live: statusLive, study: statusStudy, soon: statusSoon }[p.status];

  return (
    <div className="pjt">
      <div className="pjt-tabs" role="tablist" aria-label="Projects">
        {projects.map((proj, i) => (
          <button
            key={proj.slug}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`pjt-card${active === i ? " is-on" : ""}`}
            onClick={() => go(i)}
          >
            <img src={proj.images[0]?.src} alt="" loading="lazy" />
            <span className="pjt-card-meta">
              <span className="pjt-card-idx">{pad(i + 1)}</span>
              {proj.name}
            </span>
          </button>
        ))}
        <span className="pjt-arrows">
          <button type="button" className="pjt-arrow" aria-label="Previous" onClick={() => go(active - 1)}>
            ←
          </button>
          <button type="button" className="pjt-arrow" aria-label="Next" onClick={() => go(active + 1)}>
            →
          </button>
        </span>
      </div>

      <article key={p.slug} className={`pj pj-slide${dir === -1 ? " is-back" : ""}`}>
        <div className="pj-media">
          <Link href={href} className="pj-shot" aria-label={`${open}: ${p.name}`}>
            <img key={shot?.src} src={shot?.src} alt={shot?.caption ?? p.name} className="pj-img" />
            <span className="pj-shot-hint">{open} ↗</span>
          </Link>
          {shot?.caption ? <span className="pj-cap">{shot.caption}</span> : null}
          <div className="pj-thumbs" role="tablist" aria-label="Screenshots">
            {p.images.map((im, i) => (
              <button
                key={im.src}
                type="button"
                className={`pj-thumb${i === img ? " is-on" : ""}`}
                aria-label={im.caption}
                onClick={() => setImg(i)}
              >
                <img src={im.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <div className="pj-body">
          <p className="pj-meta">
            {p.role}
            {p.semester && <span className="pj-sem">{p.semester}</span>}
            <span className="pj-status">{statusLabel}</span>
          </p>
          <h3 className="pj-name">{p.name}</h3>
          <p className="pj-sum">{p.summary}</p>
          <ul className="pj-feats">
            {p.features.slice(0, 4).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ul className="pj-stack is-icon">
            {p.stack.slice(0, 6).map((t) => {
              const icon = stackIcon(t);
              return (
                <li key={t}>
                  {icon && <img src={icon} alt="" loading="lazy" />}
                  {t}
                </li>
              );
            })}
          </ul>
          <div className="pj-links">
            <Link href={href} className="btn btn-solid">
              {open} ↗
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
