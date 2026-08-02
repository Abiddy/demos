'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { jrLandingConfig, type JrLandingConfig } from '@/data/jr';
import { JrLogo } from './JrLogo';
import { BoomerangVideoBg } from './BoomerangVideoBg';
import { JrAnimatedSection } from './JrAnimatedSection';
import { JrBlogSection } from './JrBlogSection';

type BoomerangLandingProps = {
  config?: JrLandingConfig;
};

function CtaButton({
  className = '',
  label,
  href,
}: {
  className?: string;
  label: string;
  href?: string;
}) {
  const classes = `rounded-lg bg-[#191919] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#191919]/90 ${className}`;

  if (href) {
    return (
      <a href={href} className={`inline-block ${classes}`}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {label}
    </button>
  );
}

function FeatureRow({
  number,
  label,
  href,
}: {
  number: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex cursor-pointer items-center justify-between bg-[#F4F3F3] px-4 py-3.5 transition-all duration-200 hover:bg-[#eaeaea] sm:px-6 sm:py-4"
    >
      <div className="text-sm text-[#191919]">
        <span className="text-[#191919]/40">{number}</span>
        <span className="mx-2 text-[#191919]/30">/</span>
        <span className="font-medium">{label}</span>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" />
    </a>
  );
}

export function BoomerangLanding({
  config = jrLandingConfig,
}: BoomerangLandingProps) {
  const {
    brand,
    navLinks,
    ctaLabel,
    phoneHref,
    headline,
    subcopy,
    panelLabel,
    panelHeading,
    panelBody,
    featureRows,
    videoSrc,
    sections,
  } = config;

  const featureHrefs = ['#services', '#services', '#portfolio'];

  return (
    <div className="overflow-x-hidden bg-white font-sans text-[#191919] antialiased">
      <nav className="fixed left-0 right-0 top-0 z-50 px-6 py-4 sm:px-10 sm:py-5 md:px-14">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <JrLogo className="h-6 w-6 text-[#191919]" />
            <span className="text-base font-semibold tracking-tight text-[#191919]">
              {brand}
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#191919]/70 transition-colors duration-200 hover:text-[#191919]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <CtaButton
            className="px-5 py-2.5"
            label={ctaLabel}
            href={`tel:${phoneHref}`}
          />
        </div>
      </nav>

      <section className="relative flex min-h-screen flex-col items-center overflow-hidden">
        <BoomerangVideoBg src={videoSrc} />

        <div className="relative z-10 flex w-full min-h-screen flex-1 flex-col items-center">
          <div className="px-4 pt-24 text-center sm:px-6 sm:pt-[6.5rem] md:pt-32">
            <h1 className="font-serif text-4xl font-normal leading-[1.1] tracking-tighter text-[#191919] sm:text-5xl md:text-7xl lg:text-8xl">
              {headline.line1}
              <br />
              {headline.line2}
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#191919]/70 sm:mt-6 sm:max-w-md md:mt-8 md:text-base">
              {subcopy}
            </p>

            <CtaButton
              className="mt-6 px-6 py-3 sm:mt-8 sm:px-8 sm:py-3.5 md:mt-10"
              label={ctaLabel}
              href={`tel:${phoneHref}`}
            />
          </div>

          <div className="mt-auto w-full max-w-5xl px-4 pb-0 sm:px-6">
            <div className="border border-b-0 border-gray-200 bg-white/90 px-5 pt-8 shadow-sm backdrop-blur-sm sm:px-8 sm:pt-12 md:px-12 md:pt-16">
              <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-16">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#191919]/50">
                    {panelLabel}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight text-[#191919] sm:text-3xl md:text-4xl">
                    {panelHeading.line1}
                    <br className="hidden sm:block" />
                    {panelHeading.line2}
                  </h2>
                </div>

                <p className="text-sm leading-relaxed text-[#191919]/70 md:self-end md:text-[15px]">
                  {panelBody}
                </p>
              </div>

              <div className="mt-6 h-px w-full bg-gray-200 sm:mt-8 md:mt-10" />

              <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                {featureRows.map((row, index) => (
                  <FeatureRow
                    key={row.number}
                    number={row.number}
                    label={row.label}
                    href={featureHrefs[index] ?? '#services'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <JrBlogSection />

      {Object.values(sections).map((section, index) => (
        <JrAnimatedSection key={section.id} {...section} index={index} />
      ))}

      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-gray-200 bg-[#F4F3F3] px-6 py-8 text-center text-sm text-[#191919]/60 sm:px-10 md:px-14"
      >
        © {new Date().getFullYear()} {brand}. Santa Clarita, CA.
      </motion.footer>
    </div>
  );
}
