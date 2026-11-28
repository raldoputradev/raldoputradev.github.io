import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BackTop } from "@/components/BackTop";
import { LikeButton } from "@/components/LikeButton";
import { WaveField } from "@/components/WaveField";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { getCopy } from "@/lib/i18n";
import { isLocale, locales, site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getCopy(locale);
  const path = `/${locale}/`;
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: { id: "/id/", en: "/en/", "x-default": "/id/" },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: path,
      siteName: site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: copy.meta.title }],
    },
  };
}

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: ["Aldo Putra", "Aldo", "RAP", "Rayendra Aldo", "raldoputradev"],
  url: site.origin,
  image: `${site.origin}/rayendra-aldo-putra.png`,
  email: `mailto:${site.email}`,
  jobTitle: "Robotics Engineering Student",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Batam",
    addressRegion: "Kepulauan Riau",
    addressCountry: "ID",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Politeknik Negeri Batam" },
    { "@type": "HighSchool", name: "SMK Negeri 7 Batam" },
  ],
  memberOf: {
    "@type": "Organization",
    name: "BRAIL — Barelang Robotics of Artificial Intelligence Lab",
  },
  knowsAbout: [
    "Robotics",
    "Internet of Things",
    "Embedded Systems",
    "ESP32",
    "Laravel",
    "React",
    "Flutter",
    "AWS",
    "Fingerprint Access Systems",
  ],
  sameAs: [
    site.linkedin,
    site.github,
    site.instagram,
    site.campusPbl,
    "https://smartbrail.com",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — Portofolio`,
  alternateName: ["Portofolio Aldo Putra", "RAP Portfolio", "raldoputra.web.id"],
  url: site.origin,
  author: { "@type": "Person", name: site.name },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <Intro name={site.name} />
      <WaveField />
      <Navbar locale={locale} />
      <main id="main" className="relative z-[1]">{children}</main>
      <Footer locale={locale} />
      <BackTop />
      <LikeButton locale={locale} />
    </>
  );
}
