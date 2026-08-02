import { cafeConfig, type CafeConfig } from '@/data/cafe';
import { fjcConfig } from '@/data/fjc';
import { jrLandingConfig, type JrLandingConfig } from '@/data/jr';
import { horizonConfig, type HorizonConfig } from '@/data/realtor';
import type { SiteConfig } from '@/types/site-config';
import {
  digitsOnlyPhone,
  splitTagline,
  toMapQuery,
  toTelHref,
  type DemoPayload,
} from '@/lib/demo-payload';

export function mergeFjcConfig(payload: DemoPayload): SiteConfig {
  const phoneDigits = digitsOnlyPhone(payload.phone) || fjcConfig.cta.phone;
  const phoneDisplay = payload.phone.trim() || fjcConfig.cta.phoneDisplay;
  const address = payload.address.trim() || fjcConfig.contact.address;
  const description =
    payload.description.trim() || fjcConfig.hero.subheading;
  const brand = payload.businessName.trim() || fjcConfig.brand;
  const headline = splitTagline(payload.tagline, {
    line1: fjcConfig.spotlightHero?.headingLine1 ?? 'We backtrack',
    line2: fjcConfig.spotlightHero?.headingLine2 ?? 'the damages.',
  });
  const images = payload.images;

  return {
    ...fjcConfig,
    brand,
    hero: {
      ...fjcConfig.hero,
      headingLines: [headline.line1, headline.line2].filter(Boolean),
      subheading: description,
      tagline: payload.tagline.trim() || fjcConfig.hero.tagline,
    },
    spotlightHero: fjcConfig.spotlightHero
      ? {
          ...fjcConfig.spotlightHero,
          wordmark: brand,
          headingLine1: headline.line1,
          headingLine2: headline.line2 || fjcConfig.spotlightHero.headingLine2,
          topRightText: description,
          bottomRightText: `${brand} — ${description}`,
          bgImage1: images[0] || fjcConfig.spotlightHero.bgImage1,
          bgImage2: images[1] || images[0] || fjcConfig.spotlightHero.bgImage2,
        }
      : undefined,
    problem: {
      ...fjcConfig.problem,
      brandHighlight: brand,
      generations: fjcConfig.problem.generations.map((gen) =>
        gen.id === 'gen3'
          ? {
              ...gen,
              era: brand,
              body: `${brand} — ${description}`,
            }
          : gen,
      ),
    },
    passion: {
      ...fjcConfig.passion,
      stamp: brand,
      body: description,
      badges: [address, phoneDisplay].filter(Boolean),
    },
    trilogy: {
      ...fjcConfig.trilogy,
      heading: `Experience the power of ${brand}`,
    },
    cta: {
      ...fjcConfig.cta,
      heading: `${brand} is ready to help. Free quotes with no obligation.`,
      subheading: description,
      phone: phoneDigits,
      phoneDisplay,
    },
    contact: {
      address,
      mapQuery: toMapQuery(address),
    },
    footer: {
      ...fjcConfig.footer,
      phone: phoneDigits,
      copyright: brand,
      location: address,
      tagline: description,
      footerTag: {
        title: brand,
        subtitle: payload.tagline.trim() || fjcConfig.footer.footerTag.subtitle,
      },
    },
  };
}

