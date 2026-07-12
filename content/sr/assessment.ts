import type { AssessmentContent } from "@/content/types";
import { CONTACT_MAILTO } from "@/lib/site";

// Serbian translation of content/en/assessment.ts per content-of-record
// PART 5 rules (see content/sr/home.ts header). Product name on SR is
// „AI Snimak stanja" (existing name); "assessment" in running text is
// „snimak stanja", never „procena".
//
// Same open TODO as the EN file: booking tool undecided, mailto: is the v1
// stand-in per Rade (DEV-LOG 006).
export const assessment: AssessmentContent = {
  hero: {
    // Locked base: "Za 14 dana znaćete tačno šta AI može da uradi za Vašu
    // firmu." -- the EN headline's trailing clause is appended.
    headline:
      "Za 14 dana znaćete tačno šta AI može da uradi za Vašu firmu — pre nego što na to potrošite ozbiljan novac.",
    body: "Inženjerski snimak stanja po fiksnoj ceni. Do osmog dana videćete pretragu koja radi nad uzorkom Vaših sopstvenih dokumenata. Do četrnaestog dana držaćete u rukama plan uvođenja koji je Vaš — bez obzira na to da li ga gradimo zajedno ili ne.",
    priceLine:
      "Fiksna cena: 3.000 € (na daljinu) · 4.500 € sa danima na licu mesta (EU, put uračunat)",
    // TODO: booking tool still undecided; points at the resolved contact
    // email for v1 per Rade, may become a booking link later.
    cta: { label: "Zakažite snimak stanja", href: CONTACT_MAILTO },
  },
  questions: [
    {
      heading: "Da li su Vaši podaci zaista upotrebljivi?",
      body: "Kvalitet, struktura, obim — izmereni, ne pretpostavljeni.",
    },
    {
      heading: "Koja primena se prva isplati?",
      body: "Rangirano po odnosu uloženog i dobijenog, uz učešće Vašeg tima.",
    },
    {
      heading: "Koliko suvereni AI zaista košta u radu?",
      body: "Hardver, hosting, održavanje — projekcija za 12 meseci, ne nagađanje.",
    },
  ],
  timeline: {
    // Same mono status-line convention as EN; "proof of concept" stays
    // English (established technical term).
    statusStrip: [
      { label: "dan 01–03", value: "pregled podataka" },
      { label: "dan 04–08", value: "proof of concept" },
      { label: "dan 09–14", value: "plan" },
    ],
    phases: [
      {
        range: "Dan 1–3",
        heading: "Pregled podataka.",
        body: "Uzimam uzorak Vaših dokumenata i procesa rada. Odmah saznajete ako postoji strukturna prepreka.",
      },
      {
        range: "Dan 4–8",
        heading: "Proof of concept.",
        // Locked: "Not a demo with my data — a test with yours."
        body: "Pretraga koja radi nad uzorkom Vaših sopstvenih dokumenata, na privatnoj infrastrukturi. Ne demo sa mojim podacima — test sa Vašim.",
      },
      {
        range: "Dan 9–14",
        heading: "Plan.",
        body: "Rangiranje primena, izveštaj o spremnosti podataka, specifikacija infrastrukture (on-premise ili privatni server u EU), ukupni trošak vlasništva za 12 meseci i jasna preporuka: ići dalje ili ne.",
      },
    ],
  },
  documentIsYours: {
    body: "Plan je napisan tako da može da ga sprovede Vaš tim — ili bilo koji kompetentan izvođač. Ako je pošten odgovor „AI još nije spreman za Vaš proces rada\", plan će to i reći. Radije ću izgubiti projekat izgradnje nego isporučiti onaj koji ne bi trebalo da postoji.",
  },
  whyFixedPrice: {
    body: "Većina propalih AI projekata propadne pre prve linije koda — pogrešna primena, pogrešni podaci, pogrešna očekivanja. Snimak stanja je dve nedelje otkrivanja toga po fiksnoj ceni, umesto šest meseci otkrivanja u produkciji.",
    worstCase:
      "Najgori slučaj: potrošite 3.000 € i saznate da AI još nije spreman za Vašu firmu.",
    // Locked: 'That's the cheapest "no" you'll ever buy.'
    highlight: "To je najjeftinije „ne\" koje ćete ikada platiti.",
  },
  whoThisIsFor: {
    body: "Advokatske kancelarije, lekarske ordinacije, inženjerski biroi i svaka organizacija u EU čiji su dokumenti poverljivi po zakonu ili po ugovoru. Ako se Vaš compliance officer namršti na pomen „AI-ja u cloudu\", ovaj snimak stanja je osmišljen za Vas.",
  },
  cta: {
    heading: "Jedan poziv za početak.",
    body: "30 minuta, bez prodajne priče. Proverimo da li se uklapamo, izaberemo uzorak dokumenata i zakažemo prvi dan.",
    links: [
      // TODO: booking tool still undecided; points at the resolved contact
      // email for v1 per Rade, may become a booking link later.
      { label: "Zakažite razgovor", href: CONTACT_MAILTO },
      { label: "Email", href: CONTACT_MAILTO },
    ],
  },
};
