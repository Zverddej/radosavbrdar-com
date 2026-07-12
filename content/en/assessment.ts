import type { AssessmentContent } from "@/content/types";
import { CONTACT_MAILTO } from "@/lib/site";

// Verbatim from ai-assessment-tournament.md PART 4 -> FINAL PAGE: /ai-assessment.
//
// Price: the tournament doc's own placeholder is "[X] €" (see "Open items
// before this page ships", item 1). DEV-LOG 000 recorded Rade's launch-kit
// decision (3.000 EUR remote / 4.500 EUR on-site); DEV-LOG 005 records the
// exact on-site phrasing Rade resolved this TODO with. The founding-client
// rate (2.000 EUR) stays off this page -- it's an explicitly private offer,
// not public copy.
//
// Email/booking links below get the same DEV-LOG 006 treatment as Home's
// (contact email resolved; booking tool still TODO, mailto: as the v1
// fallback) -- Rade's instruction named Phase 3's four links specifically,
// but this page carries the identical unresolved facts, so left inconsistent
// it would read as a bug rather than an open TODO. Flagged in DEV-LOG 006.
export const assessment: AssessmentContent = {
  hero: {
    headline:
      "In 14 days, you'll know exactly what AI can do for your firm — before you spend real money on it.",
    body: "A fixed-price engineering assessment. By day 8 you'll see a working search over a sample of your own documents. By day 14 you'll hold a deployment plan you own — whether we build it together or not.",
    priceLine:
      "Fixed price: 3.000 € (remote) · 4.500 € with on-site days (EU, travel included)",
    // TODO: booking tool still undecided; points at the resolved contact
    // email for v1 per Rade, may become a booking link later.
    cta: { label: "Book the assessment", href: CONTACT_MAILTO },
  },
  questions: [
    {
      heading: "Is your data actually usable?",
      body: "Quality, structure, volume — measured, not assumed.",
    },
    {
      heading: "Which use case pays back first?",
      body: "Ranked by effort vs. impact, with your team's input.",
    },
    {
      heading: "What does sovereign AI really cost to run?",
      body: "Hardware, hosting, maintenance — a 12-month projection, not a guess.",
    },
  ],
  timeline: {
    // StatusStrip per the plan ("day 01–03 · data audit"); values are the
    // same phase names as the headings below, case-normalized for the mono
    // status-line convention established in Phase 1.
    statusStrip: [
      { label: "day 01–03", value: "data audit" },
      { label: "day 04–08", value: "proof of concept" },
      { label: "day 09–14", value: "the plan" },
    ],
    phases: [
      {
        range: "Days 1–3",
        heading: "Data audit.",
        body: "I sample your documents and workflows. You learn immediately if there's a structural blocker.",
      },
      {
        range: "Days 4–8",
        heading: "Proof of concept.",
        body: "A working search over a sample of your own documents, on private infrastructure. Not a demo with my data — a test with yours.",
      },
      {
        range: "Days 9–14",
        heading: "The plan.",
        body: "Use-case ranking, data readiness report, infrastructure spec (on-premise vs. EU-hosted private server), 12-month total cost of ownership, and a clear go/no-go recommendation.",
      },
    ],
  },
  documentIsYours: {
    body: 'The plan is written so that your team — or any competent vendor — can execute it. If the honest answer is "AI isn\'t ready for your workflow yet," the plan will say so. I\'d rather lose a build project than deliver one that shouldn\'t exist.',
  },
  whyFixedPrice: {
    body: "Most failed AI projects fail before the first line of code — wrong use case, wrong data, wrong expectations. The assessment is two weeks of finding that out for a fixed price, instead of six months of finding it out in production.",
    worstCase: "Worst case: you spend 3.000 € and learn AI isn't ready for your firm yet.",
    highlight: 'That\'s the cheapest "no" you\'ll ever buy.',
  },
  whoThisIsFor: {
    body: 'Law firms, medical practices, engineering bureaus, and any EU organization where documents are confidential by law or by contract. If your compliance officer winces at "cloud AI," this assessment was designed for you.',
  },
  cta: {
    heading: "One call to start.",
    body: "30 minutes, no pitch. We check fit, pick a sample of documents, and schedule day 1.",
    links: [
      // TODO: booking tool still undecided; points at the resolved contact
      // email for v1 per Rade, may become a booking link later.
      { label: "Book the call", href: CONTACT_MAILTO },
      { label: "Email", href: CONTACT_MAILTO },
    ],
  },
};
