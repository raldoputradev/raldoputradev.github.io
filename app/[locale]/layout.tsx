import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { ScrollTop } from "@/components/ScrollTop";
import { SiteSky } from "@/components/SiteSky";
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
  if (!isLocale(locale)) {
    return {};
  }
  const copy = getCopy(locale);
  const path = `/${locale}/`;
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        id: "/id/",
        en: "/en/",
        "x-default": "/id/",
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: path,
      siteName: site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      type: "website",
      images: [
        {
          url: site.ogImage,
          width: 800,
          height: 1000,
          alt: copy.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: [site.ogImage],
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
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="relative z-[1] flex min-h-screen flex-col">
      <HtmlLang locale={locale} />
      <PersonJsonLd locale={locale} />
      <a href="#main" className="skip-link">
        {locale === "id" ? "Langsung ke isi" : "Skip to content"}
      </a>
      <SiteSky />
      <Header locale={locale} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer locale={locale} />
      <ScrollTop />
    </div>
  );
}