export function mergeJrConfig(payload: DemoPayload): JrLandingConfig {
  const brand = payload.businessName.trim() || jrLandingConfig.brand;
  const phone = payload.phone.trim() || jrLandingConfig.phone;
  const phoneHref =
    digitsOnlyPhone(payload.phone) || jrLandingConfig.phoneHref;
  const description =
    payload.description.trim() || jrLandingConfig.subcopy;
  const address =
    payload.address.trim() ||
    jrLandingConfig.sections.contact.items[1] ||
    '';
  const headline = splitTagline(payload.tagline, jrLandingConfig.headline);
  const images = payload.images;

  const telHref = `tel:${phoneHref}`;

  return {
    ...jrLandingConfig,
    brand,
    phone,
    phoneHref,
    headline: {
      line1: headline.line1,
      line2: headline.line2 || jrLandingConfig.headline.line2,
    },
    subcopy: description,
    panelBody: description,
    sections: {
      ...jrLandingConfig.sections,
      portfolio: {
        ...jrLandingConfig.sections.portfolio,
        body: description,
        image: images[0] || jrLandingConfig.sections.portfolio.image,
        gridImages: [
          images[1] || jrLandingConfig.sections.portfolio.gridImages[0],
          images[2] || jrLandingConfig.sections.portfolio.gridImages[1],
        ].filter(Boolean) as string[],
        ctaHref: telHref,
      },
      services: {
        ...jrLandingConfig.sections.services,
        image: images[3] || images[0] || jrLandingConfig.sections.services.image,
        gridImages: [
          images[1] || jrLandingConfig.sections.services.gridImages[0],
          images[2] || jrLandingConfig.sections.services.gridImages[1],
          images[4] || jrLandingConfig.sections.services.gridImages[2],
        ].filter(Boolean) as string[],
        ctaHref: telHref,
      },
      about: {
        ...jrLandingConfig.sections.about,
        body: `${brand} — ${description}`,
        image: images[4] || images[0] || jrLandingConfig.sections.about.image,
        items: [
          'Licensed & insured',
          phone,
          address || 'Local service area',
        ],
        ctaHref: telHref,
      },
      contact: {
        ...jrLandingConfig.sections.contact,
        items: [phone, address, 'Mon–Fri, 8am–6pm'].filter(Boolean),
        image: images[2] || images[0] || jrLandingConfig.sections.contact.image,
        ctaHref: telHref,
      },
    },
  };
}

export function mergeRealtorConfig(payload: DemoPayload): HorizonConfig {
  const phone = payload.phone.trim() || horizonConfig.brand.phone;
  const phoneHref = payload.phone.trim()
    ? toTelHref(payload.phone)
    : horizonConfig.brand.phoneHref;
  const headline = splitTagline(payload.tagline, horizonConfig.headline);
  const subheadline =
    payload.description.trim() || horizonConfig.subheadline;
  const brandName =
    payload.businessName.trim() || horizonConfig.brandName || 'Horizon Estates';

  return {
    ...horizonConfig,
    brandName,
    brand: {
      phone,
      phoneHref,
    },
    headline: {
      line1: headline.line1,
      line2: headline.line2 || horizonConfig.headline.line2,
    },
    subheadline,
    posterImage: payload.images[0],
    galleryImages: payload.images.slice(0, 5),
  };
}

export function mergeCafeConfig(payload: DemoPayload): CafeConfig {
  const brand = payload.businessName.trim() || cafeConfig.brand;
  const phone = payload.phone.trim() || cafeConfig.phone;
  const phoneHref = payload.phone.trim()
    ? toTelHref(payload.phone)
    : cafeConfig.phoneHref;
  const address = payload.address.trim() || cafeConfig.address;
  const description = payload.description.trim();
  const tagline = payload.tagline.trim();
  const images = payload.images;

  return {
    ...cafeConfig,
    brand,
    phone,
    phoneHref,
    address,
    addressSecondary: '',
    intro: description
      ? description.replace(/^at\s+/i, '').replace(new RegExp(`^${brand}\\s+`, 'i'), '')
      : cafeConfig.intro,
    sectionHeading: tagline || cafeConfig.sectionHeading,
    footerTagline: description || cafeConfig.footerTagline,
    heroImage: images[0] || cafeConfig.heroImage,
    gallery: [
      images[1] || cafeConfig.gallery[0],
      images[2] || cafeConfig.gallery[1],
      images[3] || cafeConfig.gallery[2],
    ],
    subscription: {
      ...cafeConfig.subscription,
      body: description || cafeConfig.subscription.body,
      image: images[4] || images[0] || cafeConfig.subscription.image,
    },
    wholesale: {
      ...cafeConfig.wholesale,
      body: description || cafeConfig.wholesale.body,
    },
    products: cafeConfig.products.map((product, index) => ({
      ...product,
      image: images[index] || product.image,
    })),
    posts: cafeConfig.posts.map((post, index) => ({
      ...post,
      image: images.length
        ? images[(index + 1) % images.length] || post.image
        : post.image,
    })),
  };
}
