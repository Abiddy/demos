'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { horizonConfig, type HorizonConfig } from '@/data/realtor';
import { HorizonCtaButton, HorizonLogo } from './HorizonLogo';
import { ShaneHomesLogo } from './ShaneHomesLogo';

type HorizonEstatesPageProps = {
  config?: HorizonConfig;
};

export function HorizonEstatesPage({
  config = horizonConfig,
}: HorizonEstatesPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [video1Faded, setVideo1Faded] = useState(false);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const swappedRef = useRef(false);
  const touchStartYRef = useRef(0);

  const {
    navLinks,
    videos,
    headline,
    subheadline,
    videoSwapDelay,
    brand,
    brandName,
    posterImage,
  } = config;

  const setVideoSwap = useCallback((swapped: boolean) => {
    swappedRef.current = swapped;
    setVideo1Faded(swapped);

    const video2 = video2Ref.current;
    if (!video2) return;

    if (swapped) {
      video2.currentTime = 0;
      video2.play().catch(() => {});
    } else {
      video2.pause();
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const autoTimer = window.setTimeout(() => {
      if (!swappedRef.current) {
        setVideoSwap(true);
      }
    }, videoSwapDelay);

    return () => window.clearTimeout(autoTimer);
  }, [setVideoSwap, videoSwapDelay]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (menuOpen) return;
      e.preventDefault();

      if (e.deltaY > 10) {
        setVideoSwap(true);
      } else if (e.deltaY < -10) {
        setVideoSwap(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (menuOpen) return;
      const currentY = e.touches[0]?.clientY ?? 0;
      const delta = touchStartYRef.current - currentY;

      if (Math.abs(delta) < 40) return;

      e.preventDefault();

      if (delta > 0) {
        setVideoSwap(true);
      } else {
        setVideoSwap(false);
      }

      touchStartYRef.current = currentY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [menuOpen, setVideoSwap]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="horizon-page">
      <nav className="horizon-navbar">
        {brandName && brandName !== 'Shane Homes' ? (
          <div className="horizon-nav-brand text-sm font-semibold tracking-[0.18em] uppercase text-white">
            {brandName}
          </div>
        ) : (
          <ShaneHomesLogo className="horizon-nav-brand" />
        )}

        <ul className="horizon-nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="horizon-nav-actions">
          <a href={brand.phoneHref} className="horizon-phone">
            {brand.phone}
          </a>
          <HorizonCtaButton className="horizon-cta-btn" />
        </div>

        <button
          type="button"
          className={`horizon-hamburger ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="horizon-hamburger-line" />
          <span className="horizon-hamburger-line" />
        </button>
      </nav>

      <div className={`horizon-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="horizon-mobile-menu-bg" />
        <div className="horizon-mobile-menu-content">
          <ul className="horizon-mobile-menu-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="horizon-mobile-menu-cta">
            <a href={brand.phoneHref} className="horizon-mobile-phone">
              {brand.phone}
            </a>
            <HorizonCtaButton className="horizon-mobile-cta-btn" />
          </div>
        </div>
      </div>

      <div className="horizon-hero-outer">
        <section
          className={`horizon-hero-section ${heroVisible ? 'visible' : ''}`}
        >
          <video
            ref={video2Ref}
            className="horizon-hero-video"
            muted
            playsInline
            preload="auto"
            src={videos.scroll}
            poster={posterImage}
          />

          <video
            className={`horizon-hero-video horizon-video-1 ${video1Faded ? 'faded' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage}
          >
            <source src={videos.loop} type="video/mp4" />
          </video>

          <div className="horizon-center-logo-wrap">
            <div className="horizon-center-logo-container">
              <div className="horizon-circle-outer" />
              <div className="horizon-circle-inner" />
              <div className="horizon-center-logo-icon">
                <HorizonLogo />
              </div>
            </div>
          </div>

          <div className="horizon-bottom-text">
            <h1>
              {headline.line1}
              <br />
              {headline.line2}
            </h1>
            <p>{subheadline}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
