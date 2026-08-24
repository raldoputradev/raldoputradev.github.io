import { site } from "@/lib/site";

/** Membantu mesin pencari mengaitkan situs ini dengan GitHub dan LinkedIn. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: "https://raldoputradev.github.io",
    email: site.email,
    jobTitle: "Mahasiswa Teknik Robotika",
    image: "https://raldoputradev.github.io/rayendra-aldo-putra.png?v=2",
    description:
      "Mahasiswa Teknik Robotika di Politeknik Negeri Batam. Merancang rantai utuh: mesin sidik jari, API Laravel, web admin, dan aplikasi Flutter. Local-first, lalu sync ke server.",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: site.campus,
    },
    identifier: site.githubHandle,
    sameAs: [site.github, site.linkedin, site.instagram].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
