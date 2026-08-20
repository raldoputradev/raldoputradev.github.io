import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { getCopy } from "@/lib/i18n";
import { isLocale, locales, site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
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
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: path,
      siteName: site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
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
    <div className="flex min-h-screen flex-col">
      <PersonJsonLd />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
