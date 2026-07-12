import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { getAllCases } from "@/lib/work";

// All routes x both locales, each entry carrying its hreflang alternates.
// Static by construction (explicit route list + the case map), so it
// survives the Phase 8 static export.
// Required under output: "export" -- the route is static anyway.
export const dynamic = "force-static";

const routes = [
  "",
  "/services",
  "/ai-assessment",
  "/work",
  "/about",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allRoutes = [
    ...routes,
    ...getAllCases().map((c) => `/work/${c.slug}`),
  ];

  return allRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${route}`,
          sr: `${SITE_URL}/sr${route}`,
        },
      },
    })),
  );
}
