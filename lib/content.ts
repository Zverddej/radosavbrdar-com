import type { Locale } from "@/lib/i18n";
import type {
  HomeContent,
  ServicesPageContent,
  AssessmentContent,
  AboutContent,
  ContactContent,
  PrivacyContent,
} from "@/content/types";
import { home as homeEn } from "@/content/en/home";
import { services as servicesEn } from "@/content/en/services";
import { assessment as assessmentEn } from "@/content/en/assessment";
import { about as aboutEn } from "@/content/en/about";
import { contact as contactEn } from "@/content/en/contact";
import { privacy as privacyEn } from "@/content/en/privacy";
import { home as homeSr } from "@/content/sr/home";
import { services as servicesSr } from "@/content/sr/services";
import { assessment as assessmentSr } from "@/content/sr/assessment";
import { about as aboutSr } from "@/content/sr/about";
import { contact as contactSr } from "@/content/sr/contact";
import { privacy as privacySr } from "@/content/sr/privacy";

interface ContentMap {
  home: HomeContent;
  services: ServicesPageContent;
  assessment: AssessmentContent;
  about: AboutContent;
  contact: ContactContent;
  privacy: PrivacyContent;
}

// Phase 7 removed the en fallback: both locales are complete, and the
// Record type makes a missing page a compile error rather than a silent
// English page on /sr.
const content: Record<Locale, ContentMap> = {
  en: {
    home: homeEn,
    services: servicesEn,
    assessment: assessmentEn,
    about: aboutEn,
    contact: contactEn,
    privacy: privacyEn,
  },
  sr: {
    home: homeSr,
    services: servicesSr,
    assessment: assessmentSr,
    about: aboutSr,
    contact: contactSr,
    privacy: privacySr,
  },
};

export function getContent<K extends keyof ContentMap>(
  locale: Locale,
  page: K,
): ContentMap[K] {
  // `locale` is trusted by type, but a request like /xx/ still runs a page's
  // generateMetadata before the layout's notFound() guard settles -- guard
  // here so that request 404s instead of crashing on content["xx"].
  return (content[locale] ?? content.en)[page];
}
