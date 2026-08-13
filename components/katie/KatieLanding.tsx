'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  FileText,
  Landmark,
  Scale,
  Shield,
  X,
} from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/katiebattorney/';
const REAL_ESTATE_IG = 'https://www.instagram.com/katiebsellscali/';
const PHONE = '(714) 514-0005';
const PHONE_HREF = 'tel:7145140005';
const ADDRESS = '25 Mauchly, Suite 321, Irvine, CA 92618';

const HEADSHOT = '/katie/katie-headshot.png';
const PORTRAIT = '/katie/katie-portrait.png';
const STUDIO = '/katie/katie-studio.png';

const NAV_LINKS = [
  { label: 'Practice', href: '#practice' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

const TRUST_MARKS = [
  'Real Estate',
  'Probate',
  'Trust',
  'Business',
  'Injury',
  'Criminal',
  'Orange County',
  'California Bar',
] as const;

const MATTERS = [
  'Real Estate',
  'Probate / Trust',
  'Business',
  'Injury',
  'Criminal',
] as const;

const PRACTICES = [
  {
    title: 'Real Estate',
    body: 'Buy, sell, and negotiate residential or commercial property with contract review in the same conversation — no second hire.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
    badge: 'Purchase agreement',
    count: 'In-house review',
  },
  {
    title: 'Probate & Trust',
    body: 'Guided estate and probate sales for families who need a clean close, clear title, and someone who can speak both real estate and the court.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    badge: 'Estate administration',
    count: 'Family-first close',
  },
  {
    title: 'Business',
    body: 'Entity work, contracts, and commercial deals for operators who want counsel that also understands the property underneath the business.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    badge: 'Operating agreements',
    count: 'Deal + documents',
  },
  {
    title: 'Injury',
    body: 'Personal injury representation with the same direct communication clients get on a closing — clear next steps, no runaround.',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=85',
    badge: 'Client advocacy',
    count: 'Direct counsel',
  },
  {
    title: 'Criminal',
    body: 'Criminal defense that treats you like a person, not a file number. Straightforward advice from the first call.',
    image:
      'https://images.unsplash.com/photo-1589829545858-2a211024817a?auto=format&fit=crop&w=1400&q=85',
    badge: 'Defense strategy',
    count: 'First conversation',
  },
] as const;

const STEPS = [
  {
    num: '01',
    title: 'A 25-minute conversation',
    body: 'Tell Katie about the property, the estate, or the matter. You leave with a path — not a pitch.',
  },
  {
    num: '02',
    title: 'A plan that covers both sides',
    body: 'Contracts, negotiations, and the real-estate process sit in one place, so you are not translating between a realtor and a lawyer.',
  },
  {
    num: '03',
    title: 'Representation through close',
    body: 'From listing or intake to signatures, you have counsel who already knows the file.',
  },
] as const;

const QUOTES = [
  {
    text: 'Katie is an attorney and was able to provide legal support every step of the way. Communication is consistently clear, thorough, and timely.',
    name: 'Orange County investor',
    role: 'Multiple closings',
  },
  {
    text: 'We thought we needed a realtor and a separate lawyer. Katie handled the sale and the documents. One person. Far less stress.',
    name: 'Irvine family',
    role: 'Probate sale',
  },
  {
    text: 'She explained the contract in plain language and negotiated terms we would have missed. That is the difference.',
    name: 'First-time seller',
    role: 'Newport Beach',
  },
] as const;

const FAQS = [
  {
    q: 'Do I still need a separate realtor if I hire you?',
    a: 'Usually no. Katie is a California attorney and a real estate broker, so contract review, negotiation, and the transaction can live in one engagement. Complex matters are scoped on the first call.',
  },
  {
    q: 'What parts of Orange County do you serve?',
    a: 'Bayliss Law is based in Irvine and works with clients across Orange County — including Irvine, Newport Beach, Costa Mesa, Tustin, and surrounding communities.',
  },
  {
    q: 'Can you help with a probate or trust sale?',
    a: 'Yes. Probate and trust work is a core part of the practice. Katie helps families move property through the court process and the market without assembling a second team.',
  },
  {
    q: 'What does the first consultation look like?',
    a: 'A focused conversation about your situation — the property, the deadline, or the legal issue. You get a recommended next step. There is no obligation to proceed.',
  },
  {
    q: 'Do you speak Vietnamese?',
    a: 'Yes. Katie works with Vietnamese-speaking clients and families across Orange County.',
  },
] as const;

type FormState = {
  name: string;
  email: string;
  matter: string;
};

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  matter: MATTERS[0],
};

export function KatieLanding() {
  const [navDark, setNavDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState<number | null>(0);
  const [closeForm, setCloseForm] = useState<FormState>(EMPTY_FORM);
  const [closeSent, setCloseSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const light = document.getElementById('kb-light');
      if (!light) return;
      setNavDark(window.scrollY > light.offsetHeight - 72);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activePractice = PRACTICES[practiceIndex];

  return (
    <div className="kb-page">
      <header className={`kb-nav${navDark ? ' is-dark' : ''}`}>
        <div className="kb-shell kb-nav-inner">
          <a href="#top" className="kb-logo" aria-label="Bayliss Law">
            <span className="kb-logo-mark" aria-hidden />
            <span className="kb-logo-word">Bayliss</span>
          </a>

          <nav className="kb-nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="kb-nav-end">
            <a className="kb-nav-text" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <button
              type="button"
              className="kb-nav-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : (
                <span aria-hidden style={{ fontSize: 22, lineHeight: 1 }}>☰</span>
              )}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="kb-shell kb-mobile-menu">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <div id="kb-light" className="kb-light">
        <section className="kb-hero" id="top">
          <div className="kb-shell kb-hero-copy">
            <p className="kb-kicker">Katie Bayliss, Esq. · Orange County</p>
            <h1 className="kb-display kb-hero-title">
              Stop hiring a realtor and a lawyer for{' '}
              <em>the same closing.</em>
            </h1>
            <p className="kb-hero-sub">
              Attorney and realtor at Bayliss Law. Real estate, probate, trust,
              business, injury, and criminal matters — from Irvine, across
              Orange County.
            </p>
          </div>
        </section>

        <section className="kb-shell kb-story-wrap" aria-label="About Katie">
          <article className="kb-story">
            <div className="kb-story-copy">
              <p className="kb-story-brand">Bayliss</p>
              <blockquote className="kb-story-quote">
                The deal and the documents run through one person — so you are
                not only faster, you actually{' '}
                <strong>close with counsel at the table.</strong>
              </blockquote>
              <p className="kb-story-by">
                <strong>Katie Bayliss, Esq.</strong>
                Bayliss Law · Orange County
              </p>
            </div>
            <div className="kb-story-media">
              <img
                src={STUDIO}
                alt="Katie Bayliss, Esq., attorney and realtor"
              />
            </div>
          </article>
        </section>

        <section className="kb-trust" aria-label="Practice areas">
          <div className="kb-marquee" aria-hidden="true">
            <div className="kb-marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="kb-marquee-set">
                  {TRUST_MARKS.map((mark) => (
                    <span key={`${copy}-${mark}`} className="kb-trust-item">
                      {mark}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="kb-dark">
        <section className="kb-shell kb-split-intro" id="about">
          <p className="kb-kicker">
            Handle routine closings with speed — and keep counsel for the
            matters that actually need it.
          </p>
          <h2 className="kb-display kb-split-title">
            Reserve the extra legal budget for problems that are not a standard
            Orange County sale.
          </h2>
        </section>

        <section className="kb-shell kb-trio" aria-label="Why Bayliss">
          <article className="kb-trio-item">
            <div className="kb-trio-icon" aria-hidden>
              <svg viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill="#1FA971" />
                <path
                  d="M26 12.5c-6.1 0-11 4.7-11 10.9 0 8.2 11 16.1 11 16.1s11-7.9 11-16.1c0-6.2-4.9-10.9-11-10.9Z"
                  stroke="#fff"
                  strokeWidth="1.7"
                />
                <circle cx="26" cy="23.2" r="3.4" stroke="#fff" strokeWidth="1.7" />
              </svg>
            </div>
            <h3>Based in Orange County</h3>
            <p>
              Irvine office, closings from Newport to Tustin. California Bar,
              local files, no out-of-state runaround.
            </p>
          </article>

          <article className="kb-trio-item">
            <div className="kb-trio-icon" aria-hidden>
              <svg viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill="#F94D1E" />
                <circle cx="26" cy="26" r="11.5" stroke="#fff" strokeWidth="1.7" />
                <circle cx="26" cy="26" r="6.5" stroke="#fff" strokeWidth="1.7" />
                <circle cx="26" cy="26" r="2.2" fill="#fff" />
              </svg>
            </div>
            <h3>Tuned for the closing</h3>
            <p>
              Purchase agreements, probate sales, and business deals — read as a
              lawyer, priced as a broker.
            </p>
          </article>

          <article className="kb-trio-item">
            <div className="kb-trio-icon" aria-hidden>
              <svg viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill="#029CFF" />
                <rect
                  x="14"
                  y="16"
                  width="16"
                  height="16"
                  rx="2.5"
                  stroke="#fff"
                  strokeWidth="1.7"
                />
                <rect
                  x="22"
                  y="20"
                  width="16"
                  height="16"
                  rx="2.5"
                  stroke="#fff"
                  strokeWidth="1.7"
                />
                <path
                  d="M31 28.5h5.5M34.5 25.5 38 28.5l-3.5 3"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>One person at the table</h3>
            <p>
              Contract review happens in the same conversation as the listing.
              No copy-paste between a realtor and counsel.
            </p>
          </article>
        </section>

        <section className="kb-section kb-shell">
          <div className="kb-cyan">
            <div className="kb-ask" aria-hidden>
              <div className="kb-ask-bar">
                Purchase Agreement
                <span>Notes</span>
              </div>
              <div className="kb-ask-body">
                <div className="kb-ask-doc">
                  <p>
                    Buyer shall deposit earnest money within{' '}
                    <span className="kb-mark">three (3) business days</span> of
                    acceptance.
                  </p>
                  <p>
                    Inspection contingency expires on{' '}
                    <span className="kb-mark">Day 17</span>. Seller to deliver
                    TDS, SPQ, and NHD prior to close.
                  </p>
                  <p>
                    Close of escrow shall occur on or before{' '}
                    <span className="kb-mark">30 days</span> from acceptance.
                  </p>
                </div>
                <div className="kb-ask-side">
                  <div className="kb-ask-tabs">
                    <span className="kb-ask-tab is-on">Review</span>
                    <span className="kb-ask-tab">Notes</span>
                    <span className="kb-ask-tab">Dates</span>
                  </div>
                  <p className="kb-ask-note">
                    Earnest money in 3 days is tight for a wire. Ask for 5.
                  </p>
                  <p className="kb-ask-note">
                    Inspection: push to Day 21 before removing the contingency.
                  </p>
                  <div className="kb-ask-input">
                    <p>Ask about this clause…</p>
                    <div className="kb-ask-input-foot">
                      <span className="kb-ask-chip">Full document ▾</span>
                      <span className="kb-ask-send">
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="kb-cyan-copy">
              <h2>Counsel you can trust, on the contract.</h2>
              <a className="kb-cyan-link" href="#practice">
                More on real estate
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>
        </section>

        <section className="kb-shell kb-spotlight" aria-label="Client story">
          <p className="kb-key-row">
            Say goodbye to
            <span className="kb-key">Realtor</span>
            <span className="kb-key">Lawyer</span>
          </p>
          <blockquote className="kb-spotlight-quote">
            “Katie probably saved us a second retainer. Maybe more.”
          </blockquote>
          <div className="kb-person">
            <img
              className="kb-avatar"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80"
              alt=""
            />
            <p>
              <strong>James Hale</strong>
              <span>Investor, Orange County</span>
            </p>
          </div>
          <div>
            <a className="kb-btn kb-btn-white" href="#stories">
              Read a client story
            </a>
          </div>
        </section>

        <section className="kb-section kb-shell" id="practice">
          <div className="kb-practice">
            <div className="kb-acc-list">
              {PRACTICES.map((practice, index) => {
                const active = index === practiceIndex;
                return (
                  <button
                    key={practice.title}
                    type="button"
                    className={`kb-acc-item${active ? ' is-active' : ''}`}
                    onClick={() => setPracticeIndex(index)}
                    aria-expanded={active}
                  >
                    <h3>{practice.title}</h3>
                    <p>{practice.body}</p>
                  </button>
                );
              })}
            </div>
            <div className="kb-practice-stage">
              <img
                key={activePractice.title}
                src={activePractice.image}
                alt=""
              />
              <div className="kb-doc-pills">
                <span className="kb-pill kb-pill-light">{activePractice.badge}</span>
                <span className="kb-pill">{activePractice.count}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="kb-section kb-shell">
          <div className="kb-expect">
            <div>
              <h2 className="kb-display kb-split-title">
                What to expect in your first conversation.
              </h2>
              <a className="kb-btn kb-btn-coral" href="#contact" style={{ marginTop: 32 }}>
                Book a Consultation
              </a>
              <div className="kb-person" style={{ marginTop: 28 }}>
                <img className="kb-avatar" src={HEADSHOT} alt="" />
                <p>
                  <strong>Katie Bayliss, Esq.</strong>
                  <span>Attorney &amp; Realtor · Irvine</span>
                </p>
              </div>
            </div>
            <div className="kb-steps">
              {STEPS.map((step) => (
                <article key={step.num} className="kb-step">
                  <span className="kb-step-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kb-section kb-shell" id="stories" aria-label="Client remarks">
          <p className="kb-trust-caption" style={{ textAlign: 'left', marginBottom: 28 }}>
            Clients across Orange County
          </p>
          <div className="kb-quotes">
            {QUOTES.map((quote) => (
              <article key={quote.name} className="kb-quote-lite">
                <p>“{quote.text}”</p>
                <footer>
                  <strong>{quote.name}</strong>
                  {quote.role}
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="kb-section kb-shell">
          <div className="kb-pair">
            <article className="kb-stat-card">
              <h3>Admitted to the California Bar since 2010 — still on the first call.</h3>
              <p>
                Fifteen years of practice in real estate, probate, business,
                injury, and criminal law. Broker work through All In Realty.
                One person who can finish the sentence.
              </p>
            </article>
            <article className="kb-photo-card">
              <img src={PORTRAIT} alt="Katie Bayliss professional portrait" />
            </article>
          </div>
        </section>

        <section className="kb-section kb-shell">
          <div className="kb-feature-grid">
            <article className="kb-card">
              <div className="kb-icon-row">
                <span className="kb-icon-pill" aria-hidden>
                  <FileText size={18} strokeWidth={1.6} />
                </span>
                <span className="kb-icon-pill" aria-hidden>
                  <Landmark size={18} strokeWidth={1.6} />
                </span>
                <span className="kb-icon-pill" aria-hidden>
                  <Scale size={18} strokeWidth={1.6} />
                </span>
                <span className="kb-icon-pill" aria-hidden>
                  <Shield size={18} strokeWidth={1.6} />
                </span>
              </div>
              <h3>Works with the process you already know</h3>
              <p>
                Listings, escrow, title, and court filings stay in the systems
                your transaction already uses. Katie adds counsel without adding
                another platform to learn.
              </p>
            </article>

            <article className="kb-card">
              <div className="kb-preview-wrap" aria-hidden>
                <div className="kb-doc">
                  <p className="kb-doc-kicker">California Residential Purchase Agreement</p>
                  <p>
                    Buyer shall deposit earnest money within{' '}
                    <span className="kb-mark">three (3) business days</span> of
                    acceptance. Inspection contingency expires on{' '}
                    <span className="kb-mark">Day 17</span>.
                  </p>
                  <p>
                    Seller to provide disclosures including{' '}
                    <span className="kb-mark">TDS, SPQ, and NHD</span> prior to
                    close of escrow.
                  </p>
                  <div className="kb-doc-pills">
                    <span className="kb-pill kb-pill-light">Review contract</span>
                    <span className="kb-pill kb-pill-cyan">4 notes</span>
                  </div>
                </div>
              </div>
              <h3>Counsel trained on the transaction, not a template</h3>
              <p>
                Contract language, contingencies, and probate constraints get
                read in context — so you are not paying outside counsel to
                re-explain a deal Katie is already running.
              </p>
            </article>
          </div>
        </section>

        <section className="kb-section kb-shell" id="faq">
          <div className="kb-faq-head">
            <h2 className="kb-display">Frequently asked questions</h2>
          </div>
          <div className="kb-faq-list">
            {FAQS.map((faq, index) => {
              const open = faqIndex === index;
              return (
                <button
                  key={faq.q}
                  type="button"
                  className={`kb-faq-item${open ? ' is-open' : ''}`}
                  onClick={() => setFaqIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="kb-faq-q">
                    {faq.q}
                    <span className="kb-faq-plus" aria-hidden>
                      {open ? '−' : '+'}
                    </span>
                  </span>
                  <span className="kb-faq-a">{faq.a}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="kb-close kb-shell" id="contact">
          <div className="kb-close-card">
            <h2 className="kb-display">Book a consultation</h2>
            <p className="kb-close-sub">
              Families and investors across Orange County — one conversation
              with Katie.
            </p>
            {closeSent ? (
              <div className="kb-form-success">
                <h3>Received.</h3>
                <p>Katie will be in touch. Call {PHONE} if it is time-sensitive.</p>
              </div>
            ) : (
              <form
                className="kb-trial-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setCloseSent(true);
                }}
              >
                <div className="kb-field">
                  <label htmlFor="close-email">Email*</label>
                  <input
                    id="close-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="e.g. you@email.com"
                    value={closeForm.email}
                    onChange={(event) =>
                      setCloseForm((form) => ({
                        ...form,
                        email: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="kb-field">
                  <label htmlFor="close-matter">How can we help?*</label>
                  <select
                    id="close-matter"
                    name="matter"
                    value={closeForm.matter}
                    onChange={(event) =>
                      setCloseForm((form) => ({
                        ...form,
                        matter: event.target.value,
                      }))
                    }
                    required
                  >
                    {MATTERS.map((matter) => (
                      <option key={matter} value={matter}>
                        {matter}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="kb-field kb-span-2">
                  <label htmlFor="close-name">Name*</label>
                  <input
                    id="close-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={closeForm.name}
                    onChange={(event) =>
                      setCloseForm((form) => ({
                        ...form,
                        name: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="kb-span-2 kb-trial-actions">
                  <button type="submit" className="kb-btn kb-btn-solid">
                    Book a Consultation
                  </button>
                  <p className="kb-required">*Required</p>
                </div>
              </form>
            )}
          </div>
        </section>

        <footer className="kb-shell kb-footer">
          <span>© {new Date().getFullYear()} Bayliss Law</span>
          <div className="kb-footer-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              @katiebattorney
            </a>
            <a href={REAL_ESTATE_IG} target="_blank" rel="noreferrer">
              @katiebsellscali
            </a>
            <a href={PHONE_HREF}>{PHONE}</a>
            <span>{ADDRESS}</span>
            <a href="https://www.instagram.com/katieb_yourrealbestie/" target="_blank" rel="noreferrer">
              @katieb_yourrealbestie
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
