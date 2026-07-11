"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

export default function Nav({ locale }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-(--container-site) items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-base font-semibold text-text sm:text-lg">
            radosav brdar
          </span>
          <span className="hidden font-mono text-xs text-muted sm:inline">
            identitet
          </span>
        </Link>

        <button
          type="button"
          className="font-mono text-xs text-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "close" : "menu"}
        </button>

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
          <div className="flex items-center gap-2 font-mono text-xs">
            {locales.map((target, i) => (
              <span key={target} className="flex items-center gap-2">
                {i > 0 && <span className="text-line">/</span>}
                <Link
                  href={withLocale(pathname, target)}
                  aria-current={locale === target ? "page" : undefined}
                  className={
                    locale === target
                      ? "text-amber"
                      : "text-muted hover:text-text"
                  }
                >
                  {target.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>
        </nav>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="block py-2 text-sm text-muted hover:text-text"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-2 font-mono text-xs">
              {locales.map((target, i) => (
                <span key={target} className="flex items-center gap-2">
                  {i > 0 && <span className="text-line">/</span>}
                  <Link
                    href={withLocale(pathname, target)}
                    aria-current={locale === target ? "page" : undefined}
                    className={
                      locale === target
                        ? "text-amber"
                        : "text-muted hover:text-text"
                    }
                    onClick={() => setOpen(false)}
                  >
                    {target.toUpperCase()}
                  </Link>
                </span>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
