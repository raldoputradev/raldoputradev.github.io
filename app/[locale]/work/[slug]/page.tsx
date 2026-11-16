import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";
import { getCopy } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";
import { isLocale, locales, site } from "@/lib/site";
import { stackIcon } from "@/lib/stack-icons";

const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  const slugs = getCopy("id").projects.map((p) => p.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getCopy(locale).projects.find((pr) => pr.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${site.name}`,
    description: p.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);
  const idx = copy.projects.findIndex((pr) => pr.slug === slug);
  if (idx < 0) notFound();
  const p = copy.projects[idx];
  const prev = copy.projects[(idx - 1 + copy.projects.length) % copy.projects.length];
  const next = copy.projects[(idx + 1) % copy.projects.length];
  const statusLabel = { live: copy.work.statusLive, study: copy.work.statusStudy, soon: copy.work.statusSoon }[p.status];
  const workHref = (s: string) => `/${locale}/work/${s}/`;
  const rest = p.images.slice(1);
  const mobShots = rest.filter((im) => im.mobile);
  const webShots = rest.filter((im) => !im.mobile);

  return (
    <article className="pd">
      <div className="pd-in">
        <Reveal>
          <Link href={homeHref(locale, "projects")} className="pd-back">
            ← {copy.work.back}
          </Link>
        </Reveal>
        <header className="pd-head">
          <Reveal delay={60}>
            <p className="pd-meta">
              <span className="pd-idx">{pad(idx + 1)}</span>
              {p.role}
              <span className="pj-status">{statusLabel}</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="pd-title">{p.name}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="pd-sum">{p.summary}</p>
          </Reveal>
          <Reveal delay={230}>
            <div className="pj-links">
              {p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  {p.liveLabel ?? "Live"} ↗
                </a>
              ) : null}
              {p.repoUrl ? (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  {copy.work.repoLink} ↗
                </a>
              ) : null}
            </div>
          </Reveal>
        </header>

        <Reveal delay={120}>
          <figure className="pd-hero">
            <img src={p.images[0]?.src} alt={p.images[0]?.caption ?? p.name} />
            <figcaption>{p.images[0]?.caption}</figcaption>
          </figure>
        </Reveal>

        <div className="pd-cols">
          <Reveal delay={100} variant="left">
            <div className="pd-block">
              <h2 className="ab-sub">{copy.work.feats}</h2>
              <ul className="pj-feats">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={160} variant="right">
            <div className="pd-block">
              <h2 className="ab-sub">{copy.work.stackTitle}</h2>
              <ul className="pj-stack is-icon">
                {p.stack.map((t) => {
                  const icon = stackIcon(t);
                  return (
                    <li key={t}>
                      {icon ? <img src={icon} alt="" /> : null}
                      {t}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className={`pd-gcols${mobShots.length ? "" : " is-web"}`}>
            {mobShots.length ? (
              <div className="pd-gcol is-mob">
                {mobShots.map((im) => (
                  <figure key={im.src} className="pd-shot">
                    <img src={im.src} alt={im.caption} loading="lazy" />
                    <figcaption>{im.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
            <div className="pd-gcol">
              {webShots.map((im) => (
                <figure key={im.src} className="pd-shot">
                  <img src={im.src} alt={im.caption} loading="lazy" />
                  <figcaption>{im.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        <nav className="pd-nav" aria-label="Projects">
          <Link href={workHref(prev.slug)} className="pd-navlink">
            <span className="pd-nav-dir">← Prev</span>
            <span className="pd-nav-name">{prev.name}</span>
          </Link>
          <Link href={workHref(next.slug)} className="pd-navlink is-next">
            <span className="pd-nav-dir">Next →</span>
            <span className="pd-nav-name">{next.name}</span>
          </Link>
        </nav>
      </div>
      <Lightbox />
    </article>
  );
}
