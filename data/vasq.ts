import type { SiteConfig } from '@/types/site-config';

export const vasqConfig: SiteConfig = {
  brand: 'Vasquez Construction',
  hero: {
    headingLines: ['Building quality', 'spaces.'],
    subheading:
      'General construction, coatings, and air barrier contractor serving California, Arizona, and Nevada since 1989.',
    tagline: 'Healthcare. Biotech. Education. Commercial.',
    primaryCta: 'Contact Us',
    secondaryCta: 'Our Services',
    navLinks: [
      { label: 'Services', href: '#features' },
      { label: 'About', href: '#about' },
      { label: 'Compare', href: '#compare' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  spotlightHero: {
    bgImage1:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    bgImage2:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85',
    wordmark: 'Vasquez Construction',
    headingLine1: 'Building quality',
    headingLine2: 'spaces.',
    topRightText:
      'High-quality construction solutions for healthcare, biotech, manufacturing, education, and commercial offices.',
    bottomRightText:
      'Founded in 1989 in San Diego — delivering on time and on budget across the Southwestern United States.',
    ctaLabel: 'Contact Us',
    ctaHref: '#contact',
    yearStamp: '19-89',
  },
  featureAccordion: [
    {
      label: 'General Construction',
      body: 'Full-service general contracting for commercial and institutional projects — quality delivery from planning through completion.',
    },
    {
      label: 'Coatings',
      body: 'Professional coatings systems that protect and finish spaces to the standards healthcare, biotech, and commercial clients require.',
    },
    {
      label: 'Air Barrier Systems',
      body: 'Air barrier contractor expertise for energy performance, moisture control, and building envelope integrity.',
    },
    {
      label: 'Healthcare & Biotech',
      body: 'Functional spaces built for regulated environments — healthcare and biotech facilities across the Southwest.',
    },
    {
      label: 'Education Facilities',
      body: 'Construction solutions for education environments that support learning and long-term durability.',
    },
    {
      label: 'Commercial Offices',
      body: 'Commercial office construction and finishes delivered on schedule with clear communication.',
    },
    {
      label: 'Manufacturing Spaces',
      body: 'Purpose-built manufacturing environments with the quality and reliability industrial clients expect.',
    },
    {
      label: 'Southwest Coverage',
      body: 'Serving construction markets in California, Arizona, and Nevada from our San Diego base.',
    },
  ],
  problem: {
    headingEmphasis: 'quality construction',
    generations: [
      {
        id: 'gen1',
        label: 'Gen 1',
        era: 'Then',
        title: 'Lowest bid, highest risk.',
        body: 'Projects chased price over performance — missed schedules, unclear accountability, and finishes that did not last.',
      },
      {
        id: 'gen2',
        label: 'Gen 2',
        era: 'Later',
        title: 'Too many handoffs.',
        body: 'Separate trades and vendors slowed delivery, created gaps in the envelope, and left owners managing the mess.',
      },
      {
        id: 'gen3',
        label: 'Gen 3',
        era: 'Vasquez',
        title: 'One contractor. Quality first.',
        body: 'Vasquez Construction Company — founded in 1989 — delivers general construction, coatings, and air barrier work on time and on budget across CA, AZ, and NV.',
        highlight: true,
      },
    ],
    gen3Quote:
      'Why settle for good enough when you can build it right the first time?',
    badTags: ['Late & Over Budget', 'Unreliable'],
    brandHighlight: 'Vasquez Construction',
  },
  certifications: {
    label: 'Licensed & certified',
    items: [
      'CA License 560999',
      'Class B, C-33',
      'SBE Certified',
      'SMBE Certified',
    ],
  },
  stampedFeatures: [
    'General Construction',
    'Coatings',
    'Air Barriers',
    'Healthcare',
    'Biotech',
    'Education',
    'Commercial',
    'Manufacturing',
  ],
  passion: {
    stamp: 'Vasquez builds quality',
    body: 'Passionate about creating functional spaces for healthcare, biotech, manufacturing, education, and commercial offices throughout the Southwest.',
    badges: ['Est. 1989', 'San Diego, CA', 'CA Lic #560999'],
  },
  stats: [
    { value: '1989', label: 'founded in San Diego' },
    { value: '3', label: 'states served' },
    { value: 'B / C-33', label: 'license classes' },
    { value: 'SBE', label: 'SMBE certified' },
  ],
  trilogy: {
    heading: 'Experience the power of Vasquez Construction',
    items: [
      {
        tag: 'Build',
        title: 'General construction that delivers quality spaces',
        body: 'From commercial offices to specialized facilities — high-quality construction solutions on time and on budget.',
        cta: 'Learn More',
        href: '#services',
      },
      {
        tag: 'Protect',
        title: 'Coatings and air barriers that perform',
        body: 'Envelope and finish systems that protect buildings and meet demanding commercial and institutional standards.',
        cta: 'Learn More',
        href: '#services',
      },
      {
        tag: 'Serve',
        title: 'Southwest markets from a San Diego base',
        body: 'Trusted contractor for California, Arizona, and Nevada — healthcare, biotech, education, and more.',
        cta: 'Contact Us',
        href: '#contact',
      },
    ],
  },
  comparisons: [
    {
      number: '01',
      pain: 'No specialty envelope expertise',
      competitor: 'General Handyman Firm',
    },
    {
      number: '02',
      pain: 'Missed schedules & change-order chaos',
      competitor: 'Low-Bid GC',
    },
    {
      number: '03',
      pain: 'Weak healthcare / biotech experience',
      competitor: 'Residential-Only Builder',
    },
    {
      number: '04',
      pain: 'Uncertified / unlicensed risk',
      competitor: 'Unvetted Subcontractor',
    },
  ],
  cta: {
    heading:
      'Vasquez delivers quality construction. Let’s talk about your next project.',
    subheading:
      'Call or email our San Diego office — serving California, Arizona, and Nevada.',
    phone: '6192373607',
    phoneDisplay: '(619) 237-3607',
    email: 'info@vasquezco.com',
    secondaryLabel: 'Email us',
  },
  contact: {
    address: '3009 G Street, San Diego, CA 92102',
    mapQuery: '3009+G+Street,+San+Diego,+CA+92102',
  },
  footer: {
    tagline:
      'Building quality spaces, impacting your world. Vasquez Construction Company — San Diego since 1989.',
    phone: '6192373607',
    stamp: '[ VASQ.FOOTER ]',
    copyright: 'Vasquez Construction Company',
    location: 'Made with ♥ in San Diego, California',
    coords: '32.7157° N, 117.1611° W',
    footerTag: {
      title: 'Building Quality Spaces',
      subtitle: 'General Construction · Coatings · Air Barriers',
    },
    links: {
      about: [
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Home', href: '#top' },
      ],
      compare: [
        { label: 'Low-Bid GC', href: '#compare' },
        { label: 'Why Choose Us', href: '#about' },
        { label: 'Markets We Serve', href: '#features' },
      ],
      documentation: [
        { label: 'Contact', href: '#contact' },
        { label: 'FAQs', href: '#faq' },
        {
          label: 'vasquezco.com',
          href: 'http://www.vasquezco.com/home.html',
        },
      ],
    },
    faqs: [
      {
        question: 'What markets do you serve?',
        answer:
          'Vasquez Construction Company services Arizona, California, and Nevada — with our office at 3009 G Street, San Diego, CA 92102.',
      },
      {
        question: 'What type of work do you specialize in?',
        answer:
          'We are a general construction, coatings, and air barrier contractor focused on healthcare, biotech, manufacturing, education, and commercial office spaces.',
      },
      {
        question: 'Are you licensed and certified?',
        answer:
          'Yes. CA License 560999 | Class B, C-33. We are also SBE and SMBE certified.',
      },
      {
        question: 'How do I get in touch?',
        answer:
          'Call (619) 237-3607, fax (619) 237-3610, or email info@vasquezco.com. Visit vasquezco.com for more.',
      },
    ],
  },
};
