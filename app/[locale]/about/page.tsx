import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale, "about");

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      <section className="py-(--spacing-section)">
        <h1 className="max-w-3xl text-3xl font-semibold text-text sm:text-4xl">
          {content.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{content.hero.body}</p>
      </section>

      <section className="border-t border-line py-(--spacing-section)">
        <div className="max-w-2xl space-y-4 text-muted">
          {content.arc.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-(--spacing-section)">
        <h2 className="text-2xl font-semibold text-text">{content.howIWork.heading}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {content.howIWork.items.map((item) => (
            <div key={item.heading}>
              <h3 className="text-lg font-semibold text-text">{item.heading}</h3>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-(--spacing-section)">
        <p className="max-w-2xl font-mono text-sm text-muted">{content.studio.body}</p>
      </section>
    </div>
  );
}
