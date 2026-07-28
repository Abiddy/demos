'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { jrConfig, type JrConfig } from '@/data/jr';
import { JrBuildingScene } from './JrBuildingScene';
import './jr-landing.css';

function LetterHeading({
  text,
  className,
  staggerMs = 50,
  revealed,
}: {
  text: string;
  className?: string;
  staggerMs?: number;
  revealed: boolean;
}) {
  return (
    <div className={className}>
      {text.split('').map((char, index) => (
        <span
          key={`${text}-${index}`}
          className={`jr-letter ${revealed ? 'revealed' : ''}`}
          style={{ transitionDelay: `${index * staggerMs}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="jr-bounce-arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

type JrLandingProps = {
  config?: JrConfig;
};

export function JrLanding({ config = jrConfig }: JrLandingProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [viewRevealed, setViewRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateViewport = () => setViewportHeight(window.innerHeight);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewEl = viewRef.current;
    if (!viewEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setViewRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(viewEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const thumbDelays = [450, 600, 750, 900];
  const cardDelays = [400, 600, 800];
  const drawerDelays = [150, 230, 310];

  return (
    <div className="jr-page">
      <div className={`jr-mobile-overlay ${menuOpen ? 'open' : ''}`}>
        <div
          className="jr-mobile-overlay-bg"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        <div className="jr-mobile-drawer">
          <button
            type="button"
            className="jr-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
          <nav className="jr-drawer-nav">
            {config.navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: `${drawerDelays[index]}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="jr-drawer-bottom">
            <a href={`tel:${config.phoneHref}`} aria-label="Call JR Construction">
              <PhoneIcon />
            </a>
            <a href="#portfolio" aria-label="View portfolio">
              <SearchIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="jr-page-wrapper">
        <div className="jr-shared-container">
          <JrBuildingScene
            scrollY={scrollY}
            viewportHeight={viewportHeight}
            mouseX={mouse.x}
            mouseY={mouse.y}
            image={config.buildingImage}
          />
          <div className="jr-scene-vignette" aria-hidden />

          <section ref={heroRef} className="jr-hero-section" id="about">
            <div className="jr-hero-heading-wrapper">
              <LetterHeading
                text={config.heroHeading}
                className="jr-hero-heading"
                revealed={heroRevealed}
              />
            </div>

            <nav className={`jr-main-nav ${heroRevealed ? 'revealed' : ''}`}>
              <div className="jr-nav-links">
                {config.navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                type="button"
                className="jr-hamburger"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>

              <span className="jr-nav-brand">{config.brand}</span>

              <div className="jr-nav-right">
                <a
                  href={`tel:${config.phoneHref}`}
                  className="jr-desktop-only"
                  aria-label="Call JR Construction"
                >
                  <PhoneIcon />
                </a>
                <a href="#portfolio" aria-label="View portfolio">
                  <SearchIcon />
                </a>
              </div>
            </nav>

            <div
              className={`jr-side-thumbnails ${heroRevealed ? 'revealed' : ''}`}
            >
              {config.thumbnails.map((thumb, index) => (
                <div
                  key={thumb.src}
                  className="jr-thumb"
                  style={{ transitionDelay: `${thumbDelays[index]}ms` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb.src} alt={thumb.alt} />
                </div>
              ))}
            </div>

            <div className={`jr-right-line ${heroRevealed ? 'revealed' : ''}`}>
              <div />
            </div>

            <div
              className={`jr-bottom-text ${heroRevealed ? 'revealed' : ''}`}
            >
              <p>{config.bottomText}</p>
              <ChevronDownIcon />
            </div>
          </section>

          <section
            ref={viewRef}
            className="jr-view-section"
            id="portfolio"
          >
            <div className="jr-view-inner">
              <div className="jr-view-top">
                <div className="jr-view-heading-row">
                  <LetterHeading
                    text={config.viewHeading}
                    className="jr-view-heading"
                    revealed={viewRevealed}
                  />
                  <div className="jr-view-line">
                    <div />
                  </div>
                </div>
                <div
                  className={`jr-view-subtext-row ${viewRevealed ? 'revealed' : ''}`}
                  id="services"
                >
                  <p className="jr-view-subtext">{config.viewSubtext}</p>
                </div>
              </div>

              <div className="jr-view-cards">
                {config.portfolioCards.map((card, index) => (
                  <div
                    key={card.title}
                    className={`jr-view-card ${viewRevealed ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${cardDelays[index]}ms` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.src} alt={card.alt} />
                    <span className="jr-card-title">{card.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="jr-footer-strip">
          <p>
            {config.rating} ★ · {config.reviews} · {config.address}
          </p>
          <a href={`tel:${config.phoneHref}`}>{config.phone}</a>
        </footer>
      </div>
    </div>
  );
}
