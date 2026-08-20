import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://raldoputradev.github.io/id/",
      lastModified,
      alternates: {
        languages: {
          id: "https://raldoputradev.github.io/id/",
          en: "https://raldoputradev.github.io/en/",
        },
      },
    },
    {
      url: "https://raldoputradev.github.io/en/",
      lastModified,
      alternates: {
        languages: {
          id: "https://raldoputradev.github.io/id/",
          en: "https://raldoputradev.github.io/en/",
        },
      },
    },
  ];
}
