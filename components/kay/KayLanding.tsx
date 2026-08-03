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
  Mail,
  MapPin,
  Phone,
  Search,
  Square,
  Star,
  X,
} from 'lucide-react';

const GRASS_GREEN = '#213138';
const FULL_TEXT = 'Kay';
const HOUSE_IMG =
  'https://res.cloudinary.com/dsdhxhhqh/image/upload/v1780471903/building_bzziky.png';
const BG_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85';
const AGENT_IMG = '/kay/kay-portrait.jpg';
const AGENT_AVATAR = '/kay/kay-portrait.jpg';
const CONTACT_BG =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85';
const SITE_URL = 'https://kaycorken.com/';
const PHONE = '(303) 888-1302';
const TEL = 'tel:+13038881302';
const EMAIL = 'kcorken920@gmail.com';
const MAILTO = 'mailto:kcorken920@gmail.com';
const ADDRESS = '19501 East Mainstreet, Suite 200, Parker, CO 80138';
const BROKER = 'Kay Real Estate';
const LICENSE = 'ER.001323610';

const CLOSED_DEALS = [
  {
    id: 'parker',
    price: '$875,000',
    location: 'Parker, CO',
    beds: 4,
    baths: 3,
    sqft: '2,680',
    days: 12,
    saved: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'denver',
    price: '$1,150,000',
    location: 'Denver Metro',
    beds: 4,
    baths: 3,
    sqft: '3,120',
    days: 9,
    saved: 'Luxury',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'commercial',
    price: '$2,450,000',
    location: 'South Metro Denver',
    beds: 0,
    baths: 0,
    sqft: 'Office',
    days: 21,
    saved: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'ranch',
    price: '$1,895,000',
    location: 'Colorado Front Range',
    beds: 5,
    baths: 4,
    sqft: 'Farm & Ranch',
    days: 18,
    saved: 'Land',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'condo',
    price: '$525,000',
    location: 'Aurora / Parker',
    beds: 2,
    baths: 2,
    sqft: '1,240',
    days: 14,
    saved: 'Condo',
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
    title: 'Tell Kay your goals',
    body: 'Residential, commercial, land, or probate — share your timeline and what success looks like.',
  },
  {
    num: '02',
    title: 'Get seasoned guidance',
    body: 'Serving Colorado since 1993 with honesty, integrity, and a fierce advocate in your corner.',
  },
  {
    num: '03',
    title: 'Close with confidence',
    body: 'From first conversation to closing — experience that makes a difference for buyers and sellers.',
  },
] as const;

