import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StatusStrip from "@/components/StatusStrip";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import { defaultLocale } from "@/lib/i18n";
import "./globals.css";

// Global 404 (exported as out/404.html, served by Workers static assets via
// not_found_handling: "404-page"). global-not-found bypasses all layouts, so
// it declares its own html/fonts -- same config as app/[locale]/layout.tsx.
// The URL carries no locale, so chrome defaults to EN with a bilingual body
// line; the microcopy here is chrome-level (no 404 copy exists in the copy
// docs), flagged in DEV-LOG 008.

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Radosav Brdar",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav locale={defaultLocale} />
        <main className="flex-1">
          <div className="mx-auto max-w-(--container-site) px-6">
            <section className="py-(--spacing-section)">
              <StatusStrip
                items={[{ label: "status", value: "404 · page not found" }]}
              />
              <h1 className="mt-10 max-w-2xl text-3xl font-semibold text-text sm:text-4xl">
                Page not found.
              </h1>
              <p className="mt-4 max-w-2xl text-muted">Stranica ne postoji.</p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
                <Link href="/en" className="text-text hover:text-amber">
                  Home
                </Link>
                <Link href="/sr" className="text-text hover:text-amber">
                  Početna
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer locale={defaultLocale} />
        <AnalyticsBeacon />
      </body>
    </html>
  );
}
