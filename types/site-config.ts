export type AccordionItem = {
  label: string;
  body: string;
};

export type Generation = {
  id: string;
  label: string;
  era: string;
  title: string;
  body: string;
  highlight?: boolean;
};

export type Comparison = {
  number: string;
  pain: string;
  competitor: string;
};

export type TrilogyItem = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SpotlightHeroConfig = {
  bgImage1: string;
  bgImage2: string;
  wordmark: string;
  headingLine1: string;
  headingLine2: string;
  topRightText: string;
  bottomRightText: string;
  ctaLabel: string;
  ctaHref: string;
  yearStamp: string;
};

export type SiteConfig = {
  brand: string;
  hero: {
    headingLines: string[];
    subheading: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    navLinks: NavLink[];
  };
  spotlightHero?: SpotlightHeroConfig;
  featureAccordion: AccordionItem[];
  problem: {
    headingEmphasis: string;
    generations: Generation[];
    gen3Quote: string;
    badTags: [string, string];
    brandHighlight: string;
  };
  certifications: {
    label: string;
    items: string[];
  };
  stampedFeatures: string[];
  passion: {
    stamp: string;
    body: string;
    badges: string[];
  };
  stats: Stat[];
  trilogy: {
    heading: string;
    items: TrilogyItem[];
  };
  comparisons: Comparison[];
  cta: {
    heading: string;
    subheading: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    secondaryLabel: string;
  };
  contact: {
    address: string;
    mapQuery: string;
  };
  footer: {
    tagline: string;
    phone: string;
    stamp: string;
    copyright: string;
    location: string;
    coords: string;
    footerTag: { title: string; subtitle: string };
    links: {
      about: NavLink[];
      compare: NavLink[];
      documentation: NavLink[];
    };
    faqs: Faq[];
  };
};
