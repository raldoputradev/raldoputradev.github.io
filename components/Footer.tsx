import { site, type Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";

const links = ["home", "about", "focus", "skills", "projects", "certs", "contact"] as const;

const socials = [
  { label: "Email", href: `mailto:${site.email}`, icon: "gmail.svg" },
  { label: "GitHub", href: site.github, icon: "github.svg" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin.svg" },
  { label: "WhatsApp", href: site.whatsapp, icon: "whatsapp.svg" },
  { label: "Instagram", href: site.instagram, icon: "instagram.svg" },
];

export function Footer({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return (
    <footer className="ftr">
      <div className="ftr-in">
        <div className="ftr-grid">
          <div className="ftr-col">
            <a href={homeHref(locale, "home")} className="ftr-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brands/rap-logo.png" alt={site.name} className="ftr-logo" />
              <span className="sr-only">{site.name}</span>
            </a>
            <p className="ftr-role">{copy.footer.tagline}</p>
            <p className="ftr-loc">{copy.footer.loc}</p>
            <ul className="ftr-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="ftr-soc">
                    <img src={`/assets/socials/${s.icon}`} alt="" className="ftr-soc-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav className="ftr-col" aria-label="Footer">
            <p className="ftr-h">{copy.footer.navTitle}</p>
            <ul className="ftr-links">
              {links.map((id) => (
                <li key={id}>
                  <a href={homeHref(locale, id)} className="ftr-link">
                    {copy.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ftr-col">
            <p className="ftr-h">{copy.footer.contactTitle}</p>
            <ul className="ftr-links">
              <li>
                <a href={`mailto:${site.email}`} className="ftr-link">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="ftr-link">
                  {site.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="ftr-link">
                  LinkedIn
                </a>
              </li>
            </ul>
            {site.cv ? (
              <a href={site.cv} target="_blank" rel="noopener noreferrer" className="ftr-cv">
                {copy.hero.cv} <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="ftr-bot">
          <p>{copy.footer.line}</p>
          <p className="ft-mute">© {new Date().getFullYear()} {site.name}. {copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
