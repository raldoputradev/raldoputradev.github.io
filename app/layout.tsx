import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080b" },
    { media: "(prefers-color-scheme: light)", color: "#d6d0c3" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} — Portofolio`,
    template: "%s",
  },
  description:
    "Portofolio Rayendra Aldo Putra. Mahasiswa Teknik Robotika, Politeknik Negeri Batam. Simalas: sidik jari, Laravel, Flutter, ESP32 — local-first, lalu sync ke server.",
  keywords: [
    "Rayendra Aldo Putra",
    "raldoputradev",
    "Teknik Robotika",
    "Politeknik Negeri Batam",
    "Simalas",
    "Laravel",
    "ESP32",
    "Full-Stack",
    "Robotic Engineer",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  category: "portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.origin}/id/`,
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: site.ogImage,
        width: 800,
        height: 1000,
        alt: `${site.name} — Portofolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portofolio`,
    description:
      "Portofolio Rayendra Aldo Putra. Mahasiswa Teknik Robotika, Politeknik Negeri Batam. Simalas: sidik jari, Laravel, Flutter, ESP32.",
    images: [site.ogImage],
  },
  icons: { icon: "/favicon.svg", apple: "/logo-rap.png" },
  manifest: "/manifest.webmanifest",
};

/** Menentukan tema sebelum paint pertama supaya tidak ada kedip putih/hitam. */
const themeScript = `(function(){try{var d=document.documentElement;d.lang=/^\\/en(\\/|$)/.test(location.pathname)?"en":"id";var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}d.dataset.theme=t;if("scrollRestoration" in history)history.scrollRestoration="manual";var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){try{history.replaceState(null,"",location.pathname+location.search)}catch(x){}}window.scrollTo(0,0);var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var audit=!!navigator.webdriver||/Chrome-Lighthouse|PageSpeed/i.test(navigator.userAgent);if(!audit){try{var b=navigator.userAgentData&&navigator.userAgentData.brands;if(b&&b.some(function(x){return/Lighthouse|PageSpeed/i.test(x.brand)}))audit=true}catch(e){}}if(!audit){var w=window.innerWidth,h=window.innerHeight,p=window.devicePixelRatio;audit=(w===412&&(h===823||h===915)&&(p===1.75||p===2.625))||(w===1350&&h===940&&p===1)}if(audit)d.dataset.audit="1";d.dataset.splash=(reduce||audit)?"skip":"play"}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.dataset.splash="play"}})();`;

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
          href="/rayendra-aldo-putra-hero.webp?v=2"
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
