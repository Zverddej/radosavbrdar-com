import type { ContactContent } from "@/content/types";
import { CONTACT_MAILTO } from "@/lib/site";

// Serbian translation of content/en/contact.ts per content-of-record PART 5
// rules (see content/sr/home.ts header). Same open TODOs as the EN file:
// LinkedIn URL, booking tool (mailto is the v1 stand-in per Rade).
export const contact: ContactContent = {
  hero: {
    // Locked: "Bring your problem, not a brief."
    headline: "Donesite problem, ne brief.",
    body: "Najbrži način da saznamo da li treba da sarađujemo jeste razgovor od 30 minuta. Bez prodajne priče, bez prezentacije. Opišite problem; iskreno ću Vam reći da li sam prava osoba za njega — a ako nisam, ko jeste.",
  },
  links: [
    { label: "Email", href: CONTACT_MAILTO },
    // TODO: LinkedIn profile URL still not provided.
    { label: "LinkedIn", href: "#" },
    // TODO: booking tool still undecided (Cal.com/Calendly URL, or removed
    // for v1). Per Rade: for v1, point at the resolved contact email; a
    // booking link may replace this once the tool is picked.
    { label: "Zakažite razgovor", href: CONTACT_MAILTO },
  ],
  identity: [
    "Radosav Brdar · identitet studio",
    "Sombor, Srbija · radim širom EU",
    "Vreme odgovora: u roku od jednog radnog dana.",
  ],
};
