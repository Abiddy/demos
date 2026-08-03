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
const FULL_TEXT = 'Lesli';
const HOUSE_IMG =
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1780471903/building_bzziky.png';
const BG_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85';
const AGENT_IMG = '/lesli/lesli-portrait.jpg';
const AGENT_AVATAR = '/lesli/lesli-headshot.jpg';
const CONTACT_BG =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85';
const SITE_URL = 'https://www.leslikoontzrealestate.com/';
const CALENDLY_URL = 'https://calendly.com/';
const PHONE = '(310) 722-5194';
const TEL = 'tel:+13107225194';
const ADDRESS = '511 Torrance Blvd, Redondo Beach, CA 90277';

const CLOSED_DEALS = [
  {
    id: 'redondo',
    price: '$1,875,000',
    location: 'Redondo Beach, CA',
    beds: 4,
    baths: 3,
    sqft: '2,410',
    days: 11,
    saved: 'South Bay',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hollywood-riviera',
    price: '$2,250,000',
    location: 'Hollywood Riviera',
    beds: 4,
    baths: 3,
    sqft: '2,680',
    days: 9,
    saved: 'Coastal',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'palos-verdes',
    price: '$2,695,000',
    location: 'Palos Verdes',
    beds: 5,
    baths: 4,
    sqft: '3,420',
    days: 14,
    saved: 'Luxury',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'manhattan',
    price: '$1,549,000',
    location: 'Manhattan Beach',
    beds: 3,
    baths: 2,
    sqft: '1,860',
    days: 16,
    saved: 'Sold',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hermosa',
    price: '$1,799,000',
    location: 'Hermosa Beach',
    beds: 3,
    baths: 3,
    sqft: '2,050',
    days: 12,
    saved: 'Buyer Win',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=85',
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
    title: 'Share your South Bay goals',
    body: 'Buying, selling, or relocating — tell Lesli about your timeline, neighborhood, and must-haves.',
  },
  {
    num: '02',
    title: 'Get a clear local strategy',
    body: 'Pricing, positioning, and neighborhood insight backed by 20+ years of marketing & sales expertise.',
  },
  {
    num: '03',
    title: 'Find your happy place',
    body: 'From first conversation to closing keys — guided with care across Redondo, Riviera, and Palos Verdes.',
  },
] as const;

