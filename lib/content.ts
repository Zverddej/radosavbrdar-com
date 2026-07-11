import type { Locale } from "@/lib/i18n";
import type { HomeContent, ServicesPageContent, AssessmentContent } from "@/content/types";
import { home as homeEn } from "@/content/en/home";
import { services as servicesEn } from "@/content/en/services";
import { assessment as assessmentEn } from "@/content/en/assessment";

interface ContentMap {
  home: HomeContent;
  services: ServicesPageContent;
  assessment: AssessmentContent;
}

// sr isn't populated until Phase 7 -- falls back to en per the plan.
const content: Record<Locale, Partial<ContentMap>> = {
  en: { home: homeEn, services: servicesEn, assessment: assessmentEn },
  sr: {},
};

export function getContent<K extends keyof ContentMap>(
  locale: Locale,
  page: K,
): ContentMap[K] {
  return (content[locale][page] ?? content.en[page]) as ContentMap[K];
}
