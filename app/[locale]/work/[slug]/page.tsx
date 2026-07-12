import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCases, getCaseBySlug } from "@/lib/work";
import { pageMetadata, PERSON_ID, personJsonLd, jsonLdString } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) {
    return {};
  }
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: caseData.title,
    description: `${caseData.problem} ${caseData.outcome}`,
  });
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  // Explicit-map style per lib/work.ts -- dynamicParams=false guarantees
  // `slug` is always one of the known cases by the time we get here.
  const { default: CaseBody } = await import(`@/content/work/${slug}.mdx`);

  // CreativeWork JSON-LD per the Phase 7 plan. Case-study prose is EN on
  // both locales ("en first" per the plan's folder structure), hence the
  // fixed inLanguage.
  const jsonLd = jsonLdString({
    "@graph": [
      personJsonLd(),
      {
        "@type": "CreativeWork",
        name: caseData.title,
        headline: caseData.title,
        description: caseData.problem,
        author: { "@id": PERSON_ID },
        dateCreated: String(caseData.year),
        keywords: caseData.stack.join(", "),
        inLanguage: "en",
        url: `${SITE_URL}/${locale}/work/${slug}`,
      },
    ],
  });

  return (
    <article className="mx-auto max-w-(--container-site) px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <header className="py-(--spacing-section)">
        <p className="font-mono text-sm text-muted">
          {caseData.sector} · {caseData.year}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold text-text sm:text-4xl">
          {caseData.title}
        </h1>
        {caseData.metric && caseData.metric.value !== "TODO" && (
          <p className="mt-6 font-mono text-sm text-amber">
            {caseData.metric.value}{" "}
            <span className="text-muted">{caseData.metric.label}</span>
          </p>
        )}
      </header>

      <div className="border-t border-line pb-(--spacing-section)">
        <CaseBody />
      </div>
    </article>
  );
}
