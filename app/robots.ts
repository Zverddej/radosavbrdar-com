import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required under output: "export" -- the route is static anyway.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
