import { notFound } from "next/navigation";
import { Lightbox } from "@/components/Lightbox";
import { CountUp } from "@/components/CountUp";
import { Marquee } from "@/components/Marquee";
import { ProjectTabs } from "@/components/ProjectTabs";
import { Reveal } from "@/components/Reveal";
import { Rotator } from "@/components/Rotator";
import { Tilt } from "@/components/Tilt";
import { getCopy } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";
import { isLocale, site } from "@/lib/site";
import { stackIcon } from "@/lib/stack-icons";

const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);

  const channels = [
    { label: "Email", value: site.email, note: copy.contact.emailNote, href: `mailto:${site.email}`, icon: "gmail.svg" },
    { label: "GitHub", value: site.githubHandle, note: copy.contact.githubNote, href: site.github, icon: "github.svg" },
    { label: "LinkedIn", value: site.linkedinHandle, note: copy.contact.linkedinNote, href: site.linkedin, icon: "linkedin.svg" },
    { label: "WhatsApp", value: site.whatsappLabel, note: copy.contact.whatsappNote, href: site.whatsapp, icon: "whatsapp.svg" },
    { label: "Instagram", value: site.instagramHandle, note: copy.contact.instagramNote, href: site.instagram, icon: "instagram.svg" },
  ];

  const heads = [
    { k: copy.about.kicker, lead: copy.about.titleLead, accent: copy.about.titleAccent },
    { k: copy.focus.kicker, lead: copy.focus.titleLead, accent: copy.focus.titleAccent, blurb: copy.focus.blurb },
    { k: copy.skills.kicker, lead: copy.skills.titleLead, accent: copy.skills.titleAccent, blurb: copy.skills.blurb },
    { k: copy.work.kicker, lead: copy.work.titleLead, accent: copy.work.titleAccent, blurb: copy.work.blurb },
    { k: copy.certs.kicker, lead: copy.certs.titleLead, accent: copy.certs.titleAccent, blurb: copy.certs.blurb },
  ];

  const Head = ({ n, h }: { n: number; h: (typeof heads)[number] }) => (
    <Reveal>
      <header className="sh">
        <span className="sh-ghost" aria-hidden>{pad(n)}</span>
        <p className="sh-kicker">{h.k}</p>
        <h2 className="sh-title">
          {h.lead} <em>{h.accent}</em>
        </h2>
        {h.blurb ? <p className="sh-blurb">{h.blurb}</p> : null}
      </header>
    </Reveal>
  );

  return (
    <>
      {/* intro lives in layout — sits above navbar */}

      {/* ————— 01 · HERO ————— */}
      <section id="home" className="hero">
        <div className="hero-in">
          <div>
            <Reveal variant="fade">
              <p className="hero-status">
                <span className="hero-dot" aria-hidden />
                {copy.hero.status}
              </p>
            </Reveal>
            <Reveal variant="fade" delay={90}>
              <p className="hero-kicker">{copy.hero.kicker}</p>
            </Reveal>
            <h1 className="hero-name">
              {site.name.split(" ").map((word, wi, arr) => (
                <span key={wi} className={`hn-word${wi === arr.length - 1 ? " is-ghost" : ""}`}>
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="hn-letter"
                      style={{ ["--i" as string]: wi * 10 + ci }}
                    >
                      {ch}
                    </span>
                  ))}
                  {wi < arr.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            <Reveal delay={240}>
              <p className="hero-role">
                <Rotator words={copy.hero.roles} />
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="hero-intro">{copy.hero.intro}</p>
            </Reveal>
            <Reveal delay={400}>
              <div className="hero-btns">
                <a href={homeHref(locale, "projects")} className="btn btn-solid">
                  {copy.hero.primary} ↓
                </a>
                <a href={homeHref(locale, "contact")} className="btn btn-line">
                  {copy.hero.contactCta}
                </a>
                {site.cv ? (
                  <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                    {copy.hero.cv} ↗
                  </a>
                ) : null}
              </div>
            </Reveal>
            <Reveal delay={480}>
              <ul className="hero-stats">
                {copy.stats.map((s) => (
                  <li key={s.label}>
                    <CountUp value={s.value} suffix={s.suffix} className="hs-num" />
                    <span className="hs-label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal variant="right" delay={260} className="hero-side">
            <Tilt>
            <figure className="ph">
              <svg className="ph-ring" viewBox="0 0 100 100" aria-hidden>
                <defs>
                  <path id="ring-c" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
                </defs>
                <text className="ph-ring-text">
                  <textPath href="#ring-c">OPEN TO WORK · ROBOTIC ENGINEER · FULL-STACK ·</textPath>
                </text>
              </svg>
              <img className="ph-img" src="/rayendra-aldo-putra-formal.jpg" alt={site.name} />
              <figcaption className="ph-cap">
                <span className="ph-cap-top">
                  <span className="ph-cap-name">
                    {site.name}
                    <svg className="ph-verified" viewBox="0 0 24 24" aria-label="Verified">
                      <circle className="ph-verified-orbit" cx="12" cy="12" r="11.2" />
                      <g transform="translate(2.9 2.9) scale(0.76)">
                        <path
                          fill="#1d9bf1"
                          d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                        />
                      </g>
                    </svg>
                  </span>
                  <img className="ph-campus" src="/polibatam-logo.png" alt="Politeknik Negeri Batam" />
                </span>
                <span className="ph-cap-role">{site.role}</span>
              </figcaption>
            </figure>
            </Tilt>
          </Reveal>
        </div>
        <a href={homeHref(locale, "about")} className="hero-cue" aria-hidden>
          <span className="hero-cue-line" />
        </a>
      </section>

      <Marquee items={copy.marquee} />

      {/* ————— 02 · ABOUT ————— */}
      <section id="about" className="pg">
        <div className="pg-in">
          <Head n={1} h={heads[0]} />
          <div className="ab-grid">
            <div className="ab-main">
              <Reveal delay={60} variant="left">
                <p className="ab-lead">{copy.about.body[0]}</p>
              </Reveal>
              <Reveal delay={120} variant="left">
                <div className="ab-body">
                  {copy.about.body.slice(1).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="ab-side">
              <Reveal delay={140} variant="right">
                <div className="facts">
                  <p className="facts-t">{copy.facts.title}</p>
                  <dl>
                    {copy.facts.items.map((f) => (
                      <div key={f.label} className="fact">
                        <dt>{f.label}</dt>
                        <dd className={f.value ? "" : "is-wait"}>{f.value ?? copy.facts.pending}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
              <Reveal delay={210} variant="right">
                <div className="next">
                  <span className="next-dot" aria-hidden />
                  <h3 className="ab-sub">{copy.about.next.title}</h3>
                  <p>{copy.about.next.text}</p>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={180}>
            <div className="ab-how-wrap">
              <h3 className="ab-sub">{copy.about.how.title}</h3>
              <ol className="ab-how">
                {copy.about.how.items.map((item, i) => (
                  <li key={item}>
                    <span className="ab-num">{pad(i + 1)}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— 03 · FOCUS ————— */}
      <section id="focus" className="pg">
        <div className="pg-in">
          <Head n={2} h={heads[1]} />
          <ul className="fc-grid">
            {copy.focus.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 90} variant="up">
                <a href={homeHref(locale, "projects")} className="fc">
                  <span className="fc-idx">{pad(i + 1)}</span>
                  <h3 className="fc-t">{item.title}</h3>
                  <p className="fc-x">{item.text}</p>
                  <span className="fc-sheet">
                    <span className="fc-sheet-t">Stack</span>
                    <span className="fc-shots">
                      {item.shots.map((s) => (
                        <img key={s} src={s} alt="" loading="lazy" className="fc-shot" />
                      ))}
                    </span>
                    {item.stack.map((t) => {
                      const icon = stackIcon(t);
                      return (
                        <span key={t} className="fc-chip">
                          {icon ? <img src={icon} alt="" className="fc-chip-icon" /> : null}
                          {t}
                        </span>
                      );
                    })}
                    <span className="fc-sheet-cue" aria-hidden>↗</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ————— 04 · SKILLS ————— */}
      <section id="skills" className="pg">
        <div className="pg-in">
          <Head n={3} h={heads[2]} />
          {(["embedded", "web", "craft"] as const).map((group, gi) => (
            <Reveal key={group} delay={gi * 110}>
              <div className="sk-group">
                <p className="sk-group-t">{copy.skills.filters[group]}</p>
                <ul className="sk-grid">
                  {copy.skills.items
                    .filter((s) => s.group === group)
                    .map((s) => (
                      <li key={s.name} className="skt">
                        <img src={`/assets/skills/${s.icon}`} alt="" className="skt-icon" loading="lazy" />
                        <span className="skt-name">{s.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={220}>
            <div className="sk-learn">
              <span className="sk-learn-t">{copy.skills.learningTitle}</span>
              {copy.skills.learning.map((s) => (
                <span key={s.name} className="sk is-learn">
                  <img src={`/assets/skills/${s.icon}`} alt="" className="sk-learn-icon" loading="lazy" />
                  {s.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— 05 · PROJECTS ————— */}
      <section id="projects" className="pg">
        <div className="pg-in">
          <Head n={4} h={heads[3]} />
          <Reveal delay={60}>
            <a
              className="campus-verify"
              href={site.campusPbl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/polibatam-logo.png" alt="" aria-hidden />
              {copy.work.campusVerified}
              <svg className="campus-verify-check" viewBox="0 0 24 24" aria-label="Terverifikasi">
                <circle cx="12" cy="12" r="11" fill="#22c55e" />
                <path
                  fill="#fff"
                  d="M17.28 9.22a.75.75 0 0 0-1.06-.01l-5.47 5.14-2.53-2.4a.75.75 0 1 0-1.04 1.08l3.08 2.92c.29.28.76.27 1.04-.02l6.01-5.65c.29-.28.28-.76-.03-1.06z"
                />
              </svg>
              <span aria-hidden>↗</span>
            </a>
          </Reveal>
          <Reveal delay={100}>
            <ProjectTabs
              projects={copy.projects}
              locale={locale}
              statusLive={copy.work.statusLive}
              statusStudy={copy.work.statusStudy}
              statusSoon={copy.work.statusSoon}
              open={copy.work.open}
            />
          </Reveal>
        </div>
      </section>

      {/* ————— 06 · CERTS ————— */}
      <section id="certs" className="pg">
        <div className="pg-in">
          <Head n={5} h={heads[4]} />
          <ul className="ct-grid">
            {copy.certs.items.length > 0
              ? copy.certs.items.map((c, i) => (
                  <Reveal as="li" key={i} delay={i * 80} variant="zoom" className="ct">
                    <a
                      className="ct-card"
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span
                        className="ct-frame has-img"
                        data-cap={`${c.title} — ${c.issuer} · ${c.year}`}
                        data-href={c.link}
                        data-vlabel={copy.certs.verifyLabel}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.image}
                          alt={c.title}
                          className={c.fit === "contain" ? "is-contain" : ""}
                          loading="lazy"
                          draggable={false}
                        />
                      </span>
                      <span className="ct-info">
                        <span className="ct-title">{c.title}</span>
                        <span className="ct-meta">
                          {c.issuer} · {c.year}
                        </span>
                        <span className="ct-verify">{copy.certs.verifyLabel} ↗</span>
                      </span>
                    </a>
                  </Reveal>
                ))
              : [0, 1, 2].map((i) => (
                  <Reveal as="li" key={i} delay={i * 100} variant="zoom" className="ct">
                    <span className="ct-frame">
                      <span className="ct-mark" aria-hidden />
                      <span className="ct-label">{copy.certs.emptyLabel}</span>
                    </span>
                    <span className="ct-lines">
                      <span className="ct-line" />
                      <span className="ct-line is-short" />
                    </span>
                  </Reveal>
                ))}
          </ul>
        </div>
      </section>

      {/* ————— 07 · CONTACT ————— */}
      <section id="contact" className="pg pg-contact">
        <div className="pg-in pg-narrow">
          <Reveal>
            <header className="sh">
              <span className="sh-ghost" aria-hidden>07</span>
              <p className="sh-kicker">{copy.contact.kicker}</p>
              <h2 className="sh-title">
                {copy.contact.headlineLead} <em>{copy.contact.headlineAccent}</em>
              </h2>
              <p className="sh-blurb">{copy.contact.body}</p>
            </header>
          </Reveal>
          <Reveal delay={120}>
            <ul className="cn-list">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="cn-row">
                    <span className="cn-icon">
                      <img src={`/assets/socials/${c.icon}`} alt="" />
                    </span>
                    <span className="cn-label">{c.label}</span>
                    <span className="cn-value">{c.value}</span>
                    <span className="cn-note">{c.note}</span>
                    <span className="cn-arrow" aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          {site.cv ? (
            <Reveal delay={200}>
              <a href={site.cv} target="_blank" rel="noopener noreferrer" className="cv-link">
                {copy.hero.cv}
                <span aria-hidden>↗</span>
              </a>
            </Reveal>
          ) : null}
        </div>
      </section>
      <Lightbox />
    </>
  );
}
