import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const display = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raldoputradev.github.io"),
  title: {
    default: `${site.name} — Portofolio`,
    template: "%s",
  },
  description:
    "Portofolio Rayendra Aldo Putra (raldoputradev): mahasiswa Teknik Robotika di Politeknik Negeri Batam. Laravel, Flutter, ESP32, ROS2.",
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
  },
  icons: { icon: "/favicon.svg" },
};

/** Menentukan tema sebelum paint pertama supaya tidak ada kedip putih/hitam. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased text-ink">
        {children}
        <p className="sr-only">
          <Link href="/id/">Bahasa Indonesia</Link>
          <Link href="/en/">English</Link>
        </p>
      </body>
    </html>
  );
}
