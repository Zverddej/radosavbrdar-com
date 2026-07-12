import type { PrivacyContent } from "@/content/types";
import { CONTACT_EMAIL } from "@/lib/site";

// Verbatim from content-of-record-completion.md PART 4 -> PRIVACY & IMPRINT
// (Phase 6, draft -- legal review TODO). "[email]" resolved to the
// confirmed contact address per Rade.
//
// TODO: this page is a draft -- pending legal review before launch, per
// the source doc's own "(Phase 6, draft — legal review TODO)" label.
// TODO: Imprint needs legal form + registration number (APR matični
// broj / PIB), still open -- see content/en/privacy.ts's `imprint`.
export const privacy: PrivacyContent = {
  heading: "Privacy, in plain language",
  intro: "This site is built the way I build everything: with as little of your data as possible.",
  points: [
    {
      heading: "No cookies.",
      body: "This site sets no cookies and uses no tracking pixels.",
    },
    {
      heading: "Analytics without surveillance.",
      body: "Traffic is measured with Cloudflare Web Analytics, a cookieless system that collects aggregate page statistics only — no personal identifiers, no cross-site tracking, no profiles.",
    },
    {
      heading: "Email.",
      body: "If you write to me, your message and address are used to reply to you and for nothing else. They are not added to any list and not shared with anyone.",
    },
    {
      heading: "Hosting.",
      body: "The site is served via Cloudflare's global network. Standard technical server logs may be processed by Cloudflare as infrastructure provider.",
    },
  ],
  questionsNote: `Questions about any of this: ${CONTACT_EMAIL}.`,
  imprintHeading: "Imprint",
  imprint: {
    lines: [
      "identitet — Radosav Brdar",
      "Sombor, Serbia",
      // TODO: legal form + registration number (APR matični broj / PIB) as
      // required for business identification -- open per Rade.
    ],
  },
};
