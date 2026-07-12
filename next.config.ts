import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Phase 8: static export -- MDX did NOT block it (plain `export const
  // frontmatter` objects, no server-only features), so the plan's preferred
  // path applies; no OpenNext adapter needed. proxy.ts is unsupported under
  // export and was replaced by public/_redirects (see Phase 8 in the plan).
  output: "export",
  experimental: {
    // app/global-not-found.tsx -- the styled 404 exported as out/404.html.
    // Experimental flag, but its documented use case is exactly this app's
    // structure (root layout inside the [locale] dynamic segment, so there
    // is no static root layout to compose a normal not-found from).
    globalNotFound: true,
  },
};

// No remark/rehype plugins: case studies use a plain `export const
// frontmatter = {...}` object (Next's own documented pattern) instead of
// YAML frontmatter, so no remark-frontmatter plugin is needed -- keeps this
// working under Turbopack, which can't yet load non-serializable remark
// plugin options.
const withMDX = createMDX({});

export default withMDX(nextConfig);
