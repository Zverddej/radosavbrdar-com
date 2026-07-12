// @types/mdx only types the default export of *.mdx files; this augments it
// with the `frontmatter` named export every case study exports (see
// node_modules/@types/mdx/index.d.ts for the documented pattern -- the
// import must live inside the `declare module` block so this file has no
// top-level ESM syntax and is treated as a global augmentation script, not
// its own module). Scoped globally to *.mdx since MDX is case-studies-only
// per CLAUDE.md's stack lock.
declare module "*.mdx" {
  import type { CaseFrontmatter } from "@/content/types";

  export const frontmatter: CaseFrontmatter;
}
