import type { StatusStripItem } from "@/components/StatusStrip";

export interface CTALink {
  label: string;
  href: string;
}

export interface ServiceContent {
  title: string;
  body: string;
  whatYouOwn: string;
}

export interface CaseStub {
  slug: string;
  title: string;
  problem: string;
  stack: string[];
  outcome: string;
}

export interface HomeContent {
  hero: {
    headline: string;
    subline: string;
    identity: string;
    ctas: CTALink[];
  };
  sovereignty: {
    heading: string;
    body: string;
  };
  services: ServiceContent[];
  differentiation: {
    heading: string;
    body: string;
  };
  proof: {
    cases: CaseStub[];
    allWorkCta: CTALink;
  };
  credibility: StatusStripItem[];
  cta: {
    heading: string;
    body: string;
    links: CTALink[];
  };
}
