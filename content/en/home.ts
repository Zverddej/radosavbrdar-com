import type { HomeContent } from "@/content/types";
import { CONTACT_MAILTO, LINKEDIN_URL } from "@/lib/site";

// Verbatim from website-copy-tournament.md PART 5 -> HOME ("Own What You
// Build"). The proof-strip cases themselves come from lib/work.ts
// (getFeaturedCases(), Phase 5) rather than living here -- see
// content/work/*.mdx for that source. StatusStrip requires a label:value
// shape (Phase 1 spec); the four short labels below are structural, not
// present in the source sentences, which are otherwise unchanged as the
// `value`.
export const home: HomeContent = {
  hero: {
    headline: "I build systems you own — not subscriptions you rent.",
    subline:
      "Web platforms, private AI, and digital products that run on your infrastructure, on your terms.",
    identity: "Radosav Brdar · identitet studio · EU-based",
    ctas: [
      { label: "See the work", href: "/work" },
      // TODO: booking tool still undecided; points at the resolved contact
      // email for v1 per Rade, may become a booking link later.
      { label: "Book a call", href: CONTACT_MAILTO },
    ],
  },
  sovereignty: {
    heading: "Your data should never leave your building.",
    body: "Most AI tools require you to hand your documents to someone else's cloud. For legal firms, medical practices, and engineering bureaus in the EU, that's not a feature — it's a liability. I design and deploy AI systems that run entirely on infrastructure you control.",
  },
  services: [
    {
      title: "Private AI Systems",
      body: "Document intelligence, RAG search, and local LLM deployments — on your servers, behind your firewall.",
      whatYouOwn:
        "What you own when we're done: the models, the data, the infrastructure.",
    },
    {
      title: "Web Platforms & Products",
      body: "From e-commerce to multi-tenant SaaS. Next.js, PostgreSQL, modern stacks — built to be maintained, not just launched.",
      whatYouOwn:
        "What you own when we're done: the codebase, the deployment, the roadmap.",
    },
    {
      title: "Brand to Product",
      body: "Thirty years across design, photography, and development means your brand and your build come from one head — no translation loss.",
      whatYouOwn:
        "What you own when we're done: a system where design and code actually match.",
    },
  ],
  differentiation: {
    heading: "You work directly with the person who builds it.",
    body: "No account managers, no handoffs, no juniors learning on your budget. You explain the problem once — to the person who writes the code. For larger builds, I bring in specialists I've worked with for years, and I remain your single point of accountability.",
  },
  proof: {
    allWorkCta: { label: "All work", href: "/work" },
  },
  credibility: [
    { label: "experience", value: "30 years in visual & web technology" },
    { label: "reach", value: "60M+ views on Google Maps imagery" },
    { label: "deployments", value: "2 production private-AI deployments" },
    {
      label: "platform",
      value: "400+ companies on an invoicing platform I built and maintain",
    },
  ],
  cta: {
    heading: "Someone probably sent you here.",
    body: "The fastest way to see if we should work together is a 30-minute call. No pitch, no deck — bring your problem.",
    links: [
      { label: "Email", href: CONTACT_MAILTO },
      { label: "LinkedIn", href: LINKEDIN_URL },
      // TODO: booking tool still undecided; points at the resolved contact
      // email for v1 per Rade, may become a booking link later.
      { label: "Book a call", href: CONTACT_MAILTO },
    ],
  },
};
