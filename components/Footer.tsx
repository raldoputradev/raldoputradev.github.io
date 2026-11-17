import { site, type Locale } from "@/lib/site";
import { getCopy } from "@/lib/i18n";
import { homeHref } from "@/lib/paths";
import { LikeButton } from "@/components/LikeButton";

const links = ["home", "about", "skills", "projects", "contact"] as const;

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
        <div className="ftr-top">
          <a href={homeHref(locale, "home")} className="ftr-brand">
            {site.name}
          </a>
          <nav className="ftr-links" aria-label="Footer">
            {links.map((id) => (
              <a key={id} href={homeHref(locale, id)} className="ftr-link">
                {copy.nav[id]}
              </a>
            ))}
          </nav>
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
        <div className="ftr-bot">
          <p>{copy.footer.line}</p>
          <LikeButton locale={locale} />
          <p className="ft-mute">© {new Date().getFullYear()} {site.name}. {copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
