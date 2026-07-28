export type JrBlogPost = {
  id: string;
  type: 'featured' | 'standard';
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  video_url: string;
  display_order: number;
};

export const jrBlogPosts: JrBlogPost[] = [
  {
    id: '1',
    type: 'featured',
    badge: 'Must Read',
    title: 'Kitchen Remodel vs. Full Gut Renovation: Which Is Right for Your Home?',
    description:
      'An honest look at scope, budget, and timeline differences so you can choose the approach that actually fits your Santa Clarita home.',
    author: 'By JR Construction Team',
    category: 'Renovation',
    category_color: '#7d1a4a',
    video_url:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4',
    display_order: 0,
  },
  {
    id: '2',
    type: 'standard',
    title: 'Finding Natural Light in Home Additions',
    category: 'Planning',
    category_color: '#2c4c34',
    video_url:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
    display_order: 1,
  },
  {
    id: '3',
    type: 'standard',
    title: 'Our Approach to Finishes: Creating a Consistent Home Style',
    category: 'Design',
    category_color: '#a63e2d',
    video_url:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4',
    display_order: 2,
  },
  {
    id: '4',
    type: 'standard',
    title: 'Pricing Your Renovation: Budget Strategies That Work',
    category: 'Business',
    category_color: '#1a2b8c',
    video_url:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4',
    display_order: 3,
  },
];

export const jrBlogSection = {
  badge: 'Blog',
  heading: 'From the job site',
  subtitle:
    'Thoughts, insights, and stories from our construction projects. Take a peek into our process and recent renovations across Santa Clarita.',
  ctaLabel: 'View all posts',
};
