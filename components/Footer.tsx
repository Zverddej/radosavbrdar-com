import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const strings = ui[locale];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-(--container-site) flex-col gap-4 px-6 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>{strings.footer.imprintLine}</p>

        <nav aria-label={strings.footer.ariaLabel} className="flex items-center gap-4">
          <Link href={`/${locale}/contact`} className="hover:text-text">
            {strings.labels.contact}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-text">
            {strings.labels.privacy}
          </Link>
        </nav>
      </div>
      {/* TODO: full imprint line (legal form + APR matični broj / PIB) — pending Rade, wired in Phase 6 */}
    </footer>
  );
}
