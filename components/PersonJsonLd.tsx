import { site } from "@/lib/site";

/** Mengikat nama lengkap ke satu orang: GitHub, LinkedIn, Instagram, kampus, Batam. */
export function PersonJsonLd() {
  const personId = "https://raldoputradev.github.io/#person";
  const pageId = "https://raldoputradev.github.io/#profile";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: "https://raldoputradev.github.io/id/",
        name: `${site.name} — Portofolio`,
        inLanguage: ["id", "en"],
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
        url: "https://raldoputradev.github.io",
        email: site.email,
        image: "https://raldoputradev.github.io/rayendra-aldo-putra.png?v=2",
        jobTitle: "Mahasiswa Teknik Robotika, Politeknik Negeri Batam",
        disambiguatingDescription:
          "Pengembang Simalas di Batam (raldoputradev). Bukan Aldo Rayendra Rachmat Putra, psikolog klinis.",
        description:
          "Rayendra Aldo Putra, mahasiswa Teknik Robotika di Politeknik Negeri Batam. Merancang Simalas: mesin sidik jari ESP32, API Laravel, web admin, dan aplikasi Flutter. Local-first, lalu sync ke server.",
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
