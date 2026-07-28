'use client';

import Link from 'next/link';
import { AnimatedHeading } from './AnimatedHeading';
import { useFadeIn } from './useFadeIn';

const navLinks = [
  { label: 'Services', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Compare', href: '#compare' },
  { label: 'Contact', href: '#contact' },
];

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4';

export function VexHero() {
  const subheadingVisible = useFadeIn(800);
  const buttonsVisible = useFadeIn(1200);
  const tagVisible = useFadeIn(1400);

  return (
    <section className="relative min-h-screen bg-black text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="px-6 pt-6 md:px-12 lg:px-16">
          <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
            <div className="text-2xl font-semibold tracking-tight">
              Alpha Structural
            </div>

            <div className="hidden items-center gap-8 text-sm md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-gray-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="#contact"
              className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-100"
            >
              Request Estimate
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:grid lg:grid-cols-2 lg:items-end lg:px-16 lg:pb-16">
          <div className="mb-8 w-full lg:mb-0">
            <AnimatedHeading
              lines={['Foundation repair,', 'engineered and built in-house.']}
              className="mb-4"
            />

            <div className={`fade-in ${subheadingVisible ? 'visible' : ''}`}>
              <p className="mb-5 text-base text-gray-300 md:text-lg">
                The most trusted structural specialist in Los Angeles and
                Southern California — engineer-led repairs since 1993.
              </p>
            </div>

            <div className={`fade-in ${buttonsVisible ? 'visible' : ''}`}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
                >
                  Request Estimate
                </Link>
                <Link
                  href="#features"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-start lg:justify-end">
            <div className={`fade-in ${tagVisible ? 'visible' : ''}`}>
              <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                <p className="text-lg font-light md:text-xl lg:text-2xl">
                  Residential. Multi-Family. Commercial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
