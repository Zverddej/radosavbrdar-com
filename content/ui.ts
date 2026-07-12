import type { Locale } from "@/lib/i18n";

// Locale-keyed chrome labels (nav, footer, mobile menu). Not in the plan's
// file list -- added in Phase 7 because Nav/Footer had hardcoded EN labels
// from Phase 2, and "no EN fallbacks on /sr" includes the chrome. The same
// labels double as the page <title>s in each page's generateMetadata, so
// nav and metadata can't drift apart. SR labels follow the PART 5 glossary
// (product name „AI Snimak stanja", never „procena").
export interface UiStrings {
  labels: {
    work: string;
    services: string;
    assessment: string;
    about: string;
    contact: string;
    privacy: string;
  };
  navAriaLabel: string;
  menuOpen: string;
  menuClose: string;
  footer: {
    imprintLine: string;
    ariaLabel: string;
  };
}

export const ui: Record<Locale, UiStrings> = {
  en: {
    labels: {
      work: "Work",
      services: "Services",
      assessment: "AI Assessment",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
    },
    navAriaLabel: "Primary",
    menuOpen: "menu",
    menuClose: "close",
    footer: {
      imprintLine: "identitet — Radosav Brdar · Sombor, Serbia",
      ariaLabel: "Footer",
    },
  },
  sr: {
    labels: {
      work: "Radovi",
      services: "Usluge",
      assessment: "AI Snimak stanja",
      about: "O meni",
      contact: "Kontakt",
      privacy: "Privatnost",
    },
    navAriaLabel: "Glavna navigacija",
    menuOpen: "meni",
    menuClose: "zatvori",
    footer: {
      imprintLine: "identitet — Radosav Brdar · Sombor, Srbija",
      ariaLabel: "Podnožje",
    },
  },
};

export function navLinks(locale: Locale): { href: string; label: string }[] {
  const { labels } = ui[locale];
  return [
    { href: "/work", label: labels.work },
    { href: "/services", label: labels.services },
    { href: "/ai-assessment", label: labels.assessment },
    { href: "/about", label: labels.about },
    { href: "/contact", label: labels.contact },
  ];
}
