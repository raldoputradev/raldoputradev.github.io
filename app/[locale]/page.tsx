import { notFound } from "next/navigation";
import {
  DownloadIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  RepoIcon,
  WhatsappIcon,
} from "@/components/Icons";
import { Marquee } from "@/components/Marquee";
import { HeroLanyard } from "@/components/HeroLanyard";
import { CvSoonButton } from "@/components/CvSoonButton";
import { RotateWords } from "@/components/RotateWords";
import { Journey } from "@/components/Journey";
import { WorkGallery } from "@/components/WorkGallery";
import { TypewriterText } from "@/components/TypewriterText";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillGrid } from "@/components/SkillGrid";
import { CodeCard } from "@/components/CodeCard";
import { getCopy } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";
import { isLocale, site } from "@/lib/site";

function channelRel(href: string | null) {
  if (!href?.startsWith("http")) {
    return undefined;
  }
  if (href === site.github || href === site.linkedin) {
    return "me noreferrer noopener";
  }
  return "noreferrer noopener";
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const copy = getCopy(locale);

  const channels = [
    {
      label: "Email",
      brand: "email",
      value: site.email,
      note: copy.contact.emailNote,
      href: `mailto:${site.email}`,
      icon: <MailIcon />,
    },
    {
      label: "GitHub",
      brand: "github",
      value: site.githubHandle,
      note: copy.contact.githubNote,
      href: site.github,
      icon: <GithubIcon />,
    },
    {
      label: "LinkedIn",
      brand: "linkedin",
      value: site.linkedinHandle,
      note: copy.contact.linkedinNote,
      href: site.linkedin,
      icon: <LinkedinIcon />,
    },
    {
      label: "WhatsApp",
      brand: "whatsapp",
      value: site.whatsappLabel,
      note: copy.contact.whatsappNote,
      href: site.whatsapp,
      icon: <WhatsappIcon />,
    },
    {
      label: "Instagram",
      brand: "instagram",
      value: site.instagramHandle,
      note: copy.contact.instagramNote,
      href: site.instagram,
      icon: <InstagramIcon />,
    },
    {
      label: "Repo Simalas",
      brand: "repo",
      value: site.sandboxRepoLabel,
      note: copy.contact.sandboxNote,
      href: site.sandboxRepo,
      icon: <RepoIcon />,
    },
  ];

  return (
    <>
      <section id="home" className="scroll-mt-8">
        <div className="hero-banner">
          <span className="hero-banner-hole is-left" aria-hidden />
          <span className="hero-banner-hole is-right" aria-hidden />
          <div className="hero-banner-mark" aria-hidden>
            <div className="hero-banner-track">
              <span>{`${site.splashRole}  ·  `.repeat(4)}</span>
              <span>{`${site.splashRole}  ·  `.repeat(4)}</span>
            </div>
          </div>
        </div>
        <div className="hero-panel mx-auto max-w-7xl px-3.5 sm:px-8">
          <HeroLanyard />
          <div className="hero-copy-block">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold sm:text-[11px]">
              {copy.hero.kicker}
            </p>
            <p className="hero-hello mt-3">
              <span className="hero-hello-lead">{copy.hero.hello}</span>
              <RotateWords words={copy.hero.roles} />
            </p>
            <TypewriterText
              as="h1"
              loop
              holdMs={2400}
              phrases={[site.name]}
              className="hero-name mt-1 font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.35rem]"
            />
            <p className="mt-2 text-sm text-accent sm:text-base">{site.splashRole}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">{copy.hero.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={homeHref(locale, "projects")} className="btn btn-primary">
                {copy.hero.primary}
              </a>
              <a href={homeHref(locale, "contact")} className="btn btn-ghost">
                {copy.hero.contactCta}
              </a>
              <CvSoonButton label={copy.hero.cv} soon={copy.hero.cvSoon} />
            </div>
          </div>
        </div>
      </section>

      <Marquee items={copy.marquee} />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-8 px-2 pt-20 pb-[6.25rem] sm:px-8 sm:py-20">
        <div className="band px-3.5 py-9 sm:px-10 sm:py-12">
          <Reveal>
            <SectionHeading
              kicker={copy.about.kicker}
              lead={copy.about.titleLead}
              accent={copy.about.titleAccent}
            />
          </Reveal>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal delay={60}>
                <p className="font-display text-2xl leading-snug text-ink italic sm:text-[27px]">
                  {copy.about.body[0]}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-6 space-y-4 border-l border-line pl-5 leading-relaxed text-muted">
                  {copy.about.body.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={140}>
                <CodeCard caption={copy.hero.line} className="mt-6 max-w-xl" />
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="quiet-panel px-4 py-5 sm:px-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {copy.facts.title}
                </p>
                <dl className="mt-3">
                  {copy.facts.items.map((fact) => (
                    <div key={fact.label} className="fact-row">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        {fact.label}
                      </dt>
                      <dd
                        className={`text-right text-sm ${fact.value ? "text-ink" : "text-muted italic"}`}
                      >
                        {fact.value ?? copy.facts.pending}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <ul className="hero-stats about-stats">
                {copy.stats.map((stat) => (
                  <li key={stat.label}>
                    <span className="hero-stat-value">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-11 grid gap-9 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                {copy.about.how.title}
              </h3>
              <ol className="mt-4 space-y-3">
                {copy.about.how.items.map((item, index) => (
                  <li key={item} className="flex gap-4 text-sm leading-relaxed text-muted">
                    <span className="pt-0.5 font-mono text-[11px] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={80}>
              <div className="border-l-2 border-accent-dim pl-5">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {copy.about.next.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{copy.about.next.text}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Journey copy={copy.journey} />

      <section id="skills" className="skills-band mx-auto max-w-6xl scroll-mt-8 px-3.5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker={copy.skills.kicker}
            lead={copy.skills.titleLead}
            accent={copy.skills.titleAccent}
            blurb={copy.skills.blurb}
            center
          />
        </Reveal>
        <div className="mt-10">
          <SkillGrid
            items={copy.skills.items}
            filters={copy.skills.filters}
            learningTitle={copy.skills.learningTitle}
            learning={copy.skills.learning}
          />
        </div>
      </section>

      <section id="projects" className="work-band scroll-mt-8 py-20">
        <div className="mx-auto max-w-6xl px-3.5 sm:px-8">
          <Reveal>
            <SectionHeading
              kicker={copy.work.kicker}
              lead={copy.work.titleLead}
              accent={copy.work.titleAccent}
              blurb={copy.work.blurb}
              center
            />
          </Reveal>
        </div>
        <WorkGallery projects={copy.projects} locale={locale} work={copy.work} />
      </section>

      <section id="architecture" className="mx-auto max-w-6xl scroll-mt-8 px-3.5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker={copy.architecture.kicker}
            lead={copy.architecture.titleLead}
            accent={copy.architecture.titleAccent}
            center
          />
        </Reveal>

        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {copy.architecture.layers.map((layer, index) => (
            <Reveal key={layer.name} as="li" delay={index * 60} className="card card-lift h-full p-5">
              <p className="font-mono text-[11px] text-accent">
                {String(index + 1).padStart(2, "0")} &middot; {layer.tech}
              </p>
              <h3 className="mt-2 font-display text-xl italic text-ink">{layer.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{layer.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {copy.architecture.decisionsTitle}
              </h3>
            </Reveal>
            <ul className="mt-4 space-y-5">
              {copy.architecture.decisions.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={index * 60}
                  className="rounded-r-xl border-l-2 border-accent-dim bg-raise/30 py-2 pl-4"
                >
                  <h4 className="font-medium text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={100}>
            <div className="card h-full p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                {copy.architecture.notIncluded.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {copy.architecture.notIncluded.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-accent">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="site-close mx-auto max-w-4xl scroll-mt-8 px-3.5 py-20 text-center sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">+ {copy.contact.kicker}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            {copy.contact.headlineLead}{" "}
            <span className="text-gradient italic">{copy.contact.headlineAccent}</span>{" "}
            {copy.contact.headlineTail}
          </h2>
          <div className="section-rule mx-auto mt-4" />
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">{copy.contact.body}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => {
              const body = (
                <>
                  <span className={`brand-btn brand-${channel.brand}`}>{channel.icon}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    {channel.label}
                  </span>
                  <span
                    className={`break-all text-sm ${channel.value ? "text-ink" : "text-muted italic"}`}
                  >
                    {channel.value ?? copy.contact.pending}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {channel.note}
                  </span>
                </>
              );

              return channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channelRel(channel.href)}
                  className="card card-lift group flex flex-col items-center gap-3 px-5 py-7"
                >
                  {body}
                </a>
              ) : (
                <div
                  key={channel.label}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line/80 px-5 py-7 opacity-70"
                >
                  {body}
                </div>
              );
            })}
          </div>
        </Reveal>

        {site.cv ? (
          <Reveal delay={140}>
            <a href={site.cv} download className="btn btn-primary mt-8">
              <DownloadIcon />
              {copy.hero.cv}
            </a>
          </Reveal>
        ) : null}
      </section>
    </>
  );
}
