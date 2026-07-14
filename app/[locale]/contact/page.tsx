import Link from "next/link";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import MailtoNote from "@/components/MailtoNote";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale, "contact");
  return pageMetadata({
    locale,
    path: "/contact",
    title: ui[locale].labels.contact,
    description: `${content.hero.headline} ${content.hero.body}`,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = getContent(locale, "contact");

  return (
    <div className="mx-auto max-w-(--container-site) px-6">
      <section className="py-(--spacing-section)">
        <h1 className="max-w-2xl text-3xl font-semibold text-text sm:text-4xl">
          {content.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{content.hero.body}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
          {content.links.map((link) => (
            <Link key={link.label} href={link.href} className="text-text hover:text-amber">
              {link.label}
            </Link>
          ))}
          <MailtoNote links={content.links} className="text-xs" />
        </div>

        <div className="mt-10 font-mono text-sm text-muted">
          {content.identity.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
