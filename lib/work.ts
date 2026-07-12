import type { CaseFrontmatter } from "@/content/types";
import { frontmatter as archiveRag } from "@/content/work/archive-rag.mdx";
import { frontmatter as tennisClubSaas } from "@/content/work/tennis-club-saas.mdx";
import { frontmatter as cosmeticsBrand } from "@/content/work/cosmetics-brand.mdx";
import { frontmatter as legalAi } from "@/content/work/legal-ai.mdx";
import { frontmatter as agritechPlatform } from "@/content/work/agritech-platform.mdx";

// Explicit map, no filesystem globbing -- consistent with lib/content.ts and
// lib/i18n.ts's "no dynamic magic beyond a simple map" approach. Also lets
// generateStaticParams (app/[locale]/work/[slug]/page.tsx) know every slug
// at build time.
const allCases: CaseFrontmatter[] = [
  archiveRag,
  tennisClubSaas,
  cosmeticsBrand,
  legalAi,
  agritechPlatform,
].sort((a, b) => a.order - b.order);

export function getAllCases(): CaseFrontmatter[] {
  return allCases;
}

export function getFeaturedCases(): CaseFrontmatter[] {
  return allCases.filter((c) => c.featured);
}

export function getCaseBySlug(slug: string): CaseFrontmatter | undefined {
  return allCases.find((c) => c.slug === slug);
}
