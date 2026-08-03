'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { X } from 'lucide-react';

const GRASS_GREEN = '#213138';
const FULL_TEXT = 'Velar.';
const HOUSE_IMG =
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1780471903/building_bzziky.png';
const BG_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85';

const GALLERY_VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260528_154759_4cdc8175-8261-497c-b688-9477c76545d4.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260528_154751_39b1b9bb-2708-4211-b6a2-d39f93309e52.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260528_154737_eba7900c-0313-483c-a30a-632c747ccc42.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_144009_4348fe33-f885-4345-8e92-3fe1c2625d32.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_145337_e44eaa8c-6bb1-4a6e-a70f-ed0231cbaccb.mp4',
] as const;

const CHAR_INTERVAL = 140;
const TYPE_START = 600;
const LIFT_AT = TYPE_START + 6 * CHAR_INTERVAL + 700;

const NAV_LINKS = ['Residences', 'Story', 'Listings', 'Inquire'] as const;

const TICKER_TEXT =
  'Velar.   Velar.   Velar.   Velar.   Velar.   Velar.   Velar.   Velar.  ';

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function CountUp({
  end,
  suffix = '',
}: {
  end: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        const duration = 2000;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setValue(Math.round(eased * end));
          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="s2-stat-number">
      {value}
      {suffix}
    </div>
  );
}

