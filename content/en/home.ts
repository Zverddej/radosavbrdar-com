import type { HomeContent } from "@/content/types";

// Verbatim from website-copy-tournament.md PART 5 -> HOME ("Own What You
// Build"). The proof-strip case facts (title/problem/stack/outcome) are
// verbatim frontmatter from content-of-record-completion.md PART 1, cases
// 1-4 (the four `featured: true` entries) -- Phase 5 wires the same source
// into the real /work/[slug] pages, so these stay identical rather than
// drifting. StatusStrip requires a label:value shape (Phase 1 spec); the
// four short labels below are structural, not present in the source
// sentences, which are otherwise unchanged as the `value`.
export const home: HomeContent = {
  hero: {
    headline: "I build systems you own — not subscriptions you rent.",
    subline:
      "Web platforms, private AI, and digital products that run on your infrastructure, on your terms.",
    identity: "Radosav Brdar · identitet studio · EU-based",
    ctas: [
      { label: "See the work", href: "/work" },
      // TODO: "Book a call" destination pending Contact page booking-tool
      // decision (Cal.com/Calendly URL, or removed for v1 -- content-of-record PART 3).
      { label: "Book a call", href: "#" },
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
    cases: [
      {
        slug: "archive-rag",
        title: "Private RAG for a Historical Research Archive",
        problem:
          "A 100k+ page WWII archive, unsearchable: scanned microfilm, mixed German and English, no digital index.",
        stack: [
          "fastapi",
          "qdrant",
          "bge-m3",
          "hybrid-search",
          "self-hosted-llm",
          "ocr-pipeline",
        ],
        outcome:
          "Full-text semantic search over the entire corpus, running on private infrastructure.",
      },
      {
        slug: "tennis-club-saas",
        title: "Booking & Membership Platform for a Tennis Club",
        problem:
          "Court booking by phone calls and paper lists — double bookings, no membership rule enforcement, no visibility.",
        stack: ["nextjs", "prisma", "postgresql", "telegram-bot", "pwa"],
        outcome:
          "Self-service booking with automatic rule enforcement, running as a PWA members use daily.",
      },
      {
        slug: "cosmetics-brand",
        title: "Skinissima — Brand Foundation to Production Website",
        problem:
          "A new natural cosmetics brand with strong products and no identity, no digital presence, no launch plan.",
        stack: [
          "brand-strategy",
          "identity-design",
          "nextjs",
          "tailwind",
          "seo-geo",
        ],
        outcome:
          "Complete brand system and a production website sharing one design language, launch-ready.",
      },
      {
        slug: "legal-ai",
        title: "Legal AI Assistant for Municipal Administration",
        problem:
          "Municipal legal teams answering the same regulatory questions repeatedly, across four jurisdictions' legislation.",
        stack: ["rag", "faiss", "regional-llm", "python"],
        outcome:
          "A legal question-answering system over regional legislation, developed with an EU-based partner.",
      },
    ],
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
      // TODO: contact email undecided (rade@identitet.rs vs hello@radosavbrdar.com
      // -- content-of-record PART 3); wire mailto: once confirmed.
      { label: "Email", href: "#" },
      // TODO: LinkedIn profile URL not yet provided (content-of-record PART 3).
      { label: "LinkedIn", href: "#" },
      // TODO: "Book a call" destination pending Contact page booking-tool
      // decision (Cal.com/Calendly URL, or removed for v1 -- content-of-record PART 3).
      { label: "Book a call", href: "#" },
    ],
  },
};
