import type { ServicesPageContent } from "@/content/types";

// Verbatim from website-copy-tournament.md PART 5 -> SERVICES.
export const services: ServicesPageContent = {
  intro: "Everything below exists because a client needed it and I built it.",
  services: [
    {
      id: "private-ai",
      hook: "AI that never phones home.",
      description:
        "For organizations where confidentiality isn't optional: law firms, medical practices, engineering bureaus, archives.",
      bullets: [
        "Document intelligence & RAG search over your internal knowledge",
        "Local LLM deployment on your hardware or EU-hosted private servers",
        "Multi-tenant setups with server-side access control",
        "GDPR-aligned by architecture, not by promise",
      ],
      engagementNote:
        "Engagement: starts with a paid discovery (\"AI Assessment\") — a fixed-price audit of your data, use case, and infrastructure, ending in a concrete deployment plan. You keep the plan whether or not we proceed.",
      whatYouOwn: "What you own: models, embeddings, data, servers, documentation.",
      // Plan: "Private AI section links prominently to /ai-assessment" -- the
      // link text is the exact quoted term from the engagement note above,
      // not new copy.
      assessmentCta: { label: "AI Assessment", href: "/ai-assessment" },
    },
    {
      id: "web",
      hook: "Built to be maintained, not just launched.",
      bullets: [
        "E-commerce with local compliance (fiscalization, regional payment gateways)",
        "Multi-tenant SaaS platforms",
        "Performance-first sites: Next.js, Tailwind, PostgreSQL",
        "Migrations from legacy WordPress to modern stacks",
      ],
      whatYouOwn:
        "What you own: full codebase, deployment pipeline, and the knowledge transfer to run it.",
    },
    {
      id: "brand",
      hook: "One head, no translation loss.",
      description:
        "Brand strategy, identity design, and the product build — as one continuous system. Logo to design system to production code.",
      bullets: [
        "Brand foundation workshops",
        "Identity & design systems",
        "The website/product that actually implements them",
      ],
      whatYouOwn: "What you own: brand assets, design system, and a product that matches both.",
    },
  ],
};
