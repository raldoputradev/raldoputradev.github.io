import Image from "next/image";
import Link from "next/link";
import type { Copy, Project } from "@/lib/i18n";
import { workHref } from "@/lib/paths";
import type { Locale } from "@/lib/site";
import { ChevronRightIcon } from "./Icons";

export function ProjectCard({
  project,
  index,
  locale,
  work,
}: {
  project: Project;
  index: number;
  locale: Locale;
  work: Copy["work"];
}) {
  const cover = project.images[0];
  const statusLabel = {
    live: work.statusLive,
    study: work.statusStudy,
    soon: work.statusSoon,
  }[project.status];

  return (
    <Link href={workHref(locale, project.slug)} className="project-card card-lift">
      <div className="project-card-media">
        <Image
          src={cover.src}
          alt={cover.caption}
          width={cover.width}
          height={cover.height}
          className={cover.height > cover.width ? "is-tall" : ""}
        />
        <span className="project-card-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-card-body">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {project.stack.join(" · ")}
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl italic text-ink">{project.name}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
              {project.role} · {statusLabel}
            </p>
          </div>
          <span className="project-card-go" aria-hidden>
            <ChevronRightIcon />
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {work.open}
        </p>
      </div>
    </Link>
  );
}
