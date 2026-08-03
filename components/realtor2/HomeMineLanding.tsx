'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  Search,
  Square,
  Star,
  X,
} from 'lucide-react';

const GRASS_GREEN = '#213138';
const FULL_TEXT = 'HomeMine';
const HOUSE_IMG =
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1780471903/building_bzziky.png';
const BG_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85';
const CHRIS_IMG = '/realtor2/chris-jones.png';
const CONTACT_BG =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85';

const CLOSED_DEALS = [
  {
    id: 'denver',
    price: '$845,000',
    location: 'Denver, CO',
    beds: 5,
    baths: 4,
    sqft: '3,120',
    days: 9,
    saved: '$12,675',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'columbus',
    price: '$372,000',
    location: 'Columbus, OH',
    beds: 3,
    baths: 2,
    sqft: '1,540',
    days: 18,
    saved: '$5,580',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'san-diego',
    price: '$1,150,000',
    location: 'San Diego, CA',
    beds: 4,
    baths: 3,
    sqft: '2,950',
    days: 7,
    saved: '$17,250',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'raleigh',
    price: '$528,000',
    location: 'Raleigh, NC',
    beds: 4,
    baths: 3,
    sqft: '2,210',
    days: 16,
    saved: '$7,920',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'austin',
    price: '$612,000',
    location: 'Austin, TX',
    beds: 4,
    baths: 3,
    sqft: '2,480',
    days: 11,
    saved: '$9,180',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'tampa',
    price: '$489,000',
    location: 'Tampa, FL',
    beds: 3,
    baths: 2,
    sqft: '1,860',
    days: 14,
    saved: '$7,335',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
] as const;

const CHAR_INTERVAL = 120;
const TYPE_START = 600;
const LIFT_AT = TYPE_START + FULL_TEXT.length * CHAR_INTERVAL + 700;

const NAV_LINKS = [
  { label: 'Sell', href: '#sell' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Results', href: '#results' },
  { label: 'Agent', href: '#agent' },
  { label: 'Contact', href: '#contact' },
] as const;

const STEPS = [
  {
    num: '01',
    title: 'Tell us about your home',
    body: 'Share your address and a few quick details. It takes about a minute — no obligation.',
  },
  {
    num: '02',
    title: 'Work with a top local pro',
    body: 'Get matched with a vetted agent like Chris Jones who lists for just 1.5% — about half the usual fee.',
  },
  {
    num: '03',
    title: 'Sell & keep more at closing',
    body: 'Pricing, marketing, and negotiation handled end to end — so more equity stays with you.',
  },
] as const;

const SERVICES = [
  {
    title: 'Pricing Strategy',
    body: 'A free valuation backed by live comps and market data — priced to attract buyers and maximize your return.',
  },
  {
    title: 'Pro Marketing',
    body: 'HDR photography, video, and syndication across 100+ sites including Zillow, Realtor.com, and Redfin.',
  },
  {
    title: 'Expert Negotiation',
    body: 'Every offer reviewed for price, terms, and contingencies — with you in full control.',
  },
  {
    title: 'Closing Support',
    body: 'From inspection to signing, every detail managed so your sale closes cleanly and on time.',
  },
] as const;

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function CountUp({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
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
          const next = eased * end;
          setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, decimals]);

  return (
    <div ref={ref} className="s2-stat-number">
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </div>
  );
}

export function HomeMineLanding() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [lifting, setLifting] = useState(false);
  const [liftDone, setLiftDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [address, setAddress] = useState('');
  const [hoveredDeal, setHoveredDeal] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const darkOuterRef = useRef<HTMLDivElement>(null);
  const darkStickyRef = useRef<HTMLElement>(null);
  const houseFixedRef = useRef<HTMLDivElement>(null);
  const houseInnerRef = useRef<HTMLDivElement>(null);
  const houseImgRef = useRef<HTMLImageElement>(null);

  const galleryDeals = CLOSED_DEALS.slice(0, 5);
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&family=Syne:wght@400;500;600;700&display=swap');
      `}</style>

      <div
        className={`velar-preloader${lifting ? ' is-lifting' : ''}${
          liftDone ? ' is-parked' : ''
        }`}
        aria-hidden={liftDone}
      >
        <div className="velar-typewriter" aria-label={FULL_TEXT}>
          {typed.split('').map((char, index) => (
            <span key={`${char}-${index}`} className="char">
              {char}
            </span>
          ))}
          {showCursor ? <span className="velar-cursor" /> : null}
        </div>
      </div>

      <nav className="velar-nav" style={{ color: navColor }}>
        <a href="#sell" className="velar-logo" style={{ color: navColor }}>
          {FULL_TEXT.split('').map((char, index) => (
            <span key={`logo-${index}`} className="logo-char">
              {char}
            </span>
          ))}
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
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <section ref={heroRef} id="sell" className="velar-hero hm-hero">
        {/* z-1 sky — below the house (z-22) */}
        <div
          className="hm-hero-sky"
          style={{ backgroundImage: `url(${BG_IMG})` }}
          aria-hidden
        >
          <div className="hm-hero-wash" />
        </div>

        {/* z-30 text — above the house */}
        <div className="hm-hero-pin">
          <div
            className={`hero-text-block hm-hero-content${
              heroVisible ? ' is-visible' : ''
            }`}
          >
            <h1 className="hm-hero-title">
              Get the best price for your home
              <br />
              with <span className="hm-gradient-text">HomeMine</span>
            </h1>

            <p className="hm-hero-sub">
              Sell with a top local professional for just{' '}
              <span className="hm-accent">1.5%</span> listing fee.
            </p>

            <div className="hm-hero-panel">
              <ul className="hm-hero-perks">
                {['No Obligation', 'No Pressure', '100% Free to Start'].map(
                  (perk) => (
                    <li key={perk}>
                      <CheckCircle2 size={15} strokeWidth={1.75} aria-hidden />
                      <span>{perk}</span>
                    </li>
                  ),
                )}
              </ul>

              <form
                className="hm-hero-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  window.location.href = `tel:+13106587060`;
                }}
              >
                <label className="hm-hero-input-wrap">
                  <MapPin size={18} strokeWidth={1.5} aria-hidden />
                  <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter your property address"
                    aria-label="Property address"
                  />
                </label>
                <button type="submit" className="hm-hero-search-btn">
                  <Search size={16} strokeWidth={1.75} aria-hidden />
                  Get Matched
                </button>
              </form>

              <p className="hm-hero-fast">
                <Clock3 size={14} strokeWidth={1.5} aria-hidden />
                Matched with top local agents in under 60 seconds — fast, free
                &amp; easy.
              </p>

              <div className="hm-hero-trust">
                <div className="hm-hero-avatars" aria-hidden>
                  <span className="hm-avatar hm-avatar-sj">SJ</span>
                  <span className="hm-avatar hm-avatar-mr">MR</span>
                  <span className="hm-avatar hm-avatar-lp">LP</span>
                  <span className="hm-avatar hm-avatar-more">+2K</span>
                </div>
                <div>
                  <p className="hm-hero-trust-label">
                    Trusted by 2,000+ homeowners
                  </p>
                  <div className="hm-hero-stars" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        fill="#d4a106"
                        stroke="#d4a106"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* z-22 house — above sky, below text */}
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

      <div ref={darkOuterRef} className="velar-dark-outer" id="why-us">
        <div className="velar-dark-spacer" />
        <section ref={darkStickyRef} className="s2-section">
          <div className="s2-content">
            <div className="s2-statement-wrap">
              <p className="s2-statement">
                Keep more of your equity at closing.
                <br />
                Full-service selling for 1.5% — half
                <br />
                the usual listing fee — with expert
                <br />
                pricing, marketing, and negotiation.
              </p>
            </div>

            <div className="s2-stats-row">
              <div className="s2-stat">
                <CountUp end={1.5} suffix="%" decimals={1} />
                <div className="s2-stat-label">Listing Fee</div>
              </div>
              <div className="s2-stat">
                <CountUp end={2000} suffix="+" />
                <div className="s2-stat-label">Trusted Homeowners</div>
              </div>
              <div className="s2-stat">
                <CountUp end={7} prefix="$" suffix="K+" />
                <div className="s2-stat-label">Avg. Seller Savings</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="s3-gallery-section hm-deals-gallery" id="results">
        <div className="s3-ticker-wrap" aria-hidden>
          <div className="ticker-track">
            <span>Closed Deals   Closed Deals   Closed Deals   Closed Deals   </span>
            <span>Closed Deals   Closed Deals   Closed Deals   Closed Deals   </span>
          </div>
        </div>

        <div className="s3-gallery-content">
          <div className="hm-deals-gallery-intro">
            <p className="hm-deals-gallery-eyebrow">Recently closed</p>
            <h2 className="hm-deals-gallery-title">Closed Deals</h2>
            <p className="hm-deals-gallery-sub">
              Homeowners keeping more equity with a 1.5% listing fee.
            </p>
          </div>

          <div
            className="gallery-expand-row"
            onMouseLeave={() => setHoveredDeal(null)}
          >
            {galleryDeals.map((deal, index) => (
              <article
                key={deal.id}
                className={`gallery-expand-item hm-deal-panel${
                  hoveredDeal === index ? ' is-hovered' : ''
                }`}
                onMouseEnter={() => setHoveredDeal(index)}
              >
                <img
                  src={deal.image}
                  alt={`Home sold in ${deal.location}`}
                  className="hm-deal-panel-image"
                />
                <div className="hm-deal-panel-scrim" />
                <div className="hm-deal-panel-top">
                  <span className="hm-deal-badge hm-deal-badge-dark">
                    Sold in {deal.days} days
                  </span>
                  <span className="hm-deal-badge hm-deal-badge-orange">
                    Saved {deal.saved}
                  </span>
                </div>
                <div className="hm-deal-panel-copy">
                  <p className="hm-deal-panel-price">{deal.price}</p>
                  <p className="hm-deal-panel-location">
                    <MapPin size={13} strokeWidth={2} aria-hidden />
                    {deal.location}
                  </p>
                  <div className="hm-deal-panel-meta">
                    <span>
                      <BedDouble size={14} strokeWidth={1.75} aria-hidden />
                      {deal.beds} bd
                    </span>
                    <span>
                      <Bath size={14} strokeWidth={1.75} aria-hidden />
                      {deal.baths} ba
                    </span>
                    <span>
                      <Square size={14} strokeWidth={1.75} aria-hidden />
                      {deal.sqft}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-section hm-agent" id="agent">
        <div className="hm-shell">
          <div className="hm-agent-grid">
            <div className="hm-agent-portrait">
              <img src={CHRIS_IMG} alt="Chris Jones, Realtor" />
            </div>
            <div className="hm-agent-copy">
              <p className="hm-eyebrow">Your local advisor</p>
              <h2 className="hm-heading">
                Chris Jones,
                <br />
                Realtor
              </h2>
              <p className="hm-body">
                A trusted local professional helping Southern California
                homeowners sell with confidence — full service, premium
                marketing, and a transparent 1.5% listing fee through{' '}
                <a
                  href="https://homemine.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hm-inline-link"
                >
                  HomeMine
                </a>
                .
              </p>
              <ul className="hm-agent-points">
                <li>Top local guidance from estimate to closing</li>
                <li>No obligation · No pressure · Free to start</li>
                <li>Available 24/7 — call or text anytime</li>
              </ul>
              <div className="hm-agent-actions">
                <a href="tel:+13106587060" className="hm-btn hm-btn-primary">
                  <Phone size={16} strokeWidth={1.75} />
                  (310) 658-7060
                </a>
                <a href="#contact" className="hm-btn hm-btn-ghost">
                  Contact details
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hm-section hm-services" id="services">
        <div className="hm-shell">
          <div className="hm-section-head">
            <p className="hm-eyebrow">Full-service selling</p>
            <h2 className="hm-heading">Everything included. One clear fee.</h2>
            <p className="hm-body hm-body-narrow">
              From pricing your home to handing over the keys — handled for a
              single 1.5% listing fee.
            </p>
          </div>

          <div className="hm-service-grid">
            {SERVICES.map((service, index) => (
              <article key={service.title} className="hm-service-card">
                <span className="hm-service-num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>

          <div className="hm-steps">
            {STEPS.map((step) => (
              <article key={step.num} className="hm-step">
                <span className="hm-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-contact" id="contact">
        <div
          className="hm-contact-bg"
          style={{ backgroundImage: `url(${CONTACT_BG})` }}
        />
        <div className="hm-contact-scrim" />
        <div className="hm-shell hm-contact-inner">
          <p className="hm-contact-kicker">Contact us 24/7 — call or text</p>
          <h2 className="hm-contact-title">Ready when you are.</h2>

          <div className="hm-contact-card">
            <div className="hm-contact-card-top">
              <img src={CHRIS_IMG} alt="" className="hm-contact-avatar" />
              <div>
                <p className="hm-contact-name">Chris Jones, Realtor</p>
                <p className="hm-contact-brand">HomeMine Real Estate</p>
              </div>
            </div>
            <p className="hm-contact-address">
              303 N Glenoaks Blvd Ste 200
              <br />
              Burbank, CA 91502
            </p>
            <a href="tel:+13106587060" className="hm-contact-phone">
              (310) 658-7060
            </a>
            <div className="hm-contact-actions">
              <a href="tel:+13106587060" className="hm-btn hm-btn-primary">
                Call now
              </a>
              <a
                href="https://homemine.com/"
                target="_blank"
                rel="noreferrer"
                className="hm-btn hm-btn-light"
              >
                Visit HomeMine
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="hm-footer">
        <div className="hm-shell hm-footer-inner">
          <span className="hm-footer-brand">HomeMine</span>
          <p>
            Listing services provided with licensed professionals. Broker
            compensation is fully negotiable.
          </p>
          <span>© {new Date().getFullYear()} HomeMine</span>
        </div>
      </footer>
    </div>
  );
}
