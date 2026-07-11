import type { Locale } from "@/lib/i18n";
import type { HomeContent } from "@/content/types";
import { home as homeEn } from "@/content/en/home";

interface ContentMap {
  home: HomeContent;
}

// sr isn't populated until Phase 7 -- falls back to en per the plan.
const content: Record<Locale, Partial<ContentMap>> = {
  en: { home: homeEn },
  sr: {},
};

export function getContent<K extends keyof ContentMap>(
  locale: Locale,
  page: K,
): ContentMap[K] {
  return (content[locale][page] ?? content.en[page]) as ContentMap[K];
}