const SERVICES = [
  {
    title: 'Residential Sales',
    body: 'Luxury homes, condos, townhomes, and new construction — full-service support for Colorado buyers and sellers.',
  },
  {
    title: 'Commercial & Land',
    body: 'Certified commercial brokerage for sales, leasing, land, and specialized properties across the Front Range.',
  },
  {
    title: 'Probate Specialist',
    body: 'Guided probate real estate with clarity and care when families need an experienced professional.',
  },
  {
    title: 'Farm, Ranch & Beyond',
    body: 'From aviation hangar homes to farm & ranch — trusted expertise for unique Colorado properties.',
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

export function KayLanding() {
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
              Experience that makes a difference with
              <br />
              <span className="hm-gradient-text">Kay Corken</span>
            </h1>

            <p className="hm-hero-sub">
              Colorado real estate since 1993 —{' '}
              <span className="hm-accent">Kay Real Estate</span>.
            </p>

            <div className="hm-hero-panel">
              <ul className="hm-hero-perks">
                {[
                  'Broker · Owner',
                  'Serving Since 1993',
                  'Residential & Commercial',
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
                Call or email — dedicated full-time brokerage for Colorado buyers
                &amp; sellers.
              </p>

              <div className="hm-hero-trust">
                <div className="hm-hero-avatars" aria-hidden>
                  <span className="hm-avatar hm-avatar-sj">KC</span>
                  <span className="hm-avatar hm-avatar-mr">CO</span>
                  <span className="hm-avatar hm-avatar-lp">PK</span>
                  <span className="hm-avatar hm-avatar-more">30+</span>
                </div>
                <div>
                  <p className="hm-hero-trust-label">
                    Trusted since 1993 · Parker, CO
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
                Experience does make a difference.
                <br />
                A legacy rooted in hard work and
                <br />
                integrity — serving Colorado buyers
                <br />
                and sellers since 1993.
              </p>
            </div>

            <div className="s2-stats-row">
              <div className="s2-stat">
                <CountUp end={1993} />
                <div className="s2-stat-label">Serving Since</div>
              </div>
              <div className="s2-stat">
                <CountUp end={30} suffix="+" />
                <div className="s2-stat-label">Years Experience</div>
              </div>
              <div className="s2-stat">
                <CountUp end={2} />
                <div className="s2-stat-label">Residential + Commercial</div>
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
            <p className="hm-deals-gallery-eyebrow">Colorado results</p>
            <h2 className="hm-deals-gallery-title">Closed Deals</h2>
            <p className="hm-deals-gallery-sub">
              Residential, commercial, land &amp; specialty properties across
              Colorado and beyond.
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
                    {deal.beds > 0 ? (
                      <>
                        <span>
                          <BedDouble size={14} strokeWidth={1.75} aria-hidden />
                          {deal.beds} bd
                        </span>
                        <span>
                          <Bath size={14} strokeWidth={1.75} aria-hidden />
                          {deal.baths} ba
                        </span>
                      </>
                    ) : null}
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
              <img src={AGENT_IMG} alt="Kay Corken, Broker Owner" />
            </div>
            <div className="hm-agent-copy">
              <p className="hm-eyebrow">Meet your broker</p>
              <h2 className="hm-heading">
                Kay Corken,
                <br />
                Broker · Owner
              </h2>
              <p className="hm-body">
                Dedicated full-time Broker with {BROKER} ({LICENSE}). A solid
                client foundation built on loyalty, repeat business, and
                referrals — fiercely advocating for buyers and sellers across
                Colorado since 1993.{' '}
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hm-inline-link"
                >
                  kaycorken.com
                </a>
              </p>
              <ul className="hm-agent-points">
                <li>Experience Does Make a Difference!</li>
                <li>Residential · Commercial · Probate · Land</li>
                <li>Parker, Colorado · Serving all of Colorado &amp; beyond</li>
              </ul>
              <div className="hm-agent-actions">
                <a href={TEL} className="hm-btn hm-btn-primary">
                  <Phone size={16} strokeWidth={1.75} />
                  {PHONE}
                </a>
                <a href={MAILTO} className="hm-btn hm-btn-ghost">
                  <Mail size={16} strokeWidth={1.75} />
                  Email Kay
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
            <p className="hm-eyebrow">How Kay helps</p>
            <h2 className="hm-heading">Full-service Colorado real estate.</h2>
            <p className="hm-body hm-body-narrow">
              Dedicated, honest, and professional — residential and commercial
              expertise rooted in integrity since 1993.
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
          <p className="hm-contact-kicker">Call or email anytime</p>
          <h2 className="hm-contact-title">Ready when you are.</h2>

          <div className="hm-contact-card">
            <div className="hm-contact-card-top">
              <img src={AGENT_AVATAR} alt="" className="hm-contact-avatar" />
              <div>
                <p className="hm-contact-name">Kay Corken</p>
                <p className="hm-contact-brand">
                  Broker, Owner ({LICENSE}) · {BROKER}
                </p>
              </div>
            </div>
            <p className="hm-contact-address">
              {ADDRESS}
              <br />
              Experience Does Make a Difference!
            </p>
            <a href={TEL} className="hm-contact-phone">
              {PHONE}
            </a>
            <a href={MAILTO} className="hm-contact-phone" style={{ fontSize: '1rem' }}>
              {EMAIL}
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
          <span className="hm-footer-brand">Kay Corken</span>
          <p>
            Real estate services provided by licensed professionals. Demo site
            for presentation purposes.
          </p>
          <span>© {new Date().getFullYear()} {BROKER}</span>
        </div>
      </footer>
    </div>
  );
}
