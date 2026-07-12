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

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseFrontmatter {
  title: string;
  slug: string;
  sector: string;
  year: number;
  problem: string;
  stack: string[];
  outcome: string;
  metric?: CaseMetric;
  featured: boolean;
  order: number;
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
    // Case data itself comes from lib/work.ts (getFeaturedCases()), not
    // content -- Phase 5 wires the real cases in, replacing Phase 3's
    // hardcoded stubs.
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
    priceLine: string;
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

export interface AboutContent {
  hero: {
    headline: string;
    body: string;
  };
  arc: string[];
  howIWork: {
    heading: string;
    items: {
      heading: string;
      body: string;
    }[];
  };
  studio: {
    body: string;
  };
}

export interface ContactContent {
  hero: {
    headline: string;
    body: string;
  };
  links: CTALink[];
  identity: string[];
}

export interface PrivacyContent {
  heading: string;
  intro: string;
  points: {
    heading: string;
    body: string;
  }[];
  questionsNote: string;
  imprintHeading: string;
  imprint: {
    lines: string[];
  };
}
