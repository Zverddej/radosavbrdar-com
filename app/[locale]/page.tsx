import Link from "next/link";
import StatusStrip from "@/components/StatusStrip";
import CaseCard from "@/components/CaseCard";
import { getContent } from "@/lib/content";
import { getFeaturedCases } from "@/lib/work";
import type { Locale } from "@/lib/i18n";
import type { CTALink } from "@/content/types";

// Only site-relative paths get locale-prefixed -- "#" (TODO placeholder)
// and "mailto:..." links pass through unchanged.
function href(locale: Locale, link: CTALink): string {
  return link.href.startsWith("/") ? `/${locale}${link.href}` : link.href;
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale, "home");
  const featuredCases = getFeaturedCases();

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      {/* 1. Hero */}
      <section className="py-(--spacing-section)">
        <h1 className="max-w-3xl text-3xl font-semibold text-text sm:text-4xl">
          {content.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{content.hero.subline}</p>
        <p className="mt-4 font-mono text-sm text-muted">{content.hero.identity}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {content.hero.ctas.map((cta, i) => (
            <Link
              key={cta.label}
              href={href(locale, cta)}
              className={
                i === 0
                  ? "border border-amber bg-amber px-5 py-3 text-sm font-medium text-ink"
                  : "border border-line px-5 py-3 text-sm font-medium text-text hover:border-amber"
              }
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Sovereignty beat */}
      <section className="border-t border-line py-(--spacing-section)">
        <h2 className="max-w-2xl text-2xl font-semibold text-text">
          {content.sovereignty.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{content.sovereignty.body}</p>
      </section>

      {/* 3. Three services */}
      <section className="border-t border-line py-(--spacing-section)">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {content.services.map((service) => (
            <div key={service.title}>
              <h2 className="text-lg font-semibold text-text">{service.title}</h2>
              <p className="mt-3 text-sm text-muted">{service.body}</p>
              <p className="mt-4 font-mono text-xs text-muted">{service.whatYouOwn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Differentiation */}
      <section className="border-t border-line py-(--spacing-section)">
        <h2 className="max-w-2xl text-2xl font-semibold text-text">
          {content.differentiation.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{content.differentiation.body}</p>
      </section>

      {/* 5. Proof strip */}
      <section className="border-t border-line py-(--spacing-section)">
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredCases.map((caseData) => (
            <CaseCard key={caseData.slug} caseData={caseData} locale={locale} />
          ))}
        </div>
        <Link
          href={href(locale, content.proof.allWorkCta)}
          className="mt-8 inline-block text-sm text-amber hover:underline"
        >
          {content.proof.allWorkCta.label} →
        </Link>
      </section>

      {/* 6. Credibility strip */}
      <section className="py-(--spacing-section)">
        <StatusStrip items={content.credibility} />
      </section>

      {/* 7. CTA block */}
      <section className="border-t border-line py-(--spacing-section)">
        <h2 className="max-w-2xl text-2xl font-semibold text-text">{content.cta.heading}</h2>
        <p className="mt-4 max-w-2xl text-muted">{content.cta.body}</p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          {content.cta.links.map((link) => (
            <Link
              key={link.label}
              href={href(locale, link)}
              className="text-text hover:text-amber"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
