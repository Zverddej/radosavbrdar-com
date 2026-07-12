import type { AboutContent } from "@/content/types";

// Verbatim from content-of-record-completion.md PART 2 -> ABOUT PAGE
// (Phase 6, full copy) -- supersedes the shorter "compressed V2 arc" draft
// in website-copy-tournament.md, per that doc's own "(Phase 6, full copy)"
// label. Section labels like "The arc:" / "The studio:" in the source are
// the doc's own organizational headers, not page copy, so they're dropped;
// "How I work" was bolded in the source (unlike those labels), signaling
// it's meant to render as an actual heading.
export const about: AboutContent = {
  hero: {
    headline: "I've reinvented my craft five times in thirty years.",
    body: "The principle never changed: understand the system, then build it properly.",
  },
  arc: [
    "Prepress and graphic production in the 90s — where a mistake meant reprinting ten thousand sheets, and precision became a habit rather than a virtue. Then 360° photography: close to 60 million views on Google Maps, over a thousand businesses put on the map. Then the web — hundreds of sites, brands, and campaigns built for companies across the region. A business directory founded and run. A local street-view platform built from scratch.",
    "And now: private AI systems. Retrieval, search, and language models running on hardware I can physically touch — my own inference servers, my own deployments, my own uptime to answer for. No rented magic, no black boxes.",
    "Each of these was a different craft. All of them were the same job: take a system apart, understand it honestly, build it properly.",
  ],
  howIWork: {
    heading: "How I work",
    items: [
      {
        heading: "In phases.",
        body: "Every project is broken into phases with one goal each, a fixed scope, and an explicit acceptance check. You always know what's being built, what it costs, and when it's done.",
      },
      {
        heading: "Directly.",
        body: "You talk to the person doing the work. Questions get answered by whoever wrote the code — usually the same day.",
      },
      {
        heading: "For ownership.",
        body: "Everything I build is designed to be handed over: documented, explained, and runnable without me. The measure of a good system is that it doesn't need its builder.",
      },
    ],
  },
  studio: {
    body: "identitet is the studio name this work lives under — a one-person studio by design, with a network of long-term specialist collaborators for larger builds, and an EU-based delivery partnership for deployments inside the Union. Based in Sombor, Serbia. Working across the EU.",
  },
};
