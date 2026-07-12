import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
};

// No remark/rehype plugins: case studies use a plain `export const
// frontmatter = {...}` object (Next's own documented pattern) instead of
// YAML frontmatter, so no remark-frontmatter plugin is needed -- keeps this
// working under Turbopack, which can't yet load non-serializable remark
// plugin options.
const withMDX = createMDX({});

export default withMDX(nextConfig);
