import type { Metadata } from "next";
import CaseCard from "@/components/CaseCard";
import { getAllCases } from "@/lib/work";
import { pageMetadata } from "@/lib/seo";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

// EN verbatim from website-copy-tournament.md PART 5 -> WORK; SR per the
// content-of-record PART 5 translation rules (Phase 7).
const INTRO: Record<Locale, string> = {
  en: "Five projects, curated. Each one: the problem, what I built, what happened.",
  sr: "Pet projekata, pažljivo odabranih. Za svaki: problem, šta sam napravio, šta se dogodilo.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/work",
    title: ui[locale].labels.work,
    description: INTRO[locale],
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const cases = getAllCases();

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      <section className="py-(--spacing-section)">
        <h1 className="max-w-2xl text-3xl font-semibold text-text sm:text-4xl">
          {INTRO[locale]}
        </h1>
      </section>

      <section className="border-t border-line py-(--spacing-section)">
        <div className="grid gap-6 sm:grid-cols-2">
          {cases.map((caseData) => (
            <CaseCard key={caseData.slug} caseData={caseData} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
