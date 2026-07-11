"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

interface NavProps {
  locale: Locale;
}

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/ai-assessment", label: "AI Assessment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

function LocaleSwitcher({
  locale,
  pathname,
  className,
}: {
  locale: Locale;
  pathname: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 font-mono text-xs ${className ?? ""}`}>
      {locales.map((target, i) => (
        <span key={target} className="flex items-center gap-2">
          {i > 0 && <span className="text-line">/</span>}
          <Link
            href={withLocale(pathname, target)}
            aria-current={locale === target ? "page" : undefined}
            className={locale === target ? "text-amber" : "text-muted hover:text-text"}
          >
            {target.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

export default function Nav({ locale }: NavProps) {
  const pathname = usePathname();

  return (
    <header className="relative border-b border-line">
      <div className="mx-auto flex max-w-(--container-site) items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-base font-semibold text-text sm:text-lg">
            radosav brdar
          </span>
          <span className="hidden font-mono text-xs text-muted sm:inline">
            identitet
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-sm text-muted hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} pathname={pathname} />
        </nav>

        {/* Native <details>/<summary> disclosure: no JS required to open/close,
            so it can't be broken by a hydration race or a missed touch event
            on a real device (unlike a React onClick + useState toggle). */}
        <details className="group md:hidden">
          <summary
            aria-controls="mobile-nav"
            className="cursor-pointer list-none font-mono text-xs text-muted marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className="group-open:hidden">menu</span>
            <span className="hidden group-open:inline">close</span>
          </summary>

          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="absolute inset-x-0 top-full hidden border-t border-line bg-ink group-open:block"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block py-2 text-sm text-muted hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <LocaleSwitcher locale={locale} pathname={pathname} />
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
