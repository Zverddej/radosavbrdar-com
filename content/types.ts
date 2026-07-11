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

export interface ServiceDetail {
  id: string;
  hook: string;
  description?: string;
  bullets: string[];
  engagementNote?: string;
  whatYouOwn: string;
  assessmentCta?: CTALink;
}

export interface ServicesPageContent {
  intro: string;
  services: ServiceDetail[];
}

export interface AssessmentTimelinePhase {
  range: string;
  heading: string;
  body: string;
}

export interface AssessmentContent {
  hero: {
    headline: string;
    body: string;
    price: string;
    deliveryNote: string;
    cta: CTALink;
  };
  questions: {
    heading: string;
    body: string;
  }[];
  timeline: {
    statusStrip: StatusStripItem[];
    phases: AssessmentTimelinePhase[];
  };
  documentIsYours: {
    body: string;
  };
  whyFixedPrice: {
    body: string;
    worstCase: string;
    highlight: string;
  };
  whoThisIsFor: {
    body: string;
  };
  cta: {
    heading: string;
    body: string;
    links: CTALink[];
  };
}
