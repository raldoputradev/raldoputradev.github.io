import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://raldoputradev.github.io/sitemap.xml",
    host: "https://raldoputradev.github.io",
  };
}
