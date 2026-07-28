export const jrLandingConfig = {
  brand: 'JR Construction',
  navLinks: [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaLabel: 'Get A Quote',
  phone: '(818) 625-2609',
  phoneHref: '8186252609',
  headline: {
    line1: 'Built to last.',
    line2: 'Crafted with care.',
  },
  subcopy:
    'Quality home renovations and construction in Santa Clarita — kitchens, bathrooms, and whole-home projects done right.',
  panelLabel: 'What do we do?',
  panelHeading: {
    line1: 'Renovations that',
    line2: 'stand the test of time',
  },
  panelBody:
    'From bathroom remodels to full home builds, JR Construction delivers craftsmanship, clear communication, and results you can count on across the Santa Clarita Valley.',
  featureRows: [
    { number: '01', label: 'Kitchen Remodel' },
    { number: '02', label: 'Bathroom Renovation' },
    { number: '03', label: 'Whole Home Build' },
  ],
  videoSrc:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4',
  sections: {
    portfolio: {
      id: 'portfolio',
      label: 'Portfolio',
      title: 'Recent projects',
      body: 'A selection of kitchen remodels, bathroom renovations, and whole-home builds across Santa Clarita. Full gallery coming soon.',
      items: ['Modern kitchen remodel — Valencia', 'Primary bath renovation — Canyon Country', 'Whole-home refresh — Newhall'],
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1280&q=85',
      imageAlt: 'Modern home exterior after renovation',
      gridImages: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d4046?auto=format&fit=crop&w=1280&q=85',
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1280&q=85',
      ],
      featuredBadge: 'Featured',
      category: 'Portfolio',
      categoryColor: '#7d1a4a',
      ctaLabel: 'Get a quote',
      ctaHref: 'tel:8186252609',
    },
    services: {
      id: 'services',
      label: 'Services',
      title: 'What we build',
      body: 'End-to-end renovation and construction services for homeowners who want quality work, clear timelines, and lasting results.',
      items: ['Kitchen remodels', 'Bathroom renovations', 'Whole-home construction', 'Custom carpentry & finishes'],
      image:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1280&q=85',
      imageAlt: 'Construction framing and building work',
      gridImages: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d4046?auto=format&fit=crop&w=1280&q=85',
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1280&q=85',
        'https://images.unsplash.com/photo-1591825885630-1f54660a5d0e?auto=format&fit=crop&w=1280&q=85',
      ],
      featuredBadge: 'Core services',
      category: 'Services',
      categoryColor: '#2c4c34',
      ctaLabel: 'Get a quote',
      ctaHref: 'tel:8186252609',
    },
    about: {
      id: 'about',
      label: 'About',
      title: 'Local builders, trusted craft',
      body: 'JR Construction is a Santa Clarita–based team focused on thoughtful renovations and dependable project management from first walkthrough to final walkthrough.',
      items: ['Licensed & insured', '5.0 rating on Google', 'Serving the Santa Clarita Valley'],
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1280&q=85',
      imageAlt: 'Construction crew reviewing plans on a job site',
      gridImages: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1280&q=85',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1280&q=85',
      ],
      featuredBadge: 'Why JR',
      category: 'About',
      categoryColor: '#a63e2d',
      ctaLabel: 'Learn more',
      ctaHref: '#contact',
    },
    contact: {
      id: 'contact',
      label: 'Contact',
      title: 'Start your project',
      body: 'Tell us about your renovation or build. We’ll schedule a consultation and provide a clear estimate.',
      items: ['(818) 625-2609', '27652 Ironstone Dr APT 3, Santa Clarita, CA 91387', 'Mon–Fri, 8am–6pm'],
      image:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1280&q=85',
      imageAlt: 'Residential home under construction',
      gridImages: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1280&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1280&q=85',
      ],
      featuredBadge: 'Get started',
      category: 'Contact',
      categoryColor: '#1a2b8c',
      ctaLabel: 'Call now',
      ctaHref: 'tel:8186252609',
    },
  },
};

export type JrLandingConfig = typeof jrLandingConfig;

// Legacy config used elsewhere
export const jrConfig = {
  brand: 'JR CONSTRUCTION',
  navLinks: [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
  ],
  heroHeading: 'JR CO',
  buildingImage:
    'https://images.unsplash.com/photo-1477959858617-67f85ebb993e?auto=format&fit=crop&w=2200&q=85',
  viewHeading: 'Built Right',
  bottomText:
    'Quality home renovations and construction in Santa Clarita — where craftsmanship, detail, and lasting results converge.',
  viewSubtext:
    'Elevated renovations for kitchens, bathrooms, and whole-home projects across Santa Clarita and the Santa Clarita Valley.',
  thumbnails: [
    {
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_094505_c14a7566-ec38-46cf-b298-b641815acbdc.png&w=1280&q=85',
      alt: 'Renovation project 1',
    },
    {
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_094527_33af18d8-e52c-49a6-8b9b-4706b0c0a85a.png&w=1280&q=85',
      alt: 'Renovation project 2',
    },
    {
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_094546_3f85bc04-8e66-4d82-aa27-fcf40742a384.png&w=1280&q=85',
      alt: 'Renovation project 3',
    },
    {
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_094606_79a7fc4d-cf64-48bc-a2d3-52dd5ad6ffe3.png&w=1280&q=85',
      alt: 'Renovation project 4',
    },
  ],
  portfolioCards: [
    {
      title: 'Bathroom Renovation',
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_101354_a5a857b7-b9ce-4e3f-9cc1-27424c9e4c8d.png&w=1280&q=85',
      alt: 'Bathroom Renovation',
    },
    {
      title: 'Kitchen Remodel',
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_101420_1c0cbb04-a7b5-41f1-9d21-fcf3976f6be6.png&w=1280&q=85',
      alt: 'Kitchen Remodel',
    },
    {
      title: 'Whole Home Build',
      src: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260718_101434_83163d4d-1639-4812-8753-e679652939ff.png&w=1280&q=85',
      alt: 'Whole Home Build',
    },
  ],
  phone: '(818) 625-2609',
  phoneHref: '8186252609',
  address: '27652 Ironstone Dr APT 3, Santa Clarita, CA 91387',
  rating: '5.0',
  reviews: '4 reviews',
};

export type JrConfig = typeof jrConfig;
