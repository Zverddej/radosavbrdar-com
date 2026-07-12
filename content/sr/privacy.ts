import type { PrivacyContent } from "@/content/types";
import { CONTACT_EMAIL } from "@/lib/site";

// Serbian translation of content/en/privacy.ts per content-of-record PART 5
// rules (see content/sr/home.ts header).
//
// TODO: like the EN page, this is a draft -- pending legal review before
// launch, per the source doc's own "(Phase 6, draft — legal review TODO)".
// TODO: Imprint needs legal form + registration number (APR matični
// broj / PIB), still open.
export const privacy: PrivacyContent = {
  heading: "Privatnost, jednostavnim jezikom",
  intro:
    "Ovaj sajt je napravljen kao i sve što pravim: sa što manje Vaših podataka.",
  points: [
    {
      heading: "Bez kolačića.",
      body: "Ovaj sajt ne postavlja kolačiće i ne koristi piksele za praćenje.",
    },
    {
      heading: "Analitika bez nadzora.",
      body: "Poseta se meri pomoću Cloudflare Web Analytics — sistema bez kolačića koji prikuplja samo zbirnu statistiku stranica: bez ličnih identifikatora, bez praćenja preko drugih sajtova, bez profila.",
    },
    {
      heading: "Email.",
      body: "Ako mi pišete, Vaša poruka i adresa koriste se da Vam odgovorim — i ni za šta drugo. Ne dodaju se ni na kakvu listu i ne dele se ni sa kim.",
    },
    {
      heading: "Hosting.",
      body: "Sajt se poslužuje preko Cloudflare-ove globalne mreže. Standardne tehničke serverske logove Cloudflare može obrađivati kao infrastrukturni provajder.",
    },
  ],
  questionsNote: `Pitanja o bilo čemu od ovoga: ${CONTACT_EMAIL}.`,
  imprintHeading: "Impresum",
  imprint: {
    lines: [
      "identitet — Radosav Brdar",
      "Sombor, Srbija",
      // TODO: legal form + registration number (APR matični broj / PIB) as
      // required for business identification -- open per Rade.
    ],
  },
};
