import dynamic from "next/dynamic";
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
import { PortraitCard } from "@/components/PortraitCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillGrid } from "@/components/SkillGrid";
import { AnimatedName } from "@/components/AnimatedName";
import { CodeCard } from "@/components/CodeCard";
import { TypewriterText } from "@/components/TypewriterText";
import { getCopy } from "@/lib/i18n";
import { isLocale, site } from "@/lib/site";

const ProjectShowcase = dynamic(() =>
  import("@/components/ProjectShowcase").then((mod) => ({ default: mod.ProjectShowcase })),
);

function channelRel(href: string | null) {
  if (!href?.startsWith("http")) {
    return undefined;
  }
  if (href === site.github || href === site.linkedin) {
    return "me noreferrer";
  }
  return "noreferrer";
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

  const heroChannels = channels.filter((channel) => channel.href && channel.brand !== "repo");

  return (
    <>
      <section id="home" className="mx-auto max-w-6xl scroll-mt-28 px-5 pt-16 pb-16 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold sm:text-[11px]">
              <span className="h-px w-8 bg-gold" />
              {copy.hero.kicker}
            </p>
            <p className="mt-5 font-display text-2xl text-muted italic sm:text-3xl">
              {copy.hero.hello}
            </p>
            <AnimatedName
              as="h1"
              text={site.name}
              loop
              waitSplash
              className="hero-name mt-2 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
            />
            <TypewriterText
              phrases={copy.hero.typedLines}
              startDelay={600}
              className="hero-typed mt-4 max-w-xl text-base text-gold sm:text-lg"
            />
            <p className="hero-copy mt-6 max-w-xl leading-relaxed text-muted">{copy.hero.intro}</p>
            <CodeCard caption={copy.hero.line} className="mt-6 max-w-xl" />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                {copy.hero.primary}
              </a>
              {site.cv ? (
                <a href={site.cv} download className="btn btn-ghost">
                  <DownloadIcon />
                  {copy.hero.cv}
                </a>
              ) : null}
              <div className="flex items-center gap-2">
                {heroChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href as string}
                    target={channel.href?.startsWith("http") ? "_blank" : undefined}
                    rel={channelRel(channel.href)}
                    aria-label={channel.label}
                    title={channel.label}
                    className={`brand-btn brand-${channel.brand}`}
                  >
                    {channel.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <PortraitCard locale={locale} />
        </div>

        <Reveal>
          <ul className="mt-16 grid gap-6 rounded-2xl border border-line/70 bg-raise/40 px-6 py-7 sm:grid-cols-3">
            {copy.stats.map((stat) => (
              <li key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-4xl italic text-gold">{stat.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Marquee items={copy.marquee} />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <div className="band px-6 py-10 sm:px-10 sm:py-12">
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
            </div>

            <Reveal delay={140}>
              <div className="quiet-panel px-6 py-5">
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

      <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker={copy.skills.kicker}
            lead={copy.skills.titleLead}
            accent={copy.skills.titleAccent}
          />
        </Reveal>
        <div className="mt-8">
          <SkillGrid groups={copy.skills.groups} />
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker={copy.work.kicker}
            lead={copy.work.titleLead}
            accent={copy.work.titleAccent}
          />
        </Reveal>
        <div className="mt-10 space-y-6">
          {copy.projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectShowcase project={project} index={index} work={copy.work} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            kicker={copy.architecture.kicker}
            lead={copy.architecture.titleLead}
            accent={copy.architecture.titleAccent}
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

      <section id="contact" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 text-center sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            &mdash; {copy.contact.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            {copy.contact.headlineLead}{" "}
            <span className="text-gold italic">{copy.contact.headlineAccent}</span>{" "}
            {copy.contact.headlineTail}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">{copy.contact.body}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => {
              const body = (
                <>
                  <span className={`brand-btn brand-${channel.brand}`}>
                    {channel.icon}
                  </span>
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
