import type { ServicesPageContent } from "@/content/types";

// Serbian translation of content/en/services.ts per content-of-record
// PART 5 rules (see content/sr/home.ts header). The product is named
// „AI Snimak stanja" -- existing name, never translated as „procena".
export const services: ServicesPageContent = {
  intro:
    "Sve što je ovde navedeno postoji zato što je nekom klijentu bilo potrebno — i ja sam to napravio.",
  services: [
    {
      id: "private-ai",
      // Locked: "AI that never phones home."
      hook: "AI koji nikome ne javlja ništa.",
      description:
        "Za organizacije u kojima poverljivost nije stvar izbora: advokatske kancelarije, lekarske ordinacije, inženjerske biroe, arhive.",
      bullets: [
        "Inteligentna obrada dokumenata i RAG pretraga nad Vašim internim znanjem",
        "Lokalni LLM deployment na Vašem hardveru ili privatnim serverima u EU",
        "Multi-tenant okruženja sa kontrolom pristupa na serverskoj strani",
        "Usklađeno sa GDPR-om po arhitekturi, ne po obećanju",
      ],
      engagementNote:
        "Saradnja: počinje plaćenom analizom („AI Snimak stanja\") — proverom Vaših podataka, primene i infrastrukture po fiksnoj ceni, na kraju koje dobijate konkretan plan uvođenja. Plan zadržavate bez obzira na to da li nastavljamo dalje.",
      whatYouOwn:
        "Šta je vaše: modeli, embeddings, podaci, serveri, dokumentacija.",
      // Same treatment as EN: the link text is the exact product name already
      // used in the engagement note above, not new copy.
      assessmentCta: { label: "AI Snimak stanja", href: "/ai-assessment" },
    },
    {
      id: "web",
      // Locked: "Built to be maintained, not just launched."
      hook: "Napravljeno da se održava, ne samo da se lansira.",
      bullets: [
        "E-commerce usklađen sa lokalnim propisima (fiskalizacija, regionalni sistemi plaćanja)",
        "Multi-tenant SaaS platforme",
        "Performanse na prvom mestu: Next.js, Tailwind, PostgreSQL",
        "Migracije sa zastarelog WordPressa na moderan stack",
      ],
      whatYouOwn:
        "Šta je vaše: kompletan izvorni kôd, deployment pipeline i prenos znanja potreban da sve vodite sami.",
    },
    {
      id: "brand",
      // Locked: "One head, no translation loss."
      hook: "Jedna glava, bez gubitka u prevodu.",
      description:
        "Strategija brenda, dizajn identiteta i izrada proizvoda — kao jedan neprekinut sistem. Od logotipa, preko dizajn sistema, do produkcionog koda.",
      bullets: [
        "Radionice za postavljanje temelja brenda",
        "Identitet i dizajn sistemi",
        "Sajt ili proizvod koji ih zaista i primenjuje",
      ],
      whatYouOwn:
        "Šta je vaše: brend materijali, dizajn sistem i proizvod koji odgovara i jednom i drugom.",
    },
  ],
};
