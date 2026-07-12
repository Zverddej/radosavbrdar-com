import Link from "next/link";
import type { Metadata } from "next";
import StatusStrip from "@/components/StatusStrip";
import { getContent } from "@/lib/content";
import { pageMetadata, personJsonLd, PERSON_ID, jsonLdString } from "@/lib/seo";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import type { CTALink } from "@/content/types";

// Only site-relative paths get locale-prefixed -- "#" (TODO placeholder)
// and "mailto:..." links pass through unchanged.
function href(locale: Locale, link: CTALink): string {
  return link.href.startsWith("/") ? `/${locale}${link.href}` : link.href;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale, "assessment");
  return pageMetadata({
    locale,
    path: "/ai-assessment",
    title: ui[locale].labels.assessment,
    description: content.hero.body,
  });
}

export default async function AiAssessmentPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale, "assessment");

  // Service JSON-LD per the Phase 7 plan. Prices are the resolved public
  // priceLine facts (DEV-LOG 005), nothing invented; the offer descriptions
  // are that line's own two variants.
  const jsonLd = jsonLdString({
    "@graph": [
      personJsonLd(),
      {
        "@type": "Service",
        name: ui[locale].labels.assessment,
        description: content.hero.body,
        provider: { "@id": PERSON_ID },
        areaServed: "EU",
        offers: [
          {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "EUR",
            description: locale === "sr" ? "na daljinu" : "remote",
          },
          {
            "@type": "Offer",
            price: "4500",
            priceCurrency: "EUR",
            description:
              locale === "sr"
                ? "sa danima na licu mesta (EU, put uračunat)"
                : "with on-site days (EU, travel included)",
          },
        ],
      },
    ],
  });

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {/* Hero */}
      <section className="py-(--spacing-section)">
        <h1 className="max-w-3xl text-3xl font-semibold text-text sm:text-4xl">
          {content.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{content.hero.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href={href(locale, content.hero.cta)}
            className="border border-amber bg-amber px-5 py-3 text-sm font-medium text-ink"
          >
            {content.hero.cta.label}
          </Link>
          <p className="font-mono text-sm text-muted">{content.hero.priceLine}</p>
        </div>
      </section>

      {/* Section 1 -- three questions */}
      <section className="border-t border-line py-(--spacing-section)">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {content.questions.map((question, i) => (
            <div key={question.heading}>
              <h2 className="text-lg font-semibold text-text">
                <span className="mr-2 font-mono text-sm text-amber">{i + 1}.</span>
                {question.heading}
              </h2>
              <p className="mt-3 text-sm text-muted">{question.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 -- the 14 days */}
      <section className="border-t border-line py-(--spacing-section)">
        <StatusStrip items={content.timeline.statusStrip} />
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {content.timeline.phases.map((phase) => (
            <div key={phase.range}>
              <p className="font-mono text-xs text-muted">{phase.range}</p>
              <h3 className="mt-1 text-lg font-semibold text-text">{phase.heading}</h3>
              <p className="mt-3 text-sm text-muted">{phase.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 -- the document is yours */}
      <section className="border-t border-line py-(--spacing-section)">
        <p className="max-w-2xl text-muted">{content.documentIsYours.body}</p>
      </section>

      {/* Section 4 -- why fixed price */}
      <section className="border-t border-line py-(--spacing-section)">
        <p className="max-w-2xl text-muted">{content.whyFixedPrice.body}</p>
        <p className="mt-4 max-w-2xl text-muted">{content.whyFixedPrice.worstCase}</p>
        <p className="mt-4 max-w-2xl text-lg font-semibold text-text">
          {content.whyFixedPrice.highlight}
        </p>
      </section>

      {/* Section 5 -- who this is for */}
      <section className="border-t border-line py-(--spacing-section)">
        <p className="max-w-2xl text-muted">{content.whoThisIsFor.body}</p>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-(--spacing-section)">
        <h2 className="max-w-2xl text-2xl font-semibold text-text">{content.cta.heading}</h2>
        <p className="mt-4 max-w-2xl text-muted">{content.cta.body}</p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          {content.cta.links.map((link) => (
            <Link key={link.label} href={href(locale, link)} className="text-text hover:text-amber">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
