import { site, type Locale } from "@/lib/site";

/** Mengikat nama lengkap ke satu orang: GitHub, LinkedIn, Instagram, kampus, Batam. */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const personId = `${site.origin}/#person`;
  const siteId = `${site.origin}/#website`;
  const pageId = `${site.origin}/#profile`;
  const pageUrl = `${site.origin}/${locale}/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        url: `${site.origin}/id/`,
        name: `${site.name} — Portofolio`,
        inLanguage: ["id", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: pageUrl,
        name: `${site.name} — ${locale === "id" ? "Portofolio" : "Portfolio"}`,
        inLanguage: locale,
        isPartOf: { "@id": siteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: "Rayendra",
        additionalName: "Aldo",
        familyName: "Putra",
        alternateName: ["raldoputradev", "Rayendra Aldo Putra"],
        url: site.origin,
        email: site.email,
        image: `${site.origin}${site.photo}`,
        jobTitle:
          locale === "id"
            ? "Mahasiswa Teknik Robotika, Politeknik Negeri Batam"
            : "Robotics student, Politeknik Negeri Batam",
        disambiguatingDescription:
          locale === "id"
            ? "Pengembang Simalas di Batam (raldoputradev). Mahasiswa Teknik Robotika, Politeknik Negeri Batam."
            : "Simalas developer in Batam (raldoputradev). Robotics student at Politeknik Negeri Batam.",
        description:
          locale === "id"
            ? "Rayendra Aldo Putra, mahasiswa Teknik Robotika di Politeknik Negeri Batam. Merancang Simalas: mesin sidik jari ESP32, API Laravel, web admin, dan aplikasi Flutter. Local-first, lalu sync ke server."
            : "Rayendra Aldo Putra, robotics student at Politeknik Negeri Batam. Builds Simalas: ESP32 fingerprint devices, Laravel API, admin web, and Flutter app. Local-first, then sync to the server.",
        nationality: "ID",
        homeLocation: {
          "@type": "Place",
          name: site.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Batam",
            addressRegion: "Kepulauan Riau",
            addressCountry: "ID",
          },
        },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: site.campus,
        },
        knowsAbout: [
          "Simalas",
          "ESP32",
          "Laravel",
          "Flutter",
          "local-first",
          "Teknik Robotika",
        ],
        identifier: [
          {
            "@type": "PropertyValue",
            propertyID: "GitHub",
            value: site.githubHandle,
          },
        ],
        sameAs: [site.github, site.linkedin, site.instagram].filter(Boolean),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
