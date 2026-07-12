import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import "../globals.css";

// This is the root layout (html/body live here, not in app/layout.tsx) --
// Next's documented App Router i18n pattern, so <html lang> can be "sr" on
// /sr routes instead of a hardcoded "en". Moved from app/layout.tsx in
// Phase 7.

// next/font downloads at build time and serves from our origin — no
// runtime requests to Google. latin-ext covers Serbian latinica (š č ć ž đ).
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Unknown locales must 404 at the routing level: now that this layout is the
// root layout (owns <html>), a notFound() thrown inside it -- or a page's
// generateMetadata running getContent() with a bogus locale -- has no parent
// boundary and would 500 instead.
export const dynamicParams = false;

// Site-wide metadata defaults; each page's generateMetadata supplies its own
// title/description/canonical (Phase 7).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Radosav Brdar",
    default: "Radosav Brdar · identitet studio",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale: Locale = locale;

  return (
    <html
      lang={activeLocale}
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav locale={activeLocale} />
        <main className="flex-1">{children}</main>
        <Footer locale={activeLocale} />
        <AnalyticsBeacon />
      </body>
    </html>
  );
}
