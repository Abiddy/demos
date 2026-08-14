'use client';

import { useRef, useState } from 'react';
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';

const PHONE = '(530) 429-2410';
const TEL = 'tel:5304292410';
const EMAIL = 'mailto:info@goebikes.net';
const ADDRESS = '18831 Hawthorne Blvd, Torrance, CA 90504';
const SITE = 'https://goebikes.net/';
const MAPS =
  'https://maps.google.com/?q=18831+Hawthorne+Blvd,+Torrance,+CA+90504';

const HERO = '/ebikes/hero.png?v=2';
const HERO_VIDEO = '/ebikes/hero.mov';
const RIDE_A =
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80';
const RIDE_B =
  'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80';
const CAT_HUB =
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80';
const CAT_MID =
  'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&w=1000&q=80';
const CAT_RENT =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80';
const CAT_SKATE =
  'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1000&q=80';
const CAT_FOLD =
  'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&w=1000&q=80';
const CAT_PARTS =
  'https://images.unsplash.com/photo-1511994298241-608e28f6c35e?auto=format&fit=crop&w=1000&q=80';
const FOLD_A =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80';
const FOLD_B =
  'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&w=900&q=80';
const FOLD_C =
  'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&w=900&q=80';

const NAV = [
  { label: 'Electric Bikes', href: '#bikes' },
  { label: 'Mid Drive', href: '#bikes' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Skateboards', href: '#boards' },
  { label: 'Visit', href: '#visit' },
] as const;

const CATS = [
  { title: 'Shop Hub Motor', image: CAT_HUB, href: '#bikes' },
  { title: 'Shop Mid Drive', image: CAT_MID, href: '#bikes' },
  { title: 'Shop Rentals', image: CAT_RENT, href: '#rentals' },
  { title: 'Shop Skateboards', image: CAT_SKATE, href: '#boards' },
  { title: 'Shop Folding', image: CAT_FOLD, href: '#bikes' },
  { title: 'Shop Parts', image: CAT_PARTS, href: SITE },
] as const;

const PRODUCTS = [
  {
    name: 'Troxus Trax Lightweight',
    detail: 'Hub-drive commuter · up to 55 miles',
    price: '$1,599',
    image: CAT_HUB,
  },
  {
    name: 'TROXUS T-REX 27.5"',
    detail: 'Bafang mid-drive e-MTB · 1000W',
    price: '$3,999',
    image: CAT_MID,
  },
  {
    name: 'Fold XS 750 Watts',
    detail: 'Compact fold · 750W · 40–60 miles',
    price: '$2,999',
    image: FOLD_B,
  },
] as const;

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    scroll: 0,
    moved: false,
  });

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      scroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = ref.current;
    if (!el) return;
    const dx = event.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    el.scrollLeft = drag.current.scroll - dx;
  };

  const onPointerUp = () => {
    drag.current.active = false;
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  };

  return { ref, onPointerDown, onPointerMove, onPointerUp, onClickCapture };
}

