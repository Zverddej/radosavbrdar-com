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

interface ContentMap {
  home: HomeContent;
  services: ServicesPageContent;
  assessment: AssessmentContent;
  about: AboutContent;
  contact: ContactContent;
  privacy: PrivacyContent;
}

// sr isn't populated until Phase 7 -- falls back to en per the plan.
const content: Record<Locale, Partial<ContentMap>> = {
  en: {
    home: homeEn,
    services: servicesEn,
    assessment: assessmentEn,
    about: aboutEn,
    contact: contactEn,
    privacy: privacyEn,
  },
  sr: {},
};

export function getContent<K extends keyof ContentMap>(
  locale: Locale,
  page: K,
): ContentMap[K] {
  return (content[locale][page] ?? content.en[page]) as ContentMap[K];
}
