import type { ContactContent } from "@/content/types";
import { CONTACT_MAILTO, LINKEDIN_URL } from "@/lib/site";

// Verbatim from content-of-record-completion.md PART 3 -> CONTACT PAGE
// (Phase 6, full copy).
export const contact: ContactContent = {
  hero: {
    headline: "Bring your problem, not a brief.",
    body: "The fastest way to find out if we should work together is a 30-minute call. No pitch, no deck. Describe the problem; I'll tell you honestly whether I'm the right person for it — and if I'm not, who is.",
  },
  links: [
    { label: "Email", href: CONTACT_MAILTO },
    { label: "LinkedIn", href: LINKEDIN_URL },
    // TODO: booking tool still undecided (Cal.com/Calendly URL, or removed
    // for v1). Per Rade: for v1, point at the resolved contact email; a
    // booking link may replace this once the tool is picked.
    { label: "Book a call", href: CONTACT_MAILTO },
  ],
  identity: [
    "Radosav Brdar · identitet studio",
    "Sombor, Serbia · working across the EU",
    "Response time: within one business day.",
  ],
};
