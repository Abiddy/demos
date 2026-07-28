import type { SiteConfig } from '@/types/site-config';
import {
  featureAccordion,
  stampedFeatures,
  generations,
  comparisons,
  trilogy,
  stats,
  faqs,
  footerLinks,
} from './site';

export const alphaConfig: SiteConfig = {
  brand: 'Alpha Structural',
  hero: {
    headingLines: ['Foundation repair,', 'engineered and built in-house.'],
    subheading:
      'The most trusted structural specialist in Los Angeles and Southern California — engineer-led repairs since 1993.',
    tagline: 'Residential. Multi-Family. Commercial.',
    primaryCta: 'Request Estimate',
    secondaryCta: 'Explore Services',
    navLinks: [
      { label: 'Services', href: '#features' },
      { label: 'About', href: '#about' },
      { label: 'Compare', href: '#compare' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  featureAccordion,
  problem: {
    headingEmphasis: 'foundation repair',
    generations,
    gen3Quote:
      'Why patch when you can engineer and build it right the first time?',
    badTags: ['Slow & Expensive', 'Unreliable'],
    brandHighlight: 'Alpha Structural',
  },
  certifications: {
    label: 'Featured on national media',
    items: ['HGTV', 'CNN', 'NBC News', 'Telemundo', 'ABC 7'],
  },
  stampedFeatures,
  passion: {
    stamp: 'Alpha is trust',
    body: 'Whether your property is a hillside home or a multi-family building, we provide a first-class engineer-led experience.',
    badges: ['Licensed A-663409', 'Since 1993', '4 Counties Served'],
  },
  stats,
  trilogy: {
    heading: 'Experience the trilogy and the power of Alpha Structural',
    items: trilogy,
  },
  comparisons,
  cta: {
    heading:
      'Alpha offers a free inspection. No obligation for as long as you need to decide.',
    subheading: 'Call to schedule an assessment anywhere in Southern California.',
    phone: '3232585482',
    phoneDisplay: '(323) 258-5482',
    email: 'info@alphastructural.com',
    secondaryLabel: 'Request an estimate',
  },
  contact: {
    address: 'Sunland, California',
    mapQuery: 'Sunland,+Los+Angeles,+CA',
  },
  footer: {
    tagline:
      "It's not that we're mad at yesterday's contractors. Just disappointed. So we made it better. We made it easier. We made it Alpha.",
    phone: '3232585482',
    stamp: '[ ALPHA.FOOTER ]',
    copyright: 'Alpha Structural, Inc.',
    location: 'Made with ♥ in Sunland, California',
    coords: '34.2591° N, 118.3020° W',
    footerTag: {
      title: 'Engineer-Led Design/Build',
      subtitle: 'Foundation & Structural Repair',
    },
    links: footerLinks,
    faqs,
  },
};
