export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Nilai `null` sengaja dibiarkan kosong dan tampil sebagai "menyusul" di situs.
 * Isi kalau datanya sudah pasti; jangan pakai tautan atau nomor palsu.
 */
export const site = {
  name: "Rayendra Aldo Putra",
  shortName: "Aldo",
  email: "raldoputra.dev@gmail.com",
  github: "https://github.com/raldoputradev",
  githubHandle: "raldoputradev",
  linkedin: "https://www.linkedin.com/in/rayendra-aldo-putra-40399b400",
  linkedinHandle: "rayendra-aldo-putra",
  cv: null as string | null,
  whatsapp: "https://wa.me/6289623078935",
  whatsappLabel: "+62 896-2307-8935",
  instagram: "https://www.instagram.com/_qldoo/",
  instagramHandle: "_qldoo",
  sandboxRepo: "https://github.com/raldoputradev/aiot-simalas" as string | null,
  sandboxRepoLabel: "raldoputradev/aiot-simalas" as string | null,
  location: "Batam, Kepulauan Riau",
  campus: "Politeknik Negeri Batam",
  domainHint: "portfolio-rayendra-aldo-putra",
};
