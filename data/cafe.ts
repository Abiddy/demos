export type CafeProduct = {
  id: string;
  name: string;
  price: string;
  origin: string;
  notes: string;
  roast: string;
  image: string;
};

export type CafePost = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

export const cafeConfig = {
  brand: 'Little Roast',
  phone: '(717) 555-0142',
  phoneHref: 'tel:+17175550142',
  email: 'hello@littleroast.cafe',
  address: '133 State Street, Harrisburg, PA',
  addressSecondary: '1836 Green Street, Harrisburg, PA',
  navLinks: [
    { label: 'Shop', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Visit', href: '#visit' },
    { label: 'Community', href: '#community' },
    { label: 'Contact', href: '#visit' },
  ],
  heroImage:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',
  ],
  intro:
    "we're on a never ending quest for the perfect cup — constantly sourcing and roasting the best specialty coffees we can find and serving them to our community.",
  sectionHeading: 'Tasty Coffee and Chill Vibes.',
  subscription: {
    eyebrow: 'Coffee Subscription',
    title: 'Amp Up Your Mornings',
    body: 'A subscription is a chill and easy way to ensure you always have something tasty to wake up with. Keep it fresh and save a couple bucks with regular deliveries.',
    ctaLabel: 'Shop Subscriptions',
    ctaHref: '#menu',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=85',
  },
  wholesale: {
    eyebrow: 'Wholesale',
    title: 'Got a Coffee Shop?',
    subtitle: 'Need Coffee in Bulk?',
    body: 'Want to serve our coffee at your place? Get in touch — we share sourcing, roasting, and serving experience so your bar can serve something super tasty.',
    ctaLabel: 'Get in Touch',
    ctaHref: '#visit',
  },
  products: [
    {
      id: 'friend-blend',
      name: 'Friend Blend',
      price: 'From $20.00',
      origin: 'Colombia, Ethiopia',
      notes: 'Caramel, Citrus, Milk Chocolate',
      roast: 'Medium Roast',
      image:
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'into-the-void',
      name: 'Into The Void',
      price: 'From $20.00',
      origin: 'Honduras',
      notes: 'Cooked Berries, Mulled Wine, Cocoa',
      roast: 'Dark Roast',
      image:
        'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'finca',
      name: 'Finca el Jardín',
      price: 'From $26.00',
      origin: 'Colombia',
      notes: 'Lemon, Strawberry, Jasmine',
      roast: 'Medium Roast',
      image:
        'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'instant',
      name: 'Super Tasty Instant',
      price: '$20.00',
      origin: 'Ethiopia',
      notes: 'Maple, Chocolate, Blueberry',
      roast: 'Medium Roast',
      image:
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=85',
    },
  ] satisfies CafeProduct[],
  posts: [
    {
      id: 'producer-1',
      date: '06.08.2026',
      title: 'Producer Highlight',
      excerpt:
        'Meet a fourth-generation coffee farmer working alongside their community to wash and process neighbor cherries.',
      image:
        'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'cupping',
      date: '04.30.2026',
      title: 'What is Cupping?',
      excerpt:
        'Cupping is how we evaluate aroma, acidity, sweetness, and body — the ritual behind every coffee on our menu.',
      image:
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'playlist',
      date: '12.11.2025',
      title: 'Shop Playlist',
      excerpt:
        'Featuring tracks from our current vinyl selection — the soundtrack for slow mornings and long pours.',
      image:
        'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=900&q=85',
    },
  ] satisfies CafePost[],
  hours: 'Mon–Sun, 7am–5pm',
  footerTagline: 'Specialty coffee for the neighborhood and beyond.',
};

export type CafeConfig = typeof cafeConfig;
