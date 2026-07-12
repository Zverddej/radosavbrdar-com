import type { HomeContent } from "@/content/types";
import { CONTACT_MAILTO } from "@/lib/site";

// Serbian translation of content/en/home.ts per content-of-record-completion.md
// PART 5: srpska latinica, persiranje (Vi), locked-table lines byte-exact
// (including their own capitalization of vaš/Vaš), technical terms that are
// established in English stay English. Quote convention follows the glossary
// itself: opening „ (U+201E), closing ASCII ".
//
// Same open TODOs as the EN file: LinkedIn URL, booking tool (mailto is the
// v1 stand-in per Rade, DEV-LOG 006).
export const home: HomeContent = {
  hero: {
    // Locked: "I build systems you own — not subscriptions you rent."
    headline: "Gradim sisteme koje posedujete — ne pretplate koje iznajmljujete.",
    subline:
      "Web platforme, privatni AI i digitalni proizvodi koji rade na Vašoj infrastrukturi, pod Vašim uslovima.",
    identity: "Radosav Brdar · identitet studio · sedište u EU",
    ctas: [
      { label: "Pogledajte radove", href: "/work" },
      // TODO: booking tool still undecided; points at the resolved contact
      // email for v1 per Rade, may become a booking link later.
      { label: "Zakažite razgovor", href: CONTACT_MAILTO },
    ],
  },
  sovereignty: {
    // Locked base: "Vaši podaci nikada ne napuštaju vašu zgradu." -- the EN
    // page heading adds "should", so the modal is added around the locked
    // wording (incl. its lowercase "vašu zgradu").
    heading: "Vaši podaci nikada ne bi trebalo da napuštaju vašu zgradu.",
    body: "Većina AI alata zahteva da svoje dokumente predate tuđem cloudu. Za advokatske kancelarije, lekarske ordinacije i inženjerske biroe u EU to nije pogodnost — to je rizik. Projektujem i uvodim AI sisteme koji rade isključivo na infrastrukturi koju Vi kontrolišete.",
  },
  services: [
    {
      title: "Privatni AI sistemi",
      body: "Inteligentna obrada dokumenata, RAG pretraga i lokalni LLM deployment — na Vašim serverima, iza Vašeg firewalla.",
      // Locked: "What you own when we're done" -> "Šta je vaše kad završimo"
      whatYouOwn: "Šta je vaše kad završimo: modeli, podaci, infrastruktura.",
    },
    {
      title: "Web platforme i proizvodi",
      // Locked fragment: "napravljeno da se održava, ne samo da se lansira"
      body: "Od e-commerce rešenja do multi-tenant SaaS platformi. Next.js, PostgreSQL, moderan stack — napravljeno da se održava, ne samo da se lansira.",
      whatYouOwn:
        "Šta je vaše kad završimo: izvorni kôd, deployment, plan razvoja.",
    },
    {
      title: "Od brenda do proizvoda",
      // Locked fragment: "bez gubitka u prevodu"
      body: "Trideset godina u dizajnu, fotografiji i razvoju znači da Vaš brend i Vaš proizvod nastaju u jednoj glavi — bez gubitka u prevodu.",
      whatYouOwn:
        "Šta je vaše kad završimo: sistem u kome se dizajn i kôd zaista poklapaju.",
    },
  ],
  differentiation: {
    // Locked: "You work directly with the person who builds it."
    heading: "Radite direktno sa čovekom koji to gradi.",
    // Locked (adapted from period-form to the EN body's comma-form, wording
    // unchanged incl. its lowercase "vašem trošku"): "Bez account menadžera.
    // Bez prebacivanja. Bez juniora koji uče o vašem trošku."
    body: "Bez account menadžera, bez prebacivanja, bez juniora koji uče o vašem trošku. Problem objašnjavate jednom — čoveku koji piše kôd. Za veće projekte uključujem specijaliste sa kojima sarađujem godinama, a ja ostajem Vaša jedina tačka odgovornosti.",
  },
  proof: {
    allWorkCta: { label: "Svi radovi", href: "/work" },
  },
  credibility: [
    { label: "iskustvo", value: "30 godina u vizuelnim i web tehnologijama" },
    { label: "doseg", value: "60M+ pregleda na Google Maps snimcima" },
    { label: "deployments", value: "2 privatna AI sistema u produkciji" },
    {
      label: "platforma",
      value: "400+ firmi na platformi za fakturisanje koju sam napravio i održavam",
    },
  ],
  cta: {
    // Locked: "Someone probably sent you here."
    heading: "Neko Vas je verovatno uputio ovde.",
    body: "Najbrži način da vidimo da li treba da sarađujemo jeste razgovor od 30 minuta. Bez prodajne priče, bez prezentacije — donesite problem.",
    links: [
      { label: "Email", href: CONTACT_MAILTO },
      // TODO: LinkedIn profile URL not yet provided (content-of-record PART 3).
      { label: "LinkedIn", href: "#" },
      // TODO: booking tool still undecided; points at the resolved contact
      // email for v1 per Rade, may become a booking link later.
      { label: "Zakažite razgovor", href: CONTACT_MAILTO },
    ],
  },
};
