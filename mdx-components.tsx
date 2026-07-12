import type { MDXComponents } from "mdx/types";

// Required by @next/mdx for the App Router. Styles the Context/Solution/
// Stack/Outcome headings and prose that case-study .mdx bodies compile down
// to (app/[locale]/work/[slug]/page.tsx renders the compiled component
// directly, no wrapper markup needed for typography).
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-semibold text-text first:mt-0">{children}</h2>
  ),
  p: ({ children }) => <p className="mt-4 max-w-2xl text-muted">{children}</p>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
