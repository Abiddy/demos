import type { SiteConfig } from '@/types/site-config';

export const fjcConfig: SiteConfig = {
  brand: 'FJC & Company',
  hero: {
    headingLines: ['We backtrack', 'the damages.'],
    subheading:
      'Water damage restoration, mold remediation, and emergency services in Hermosa Beach — licensed professionals with 20 years of experience.',
    tagline: 'Water Damage. Mold. Sewage. Flood.',
    primaryCta: 'Book Us Now',
    secondaryCta: 'Explore Services',
    navLinks: [
      { label: 'Services', href: '#features' },
      { label: 'About', href: '#about' },
      { label: 'Compare', href: '#compare' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  spotlightHero: {
    bgImage1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260721_142052_eb24fa6b-a69e-4ff2-8e74-8ff14fd0f864.png&w=1280&q=85',
    bgImage2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260721_142424_81e51558-a475-4497-86c1-510dc01e003a.png&w=1280&q=85',
    wordmark: 'FJC & Company',
    headingLine1: 'We backtrack',
    headingLine2: 'the damages.',
    topRightText:
      'Turn flooding, sewage backups, and hidden moisture into a home restored to pristine condition.',
    bottomRightText:
      'FJC & Company delivers certified water damage restoration in Hermosa Beach — emergency response without compromise.',
    ctaLabel: 'Book Us Now',
    ctaHref: '#contact',
    yearStamp: '20-26',
  },
  featureAccordion: [
    {
      label: 'Water Damage Restoration',
      body: 'Full restoration services that ensure your home is free from any evidence of water damage — from inspection through dry-out and rebuild.',
    },
    {
      label: 'Water Extraction',
      body: 'Emergency water damage extraction when severe rain, flooding, or pipe leaks send water into your property. We respond fast in Hermosa Beach.',
    },
    {
      label: 'Sewage Cleanup',
      body: 'Complete sewage cleanup when clogs or pipeline issues cause backups — we rectify all water damage and ensure the building is fully dried.',
    },
    {
      label: 'Mold Removal',
      body: 'Certified mold abatement and removal to protect your property and health after water intrusion or hidden moisture problems.',
    },
    {
      label: 'Mold Abatement',
      body: 'Professional mold remediation procedures to eliminate growth and prevent recurrence in walls, floors, and crawl spaces.',
    },
    {
      label: 'Emergency Flood Restoration',
      body: '24/7 emergency flood restoration — we operate around the clock to minimize damage and restore your property quickly.',
    },
    {
      label: 'Fire Damage Restoration',
      body: 'Comprehensive fire damage restoration alongside our water and mold services for full property recovery.',
    },
    {
      label: 'Free Quotes',
      body: 'Affordable, reliable service with unmatched pricing. Call for a quote — we serve Hermosa Beach and surrounding areas.',
    },
  ],
  problem: {
    headingEmphasis: 'water damage restoration',
    generations: [
      {
        id: 'gen1',
        label: 'Gen 1',
        era: '20 years ago',
        title: 'A fan was pointed at the wet carpet.',
        body: 'General contractors dried surfaces visually, missed hidden moisture in walls and subfloors, and mold returned within weeks.',
      },
      {
        id: 'gen2',
        label: 'Gen 2',
        era: '10 years ago',
        title: 'Restoration was outsourced in pieces.',
        body: 'Separate vendors handled extraction, drying, and rebuild with slow handoffs, unclear accountability, and surprise costs.',
      },
      {
        id: 'gen3',
        label: 'Gen 3',
        era: 'FJC & Company',
        title: 'One certified team from emergency to restore.',
        body: 'FJC & Company is a licensed business with IICRC certified professionals and 20 years of experience — water damage, mold, sewage, and flood restoration under one roof in Hermosa Beach, CA.',
        highlight: true,
      },
    ],
    gen3Quote:
      'Why patch when you can restore it to pristine condition the first time?',
    badTags: ['Slow & Expensive', 'Unreliable'],
    brandHighlight: 'FJC & Company',
  },
  certifications: {
    label: 'Certified & trusted',
    items: ['IICRC Certified Firm', 'Lic #1007828', '24/7 Emergency', '20 Years Experience'],
  },
  stampedFeatures: [
    'Water Restoration',
    'Mold Removal',
    'Sewage Cleanup',
    'Flood Response',
    'Extraction',
    'Dry-Out',
    'Abatement',
    'Emergency 24/7',
  ],
  passion: {
    stamp: 'FJC is restoration',
    body: 'Whether your property faces flooding, sewage backup, or hidden mold, we provide a first-class certified restoration experience.',
    badges: ['IICRC Certified', 'Lic #1007828', 'Hermosa Beach, CA'],
  },
  stats: [
    { value: '20+', label: 'years of experience' },
    { value: '24/7', label: 'emergency response' },
    { value: 'IICRC', label: 'certified professionals' },
    { value: '100%', label: 'satisfaction guaranteed' },
  ],
  trilogy: {
    heading: 'Experience the trilogy and the power of FJC & Company',
    items: [
      {
        tag: 'Restoration',
        title: 'Water damage restoration that brings back pristine condition',
        body: 'Full-service water damage repair, removal, and extraction — we ensure your property is free from any evidence of water damage.',
        cta: 'Learn More',
        href: '#services',
      },
      {
        tag: 'Cleanup',
        title: 'Sewage cleanup to help clean the mess',
        body: 'When clogs or pipeline issues cause sewage backups, our specialists rectify all damage and fully dry the building.',
        cta: 'Learn More',
        href: '#services',
      },
      {
        tag: 'Emergency',
        title: 'Water extraction service that speaks for itself',
        body: 'Emergency professionals for severe rain, flooding, or leaks — we clean up and remedy water damage swiftly in Hermosa Beach.',
        cta: 'Call Now',
        href: '#contact',
      },
    ],
  },
  comparisons: [
    {
      number: '01',
      pain: 'No certified technicians',
      competitor: 'Handyman Service',
    },
    {
      number: '02',
      pain: 'Hidden moisture left behind',
      competitor: 'Surface-Only Dryers',
    },
    {
      number: '03',
      pain: 'Slow emergency response',
      competitor: '9-to-5 Contractor',
    },
    {
      number: '04',
      pain: 'Mold returns after cleanup',
      competitor: 'Low-Bid Vendor',
    },
  ],
  cta: {
    heading:
      'FJC offers emergency restoration. Free quotes with no obligation to decide.',
    subheading:
      'Call to schedule service anywhere in Hermosa Beach and surrounding areas.',
    phone: '3103431263',
    phoneDisplay: '(310) 343-1263',
    email: 'fjccontracting@gmail.com',
    secondaryLabel: 'Email us',
  },
  contact: {
    address: 'Hermosa Beach, CA',
    mapQuery: 'Hermosa+Beach,+CA',
  },
  footer: {
    tagline:
      "It's not that we're mad at yesterday's restoration companies. Just disappointed. So we made it better. We made it easier. We made it FJC.",
    phone: '3103431263',
    stamp: '[ FJC.FOOTER ]',
    copyright: 'FJC & Company Restoration',
    location: 'Made with ♥ in Hermosa Beach, California',
    coords: '33.8622° N, 118.3995° W',
    footerTag: {
      title: 'We Backtrack Damages',
      subtitle: 'Water & Mold Restoration',
    },
    links: {
      about: [
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Gallery', href: '#services' },
      ],
      compare: [
        { label: 'Handyman Service', href: '#compare' },
        { label: 'Low-Bid Vendor', href: '#compare' },
        { label: 'Why Choose Us', href: '#about' },
      ],
      documentation: [
        { label: 'Contact', href: '#contact' },
        { label: 'FAQs', href: '#faq' },
      ],
    },
    faqs: [
      {
        question: 'What areas do you serve?',
        answer:
          'We serve Hermosa Beach, CA and surrounding South Bay communities for residential and commercial water damage restoration.',
      },
      {
        question: 'Are you certified for mold and water damage?',
        answer:
          'Yes. FJC & Company is an IICRC Certified Firm (Lic #1007828) with 20 years of experience in water damage and mold remediation.',
      },
      {
        question: 'Do you offer emergency services?',
        answer:
          'Yes. We operate 24/7 for emergency water extraction, flood restoration, and sewage cleanup.',
      },
      {
        question: 'How do I get a quote?',
        answer:
          'Call (310) 343-1263 or email fjccontracting@gmail.com. We provide affordable, reliable service with free quotes.',
      },
    ],
  },
};