export function VelarLanding() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [lifting, setLifting] = useState(false);
  const [liftDone, setLiftDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const darkOuterRef = useRef<HTMLDivElement>(null);
  const darkStickyRef = useRef<HTMLElement>(null);
  const houseFixedRef = useRef<HTMLDivElement>(null);
  const houseInnerRef = useRef<HTMLDivElement>(null);
  const houseImgRef = useRef<HTMLImageElement>(null);

  const navColor = navOnDark ? '#ffffff' : GRASS_GREEN;

  useEffect(() => {
    const timers: number[] = [];

    FULL_TEXT.split('').forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleChars(i + 1);
        }, TYPE_START + i * CHAR_INTERVAL),
      );
    });

    timers.push(
      window.setTimeout(() => {
        setShowCursor(false);
      }, LIFT_AT - 150),
    );

    timers.push(
      window.setTimeout(() => {
        setLifting(true);
      }, LIFT_AT),
    );

    timers.push(
      window.setTimeout(() => {
        setHeroVisible(true);
      }, LIFT_AT + 1300),
    );

    timers.push(
      window.setTimeout(() => {
        setLiftDone(true);
      }, LIFT_AT + 2100),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const updateHousePosition = useCallback(() => {
    const houseFixed = houseFixedRef.current;
    const houseImg = houseImgRef.current;
    const hero = heroRef.current;
    const darkOuter = darkOuterRef.current;
    const darkSticky = darkStickyRef.current;

    if (!houseFixed || !houseImg || !hero || !darkOuter || !darkSticky) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const heroRect = hero.getBoundingClientRect();
    const darkRect = darkOuter.getBoundingClientRect();
    const stickyRect = darkSticky.getBoundingClientRect();
    const heroH = hero.offsetHeight;
    const imgH = houseImg.offsetHeight || houseImg.getBoundingClientRect().height;
    const baseW = Math.max(vw, 1400);

    const darkAtTop = stickyRect.top <= 0 && stickyRect.bottom > 0;
    setNavOnDark(darkAtTop);

    if (!liftDone) return;

    const triggerPoint = -(heroH * 0.3);
    const endPoint = heroRect.top - (darkRect.bottom - vh);
    const denom = endPoint - triggerPoint;
    const progress =
      denom === 0
        ? 0
        : Math.min(1, Math.max(0, (heroRect.top - triggerPoint) / denom));

    if (progress <= 0) {
      houseFixed.style.top = '';
      houseFixed.style.left = '';
      houseFixed.style.bottom = '0';
      houseFixed.style.width = '100%';
      houseFixed.style.minWidth = '1400px';
      houseFixed.style.transform = 'translateX(-50%)';
      houseFixed.style.transformOrigin = '';
      return;
    }

    const t = smoothstep(smoothstep(progress));
    const finalScale = 1.45;
    const startX = (vw - baseW) / 2;
    const startY = vh - imgH;
    const finalX = (vw - baseW * finalScale) / 2;
    const mobileOffset = vw < 1024 ? -250 : 4;
    const finalY = darkRect.bottom - imgH * finalScale + 500 + mobileOffset;

    const currentX = startX + (finalX - startX) * t;
    const currentY = startY + (finalY - startY) * t;
    const currentScale = 1 + (finalScale - 1) * t;

    houseFixed.style.bottom = 'auto';
    houseFixed.style.top = '0';
    houseFixed.style.left = '0';
    houseFixed.style.width = `${baseW}px`;
    houseFixed.style.minWidth = `${baseW}px`;
    houseFixed.style.transformOrigin = 'top left';
    houseFixed.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
  }, [liftDone]);

  useEffect(() => {
    updateHousePosition();
    window.addEventListener('scroll', updateHousePosition, { passive: true });
    window.addEventListener('resize', updateHousePosition);

    return () => {
      window.removeEventListener('scroll', updateHousePosition);
      window.removeEventListener('resize', updateHousePosition);
    };
  }, [updateHousePosition]);

  useEffect(() => {
    if (!liftDone) return;
    const img = houseImgRef.current;
    if (!img) return;

    if (img.complete) {
      updateHousePosition();
      return;
    }

    const onLoad = () => updateHousePosition();
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, [liftDone, updateHousePosition]);

  const typed = FULL_TEXT.slice(0, visibleChars);

  return (
    <div className="velar-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;700;800;900&display=swap');
      `}</style>

      <div
        className={`velar-preloader${lifting ? ' is-lifting' : ''}${
          liftDone ? ' is-parked' : ''
        }`}
        aria-hidden={liftDone}
      >
        <div className="velar-typewriter" aria-label={FULL_TEXT}>
          {typed.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={`char${char === '.' ? ' is-dot' : ''}`}
            >
              {char}
            </span>
          ))}
          {showCursor ? <span className="velar-cursor" /> : null}
        </div>
      </div>

      <nav className="velar-nav" style={{ color: navColor }}>
        <a href="#" className="velar-logo" style={{ color: navColor }}>
          {FULL_TEXT.slice(0, -1)
            .split('')
            .map((char, index) => (
              <span key={`logo-${index}`} className="logo-char">
                {char}
              </span>
            ))}
          <span className="logo-dot">.</span>
        </a>

        <button
          type="button"
          className="velar-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          style={{ color: menuOpen ? '#000' : navColor }}
        >
          {menuOpen ? (
            <X size={24} strokeWidth={1.25} />
          ) : (
            <>
              <span className="line" />
              <span className="line" />
            </>
          )}
        </button>
      </nav>

      {menuOpen ? (
        <div className="velar-mobile-menu">
          <ul>
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <section
        ref={heroRef}
        id="residences"
        className="velar-hero"
        style={{ backgroundImage: `url(${BG_IMG})` }}
      >
        <div
          className={`hero-text-block${heroVisible ? ' is-visible' : ''}`}
        >
          <div className="hero-heading-top">
            <p className="hero-own-the">LIVE IN</p>
            <p className="hero-subtitle-desktop">
              Stately homes built with vision,
              <br />
              scope, and architectural finesse.
            </p>
          </div>

          <div className="hero-extraordinary-wrap">
            <h1 className="hero-extraordinary">IRREPLACEABLE</h1>
          </div>

          <p className="hero-subtitle-mobile">
            Premium real estate with vision,
            <br />
            depth, and architectural clarity.
          </p>
        </div>
      </section>

      <div
        ref={houseFixedRef}
        className="velar-house-fixed"
        style={{ zIndex: 22 } as CSSProperties}
      >
        <div
          ref={houseInnerRef}
          className={`velar-house-inner${lifting ? ' is-risen' : ''}${
            liftDone ? ' is-scroll-driven' : ''
          }`}
        >
          <img
            ref={houseImgRef}
            src={HOUSE_IMG}
            alt=""
            aria-hidden
            draggable={false}
          />
        </div>
      </div>

      <div ref={darkOuterRef} className="velar-dark-outer" id="story">
        <div className="velar-dark-spacer" />
        <section ref={darkStickyRef} className="s2-section">
          <div className="s2-content">
            <div className="s2-statement-wrap">
              <p className="s2-statement">
                Every estate we present is hand-chosen
                <br />
                through a frame of permanence, refinement,
                <br />
                and timeless detail. Standards are not
                <br />
                a flourish. It is our discipline.
              </p>
            </div>

            <div className="s2-stats-row">
              <div className="s2-stat">
                <CountUp end={120} suffix="+" />
                <div className="s2-stat-label">Portfolio Holdings</div>
              </div>
              <div className="s2-stat">
                <CountUp end={12} />
                <div className="s2-stat-label">Global Locations</div>
              </div>
              <div className="s2-stat">
                <CountUp end={98} suffix="%" />
                <div className="s2-stat-label">Patron Loyalty Rate</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="s3-gallery-section" id="listings">
        <div className="s3-ticker-wrap" aria-hidden>
          <div className="ticker-track">
            <span>{TICKER_TEXT}</span>
            <span>{TICKER_TEXT}</span>
          </div>
        </div>

        <div className="s3-gallery-content">
          <div
            className="gallery-expand-row"
            onMouseLeave={() => setHoveredGallery(null)}
          >
            {GALLERY_VIDEOS.map((src, index) => (
              <div
                key={src}
                className={`gallery-expand-item${
                  hoveredGallery === index ? ' is-hovered' : ''
                }`}
                onMouseEnter={() => setHoveredGallery(index)}
              >
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="inquire"
        className="relative z-30 bg-[#f5f0ea] px-6 py-20 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-3xl">
          <p
            className="font-[Syne] text-sm uppercase tracking-[0.25em]"
            style={{ color: GRASS_GREEN }}
          >
            Inquire
          </p>
          <h2 className="mt-4 font-[Syne] text-4xl font-extrabold tracking-tight text-black md:text-5xl">
            Begin a private conversation.
          </h2>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-black/65">
            Share your brief and our advisors will arrange a confidential
            introduction to residences that meet Velar&apos;s standard.
          </p>
          <a
            href="mailto:inquire@velar.estate"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white"
            style={{ background: GRASS_GREEN }}
          >
            inquire@velar.estate
          </a>
        </div>
      </section>
    </div>
  );
}