export function GoEbikesLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const cats = useDragScroll();

  return (
    <div className="goe-page">
      <header className="goe-header">
        <div className="goe-shell goe-header-inner">
          <button
            type="button"
            className="goe-icon-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.6} />
            ) : (
              <Menu size={22} strokeWidth={1.6} />
            )}
          </button>

          <a href="#top" className="goe-logo" aria-label="Go Ebikes">
            <span className="goe-logo-mark">
              GO <em>EBIKES</em>
            </span>
            <span className="goe-logo-sub">Torrance · Est. 2020</span>
          </a>

          <div className="goe-header-actions">
            <a
              className="goe-icon-btn"
              href={`${SITE}search`}
              aria-label="Search"
              target="_blank"
              rel="noreferrer"
            >
              <Search size={20} strokeWidth={1.6} />
            </a>
            <a className="goe-icon-btn" href={EMAIL} aria-label="Account">
              <User size={20} strokeWidth={1.6} />
            </a>
            <a
              className="goe-icon-btn"
              href={`${SITE}cart`}
              aria-label="Cart"
              target="_blank"
              rel="noreferrer"
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
            </a>
          </div>
        </div>
        {menuOpen ? (
          <nav className="goe-shell goe-mobile-menu" aria-label="Primary">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={TEL} onClick={() => setMenuOpen(false)}>
              Call {PHONE}
            </a>
          </nav>
        ) : null}
      </header>

      <section className="goe-hero" id="top">
        <video
          className="goe-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO}
        >
          <source src={HERO_VIDEO} />
        </video>
        <div className="goe-hero-scrim" />
        <div className="goe-hero-copy">
          <p className="goe-kicker">South Bay electric since 2020</p>
          <h1 className="goe-display">Troxus Trax</h1>
          <a className="goe-btn" href="#bikes">
            Shop
          </a>
        </div>
        <hr className="goe-hero-dash" />
      </section>

      <section className="goe-pair" id="rentals">
        <div className="goe-pair-grid">
          <img src={RIDE_A} alt="City electric bike on a coastal path" />
          <img src={RIDE_B} alt="Rider on an electric bike" />
        </div>
        <div className="goe-pair-copy">
          <p className="goe-kicker">
            Torrance · Redondo · Hermosa · Manhattan
          </p>
          <h2 className="goe-display">Beach city rentals</h2>
          <p>
            3-hour, all-day, and 5-day e-bike rentals for the South Bay strand.
          </p>
          <a className="goe-btn" href={SITE} target="_blank" rel="noreferrer">
            Shop rentals
          </a>
        </div>
      </section>

      <section className="goe-cats">
        <div className="goe-shell goe-cats-head">
          <div>
            <h2 className="goe-display">Pick your ride</h2>
            <p>Hub motors, mid-drives, and beach rentals — from the Torrance shop.</p>
          </div>
          <span className="goe-cats-star" aria-hidden>
            ✱
          </span>
        </div>
        <div
          className="goe-cat-track"
          ref={cats.ref}
          onPointerDown={cats.onPointerDown}
          onPointerMove={cats.onPointerMove}
          onPointerUp={cats.onPointerUp}
          onPointerCancel={cats.onPointerUp}
          onClickCapture={cats.onClickCapture}
        >
          {CATS.map((cat) => (
            <article key={cat.title} className="goe-cat">
              <img src={cat.image} alt="" draggable={false} />
              <div className="goe-cat-scrim" />
              <a className="goe-btn" href={cat.href}>
                {cat.title}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="goe-break" id="boards">
        <div className="goe-break-art" aria-hidden="true">
          <img src={FOLD_A} alt="" />
          <img src={FOLD_B} alt="" />
          <img src={FOLD_C} alt="" />
        </div>
        <div className="goe-break-copy">
          <p className="goe-kicker">Compact power for the city</p>
          <h2 className="goe-display">The Fold XS</h2>
          <a className="goe-btn" href={SITE} target="_blank" rel="noreferrer">
            Shop
          </a>
        </div>
      </section>

      <section className="goe-products goe-shell" id="bikes">
        <div className="goe-product-grid">
          {PRODUCTS.map((product) => (
            <article key={product.name} className="goe-product">
              <div className="goe-product-shot">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>{product.detail}</p>
              <span>{product.price}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="goe-shell goe-perks" id="visit">
        <article className="goe-perk">
          <h3>Free assembly</h3>
          <p>
            Every bike we sell is assembled in-shop — worry-free and ready to
            ride when you pick it up.
          </p>
        </article>
        <article className="goe-perk">
          <h3>LA &amp; OC delivery</h3>
          <p>
            Fast local delivery across Los Angeles and Orange County — $60 and
            $100.
          </p>
        </article>
        <article className="goe-perk">
          <h3>Extended warranty</h3>
          <p>
            We stand behind what we sell. Ask the shop about extending the
            manufacturer warranty on any e-bike.
          </p>
        </article>
      </section>

      <footer className="goe-footer">
        <div className="goe-shell">
          <div className="goe-news">
            <h2>News, offers, and product updates</h2>
            <p>The latest from Go Ebikes, straight to your inbox.</p>
            {joined ? (
              <p>You’re on the list.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setJoined(true);
                }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  required
                  aria-label="Email"
                />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight size={18} strokeWidth={2} />
                </button>
              </form>
            )}
          </div>

          <div className="goe-footer-grid">
            <div>
              <h3>Help</h3>
              <ul>
                <li>
                  <a href={TEL}>{PHONE}</a>
                </li>
                <li>
                  <a href={EMAIL}>info@goebikes.net</a>
                </li>
                <li>
                  <a href={MAPS} target="_blank" rel="noreferrer">
                    {ADDRESS}
                  </a>
                </li>
                <li>Wed–Sun 10am–5pm</li>
                <li>Call / text 7 days a week</li>
                <li>
                  <a href="#bikes">Electric bikes</a>
                </li>
                <li>
                  <a href="#rentals">E-bike rentals</a>
                </li>
                <li>
                  <a href="#boards">Skateboards</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>About Go Ebikes</h3>
              <p>
                Opened in 2020 from a Torrance warehouse. Simple, reliable
                electric bikes for men, women, and kids — plus beach-city
                rentals just north of 190th. We stand behind what we sell with a
                1–2 year warranty.
              </p>
            </div>
          </div>

          <div className="goe-legal">
            <span>© {new Date().getFullYear()} Go Ebikes</span>
            <div className="goe-pays" aria-label="Payment methods">
              {[
                'Visa',
                'MC',
                'Amex',
                'PayPal',
                'Apple',
                'GPay',
                'Shop',
                'Disc',
              ].map((pay) => (
                <span key={pay} className="goe-pay">
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
