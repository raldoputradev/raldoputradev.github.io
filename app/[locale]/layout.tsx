import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BackTop } from "@/components/BackTop";
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
      <Intro name={site.name} />
      <WaveField />
      <Navbar locale={locale} />
      <main id="main" className="relative z-[1]">{children}</main>
      <Footer locale={locale} />
      <BackTop />
    </>
  );
}
