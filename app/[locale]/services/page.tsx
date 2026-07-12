import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale, "services");
  return pageMetadata({
    locale,
    path: "/services",
    title: ui[locale].labels.services,
    description: content.intro,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale, "services");

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      <section className="py-(--spacing-section)">
        <h1 className="max-w-2xl text-3xl font-semibold text-text sm:text-4xl">
          {content.intro}
        </h1>
      </section>

      {content.services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="border-t border-line py-(--spacing-section)"
        >
          <h2 className="text-2xl font-semibold text-text">{service.hook}</h2>
          {service.description && (
            <p className="mt-4 max-w-2xl text-muted">{service.description}</p>
          )}
          <ul className="mt-6 max-w-2xl space-y-2 text-sm text-muted">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span aria-hidden="true" className="text-amber">
                  ·
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {service.engagementNote && (
            <p className="mt-6 max-w-2xl text-sm text-muted">{service.engagementNote}</p>
          )}
          <p className="mt-4 font-mono text-xs text-muted">{service.whatYouOwn}</p>
          {service.assessmentCta && (
            <Link
              href={`/${locale}${service.assessmentCta.href}`}
              className="mt-4 inline-block text-sm text-amber hover:underline"
            >
              {service.assessmentCta.label} →
            </Link>
          )}
        </section>
      ))}
    </div>
  );
}
