export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const site = {
  name: "Rayendra Aldo Putra",
  shortName: "Aldo",
  role: "Robotic Engineer · Full-Stack",
  email: "raldoputra.dev@gmail.com",
  origin: "https://raldoputra.web.id",
  ogImage: "/og-share.jpg",
  github: "https://github.com/raldoputradev",
  githubHandle: "@raldoputradev",
  linkedin: "https://www.linkedin.com/in/rayendra-aldo-putra-40399b400",
  linkedinHandle: "Rayendra Aldo Putra",
  whatsapp: "https://wa.me/6289623078935",
  whatsappLabel: "+62 896-2307-8935",
  instagram: "https://www.instagram.com/_qldoo/",
  instagramHandle: "@_qldoo",
  showcaseRepo: "https://github.com/raldoputradev/smartbrail-showcase",
  showcaseRepoLabel: "smartbrail-showcase",
  cv: "/cv/cv-ats-rayendra-aldo-putra.pdf",
} as const;
