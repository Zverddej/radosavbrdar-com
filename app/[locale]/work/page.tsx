import CaseCard from "@/components/CaseCard";
import { getAllCases } from "@/lib/work";
import type { Locale } from "@/lib/i18n";

// Verbatim from website-copy-tournament.md PART 5 -> WORK.
const INTRO = "Five projects, curated. Each one: the problem, what I built, what happened.";

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
        <h1 className="max-w-2xl text-3xl font-semibold text-text sm:text-4xl">{INTRO}</h1>
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
