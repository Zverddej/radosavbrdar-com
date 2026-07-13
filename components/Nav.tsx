"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { ui, navLinks } from "@/content/ui";

interface NavProps {
  locale: Locale;
}

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
  // usePathname() is null while prerendering outside a matched route (the
  // global-not-found page) -- fall back to the locale root so the switcher
  // still renders sane hrefs there.
  const pathname = usePathname() ?? `/${locale}`;
  const strings = ui[locale];
  const links = navLinks(locale);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // The mobile <details> is a persistent DOM node across client-side route
  // changes (Nav lives in the layout, not the page) -- its native `open`
  // state doesn't get reset on navigation. Closing it on every pathname
  // change covers link taps, the locale switcher, and browser back/forward
  // alike, without giving up the native disclosure from Phase 2.
  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }, [pathname]);

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

        <nav aria-label={strings.navAriaLabel} className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
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
        <details ref={detailsRef} className="group md:hidden">
          <summary
            aria-controls="mobile-nav"
            className="cursor-pointer list-none font-mono text-xs text-muted marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className="group-open:hidden">{strings.menuOpen}</span>
            <span className="hidden group-open:inline">{strings.menuClose}</span>
          </summary>

          <nav
            id="mobile-nav"
            aria-label={strings.navAriaLabel}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-ink group-open:block"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
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
