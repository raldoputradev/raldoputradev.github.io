import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans-v",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-v",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-v",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: "Portfolio of Rayendra Aldo Putra — Robotics Engineering student building end-to-end systems.",
  icons: { icon: "/favicon.svg", apple: "/logo-rap.png" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
