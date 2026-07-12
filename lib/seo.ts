import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

// Shared Phase 7 SEO plumbing: canonical + hreflang alternates per page, OG
// defaults, and the JSON-LD entities that appear on more than one page.
// Titles/descriptions themselves come from the content files -- nothing
// here invents copy.

const OG_IMAGE = "/og/og-default.png";

export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string; // route path without the locale segment, "" for Home
  title: string;
  description: string;
  // Home opts out of the "%s — Radosav Brdar" template (its title IS the name).
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = `${SITE_URL}/${locale}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en${path}`,
        sr: `${SITE_URL}/sr${path}`,
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Radosav Brdar · identitet studio",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      locale: locale === "sr" ? "sr_RS" : "en_US",
      alternateLocale: locale === "sr" ? ["en_US"] : ["sr_RS"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

// JSON-LD ---------------------------------------------------------------
// Facts only from the content of record: name, studio, Sombor/Serbia,
// resolved contact email, "working across the EU". LinkedIn is deliberately
// absent from sameAs -- the URL is still an open TODO, not to be invented.

export const PERSON_ID = `${SITE_URL}/#person`;
export const STUDIO_ID = `${SITE_URL}/#studio`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Radosav Brdar",
    url: SITE_URL,
    email: `mailto:${CONTACT_EMAIL}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sombor",
      addressCountry: "RS",
    },
  };
}

export function studioJsonLd(description: string) {
  return {
    "@type": "ProfessionalService",
    "@id": STUDIO_ID,
    name: "identitet studio",
    description,
    url: SITE_URL,
    email: `mailto:${CONTACT_EMAIL}`,
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sombor",
      addressCountry: "RS",
    },
    areaServed: "EU",
  };
}

// Serializer for the <script type="application/ld+json"> blocks. "<" is
// escaped so content strings can never terminate the script element early.
export function jsonLdString(data: object): string {
  return JSON.stringify(
    { "@context": "https://schema.org", ...data },
    null,
    0,
  ).replace(/</g, "\\u003c");
}
