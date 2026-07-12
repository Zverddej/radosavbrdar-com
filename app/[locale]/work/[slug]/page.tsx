import { notFound } from "next/navigation";
import { getAllCases, getCaseBySlug } from "@/lib/work";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  // Explicit-map style per lib/work.ts -- dynamicParams=false guarantees
  // `slug` is always one of the known cases by the time we get here.
  const { default: CaseBody } = await import(`@/content/work/${slug}.mdx`);

  return (
    <article className="mx-auto max-w-(--container-site) px-6">
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
