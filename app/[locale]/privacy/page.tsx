import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale, "privacy");

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      <section className="py-(--spacing-section)">
        <h1 className="max-w-2xl text-3xl font-semibold text-text sm:text-4xl">
          {content.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-muted">{content.intro}</p>

        <div className="mt-10 max-w-2xl space-y-6">
          {content.points.map((point) => (
            <div key={point.heading}>
              <h2 className="text-lg font-semibold text-text">{point.heading}</h2>
              <p className="mt-2 text-sm text-muted">{point.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-muted">{content.questionsNote}</p>
      </section>

      <section className="border-t border-line py-(--spacing-section)">
        <h2 className="text-2xl font-semibold text-text">{content.imprintHeading}</h2>
        <div className="mt-4 font-mono text-sm text-muted">
          {content.imprint.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