const SERVICES = [
  {
    title: 'Seller Guidance',
    body: 'Pricing, staging, and marketing that highlight your home — so you launch strong and sell with confidence.',
  },
  {
    title: 'Buyer Representation',
    body: 'Customized home search across the South Bay with local insight that helps you move decisively.',
  },
  {
    title: 'Neighborhood Expertise',
    body: 'Hollywood Riviera, Palos Verdes, Redondo Beach, and beyond — communities Lesli knows firsthand.',
  },
  {
    title: 'Full-Service Support',
    body: 'Attentive listening, hard work, and follow-through — treated like family from start to finish.',
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

export function LesliLanding() {
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
              Welcome to the South Bay with
              <br />
              <span className="hm-gradient-text">Lesli Koontz</span>
            </h1>

            <p className="hm-hero-sub">
              Find your happy place —{' '}
              <span className="hm-accent">guided by a local expert</span>.
            </p>

            <div className="hm-hero-panel">
              <ul className="hm-hero-perks">
                {[
                  '20+ Years Experience',
                  'South Bay Specialist',
                  '5.0 Google Rating',
                ].map((perk) => (
                  <li key={perk}>
                    <CheckCircle2 size={15} strokeWidth={1.75} aria-hidden />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <form
                className="hm-hero-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  window.location.href = TEL;
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
                Call or book — complimentary market analysis for South Bay
                homeowners.
              </p>

              <div className="hm-hero-trust">
                <div className="hm-hero-avatars" aria-hidden>
                  <span className="hm-avatar hm-avatar-sj">LK</span>
                  <span className="hm-avatar hm-avatar-mr">RB</span>
                  <span className="hm-avatar hm-avatar-lp">PV</span>
                  <span className="hm-avatar hm-avatar-more">36</span>
                </div>
                <div>
                  <p className="hm-hero-trust-label">
                    5.0 stars · 36 Google reviews
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
                Your South Bay happy place starts here.
                <br />
                Local expertise, marketing strength,
                <br />
                and genuine care — helping buyers
                <br />
                and sellers feel right at home.
              </p>
            </div>

            <div className="s2-stats-row">
              <div className="s2-stat">
                <CountUp end={20} suffix="+" />
                <div className="s2-stat-label">Years Experience</div>
              </div>
              <div className="s2-stat">
                <CountUp end={5} decimals={1} />
                <div className="s2-stat-label">Google Rating</div>
              </div>
              <div className="s2-stat">
                <CountUp end={36} />
                <div className="s2-stat-label">Client Reviews</div>
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
            <p className="hm-deals-gallery-eyebrow">South Bay results</p>
            <h2 className="hm-deals-gallery-title">Closed Deals</h2>
            <p className="hm-deals-gallery-sub">
              Redondo Beach, Hollywood Riviera, Palos Verdes &amp; nearby
              coastal communities.
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
                    {deal.saved}
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
              <img src={AGENT_IMG} alt="Lesli Koontz, Realtor" />
            </div>
            <div className="hm-agent-copy">
              <p className="hm-eyebrow">Hello from Lesli</p>
              <h2 className="hm-heading">
                Lesli Koontz,
                <br />
                Realtor®
              </h2>
              <p className="hm-body">
                Global Real Estate Advisor with Scott Anastasi Realty —
                helping South Bay buyers and sellers find their happy place.
                MBA in Marketing, 20+ years of sales expertise, and a deep love
                for Redondo Beach and the communities nearby.{' '}
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hm-inline-link"
                >
                  leslikoontzrealestate.com
                </a>
              </p>
              <ul className="hm-agent-points">
                <li>South Bay local — Redondo, Riviera &amp; Palos Verdes</li>
                <li>5.0 Google rating from 36 reviews</li>
                <li>Call or book an appointment anytime</li>
              </ul>
              <div className="hm-agent-actions">
                <a href={TEL} className="hm-btn hm-btn-primary">
                  <Phone size={16} strokeWidth={1.75} />
                  {PHONE}
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hm-btn hm-btn-ghost"
                >
                  Book appointment
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
            <p className="hm-eyebrow">How Lesli helps</p>
            <h2 className="hm-heading">Buyer &amp; seller support that feels personal.</h2>
            <p className="hm-body hm-body-narrow">
              From a complimentary market analysis to closing day — attentive,
              local, and focused on your next chapter.
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
          <p className="hm-contact-kicker">Call or book 7 days a week</p>
          <h2 className="hm-contact-title">Ready when you are.</h2>

          <div className="hm-contact-card">
            <div className="hm-contact-card-top">
              <img src={AGENT_AVATAR} alt="" className="hm-contact-avatar" />
              <div>
                <p className="hm-contact-name">Lesli Koontz, Realtor®</p>
                <p className="hm-contact-brand">
                  Scott Anastasi Realty · Redondo Beach
                </p>
              </div>
            </div>
            <p className="hm-contact-address">
              {ADDRESS}
              <br />
              Open daily · closes 9 PM
            </p>
            <a href={TEL} className="hm-contact-phone">
              {PHONE}
            </a>
            <div className="hm-contact-actions">
              <a href={TEL} className="hm-btn hm-btn-primary">
                <Phone size={16} strokeWidth={1.75} />
                Call now
              </a>
              <a
                href={SITE_URL}
                target="_blank"
                rel="noreferrer"
                className="hm-btn hm-btn-light"
              >
                Visit website
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="hm-footer">
        <div className="hm-shell hm-footer-inner">
          <span className="hm-footer-brand">Lesli Koontz</span>
          <p>
            Real estate services provided by licensed professionals. Demo site
            for presentation purposes.
          </p>
          <span>© {new Date().getFullYear()} Lesli Koontz Real Estate</span>
        </div>
      </footer>
    </div>
  );
}
