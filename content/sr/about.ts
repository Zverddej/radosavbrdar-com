import type { AboutContent } from "@/content/types";

// Serbian translation of content/en/about.ts per content-of-record PART 5
// rules (see content/sr/home.ts header).
export const about: AboutContent = {
  hero: {
    headline: "Za trideset godina pet puta sam iznova gradio svoj zanat.",
    // Locked fragment: "razumeti sistem, pa ga napraviti kako treba"
    body: "Princip se nikada nije promenio: razumeti sistem, pa ga napraviti kako treba.",
  },
  arc: [
    "Priprema za štampu i grafička produkcija devedesetih — gde je greška značila ponovno štampanje deset hiljada tabaka, a preciznost postala navika, ne vrlina. Zatim 360° fotografija: blizu 60 miliona pregleda na Google Mapsu, više od hiljadu firmi postavljeno na mapu. Zatim web — stotine sajtova, brendova i kampanja za firme širom regiona. Osnovan i vođen poslovni imenik. Lokalna street-view platforma napravljena od nule.",
    // Locked fragment: "bez iznajmljene magije, bez crnih kutija"
    "A sada: privatni AI sistemi. Retrieval, pretraga i jezički modeli koji rade na hardveru koji mogu fizički da dodirnem — moji inference serveri, moji deploymenti, moj uptime za koji odgovaram. Bez iznajmljene magije, bez crnih kutija.",
    "Svako od ovoga bio je drugačiji zanat. A svi su bili isti posao: rastaviti sistem, pošteno ga razumeti, napraviti ga kako treba.",
  ],
  howIWork: {
    heading: "Kako radim",
    items: [
      {
        heading: "U fazama.",
        body: "Svaki projekat je podeljen u faze — svaka ima jedan cilj, fiksan obim i jasan kriterijum prihvatanja. Uvek znate šta se gradi, koliko košta i kada je gotovo.",
      },
      {
        heading: "Direktno.",
        body: "Razgovarate sa osobom koja radi posao. Na pitanja odgovara onaj ko je napisao kôd — najčešće istog dana.",
      },
      {
        heading: "Za vlasništvo.",
        body: "Sve što gradim projektovano je za primopredaju: dokumentovano, objašnjeno i sposobno da radi bez mene. Mera dobrog sistema je to što mu graditelj nije potreban.",
      },
    ],
  },
  studio: {
    body: "identitet je ime studija pod kojim ovaj rad živi — namerno studio jednog čoveka, sa mrežom dugogodišnjih saradnika-specijalista za veće projekte i partnerstvom za isporuku sa sedištem u EU za uvođenja unutar Unije. Baza: Sombor, Srbija. Radim širom EU.",
  },
};
