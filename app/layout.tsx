import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Splash } from "@/components/Splash";
import { site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const display = Newsreader({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "optional",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raldoputradev.github.io"),
  title: {
    default: `${site.name} — Portofolio`,
    template: "%s",
  },
  description:
    "Mahasiswa Teknik Robotika, Politeknik Negeri Batam. Portofolio Simalas dan Afis — Laravel, Flutter, ESP32.",
  keywords: [
    "Rayendra Aldo Putra",
    "raldoputradev",
    "Teknik Robotika",
    "Politeknik Negeri Batam",
    "Simalas",
    "Laravel",
    "ESP32",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://raldoputradev.github.io",
    locale: "id_ID",
    images: [
      {
        url: "/og-share.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — Portofolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portofolio`,
    description:
      "Mahasiswa Teknik Robotika, Politeknik Negeri Batam. Portofolio Simalas dan Afis.",
    images: ["/og-share.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

/** Menentukan tema sebelum paint pertama supaya tidak ada kedip putih/hitam. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t;document.documentElement.dataset.splash=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"skip":"play"}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.dataset.splash="play"}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/rayendra-aldo-putra-hero.webp"
          type="image/webp"
          media="(min-width: 1024px)"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased text-ink">
        <Splash />
        {children}
        <p className="sr-only">
          <Link href="/id/">Bahasa Indonesia</Link>
          <Link href="/en/">English</Link>
        </p>
      </body>
    </html>
  );
}
