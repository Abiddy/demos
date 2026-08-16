'use client';

import { useRef, useState, type CSSProperties, type FormEvent } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const PHONE = '(714) 514-0005';
const TEL = 'tel:7145140005';
const ADDRESS = '25 Mauchly, Suite 321, Irvine, CA 92618';
const INSTAGRAM = 'https://www.instagram.com/katiebattorney/';
const REAL_ESTATE_IG = 'https://www.instagram.com/katiebsellscali/';
const BESTIE_IG = 'https://www.instagram.com/katieb_yourrealbestie/';
const INK = '#E1E0CC';
const CREAM = '#DEDBC8';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADSHOT = '/katie/katie-headshot.png';
const PORTRAIT = '/katie/katie-portrait.png';
const STUDIO = '/katie/katie-studio.png';
const HERO_PHOTO = '/katie/katie-hero.png';
const COVER = '/katie/katie-cover.png';

const NAV = [
  { label: 'Our story', href: '#about' },
  { label: 'Practice', href: '#practice' },
  { label: 'How it works', href: '#steps' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Inquiries', href: '#contact' },
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

const ABOUT_COPY =
  'Over the last sixteen years, I have practiced as a California attorney and realtor from Irvine. At Bayliss Law, families and investors get contract review, negotiation, and the transaction in one conversation — without assembling a second team.';

const TRIO = [
  {
    title: 'Based in OC',
    body: 'Irvine office. Clients across Orange County — Newport, Costa Mesa, Tustin, and surrounding cities.',
  },
  {
    title: 'Tuned for the closing',
    body: 'Attorney and realtor in the same engagement, so the deal and the documents do not live in two inboxes.',
  },
  {
    title: 'One person at the table',
    body: 'You are not translating between a listing agent and outside counsel. Katie already knows the file.',
  },
] as const;

const PRACTICES = [
  {
    title: 'Real Estate',
    body: 'Buy, sell, and negotiate residential or commercial property with contract review in the same conversation — no second hire.',
  },
  {
    title: 'Probate & Trust',
    body: 'Guided estate and probate sales for families who need a clean close, clear title, and someone who can speak both real estate and the court.',
  },
  {
    title: 'Business',
    body: 'Entity work, contracts, and commercial deals for operators who want counsel that also understands the property underneath the business.',
  },
  {
    title: 'Injury',
    body: 'Personal injury representation with the same direct communication clients get on a closing — clear next steps, no runaround.',
  },
  {
    title: 'Criminal',
    body: 'Criminal defense that treats you like a person, not a file number. Straightforward advice from the first call.',
  },
] as const;

const FEATURE_CARDS = [
  {
    num: '01',
    title: 'Real Estate Closings.',
    items: [
      'Purchase agreements reviewed in-house',
      'Negotiation without a second hire',
      'Listing through signatures',
      'Contract language in plain English',
    ],
  },
  {
    num: '02',
    title: 'Probate & Trust.',
    items: [
      'Estate and probate sales for families',
      'Clear title through the court process',
      'Counsel who speaks both markets and the file',
    ],
  },
  {
    num: '03',
    title: 'Direct Counsel.',
    items: [
      'Business, injury, and criminal matters',
      'A 25-minute first conversation',
      'Orange County based — Irvine office',
    ],
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

const MATTERS = [
  'Real Estate',
  'Probate / Trust',
  'Business',
  'Injury',
  'Criminal',
] as const;

function WordsPullUp({
  text,
  className,
  showAsterisk,
  style,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <h1 ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block ${
            showAsterisk && i === words.length - 1 ? 'overflow-visible pr-[0.35em]' : 'overflow-hidden'
          }`}
        >
          <motion.span
            className="relative inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
          >
            {word}
            {showAsterisk && i === words.length - 1 ? (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                *
              </span>
            ) : null}
            {i < words.length - 1 ? '\u00a0' : null}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className,
  style,
}: {
  segments: { text: string; className?: string }[];
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true });
  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className }))
  );

  return (
    <h2
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className ?? ''}`}
      style={style}
    >
      {words.map((item, i) => (
        <span key={`${item.word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${item.className ?? ''}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
          >
            {item.word}
            {i < words.length - 1 ? '\u00a0' : null}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

function AnimatedLetter({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  );
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function AboutBody({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const chars = Array.from(text);

  return (
    <p
      ref={ref}
      className="mx-auto mt-10 max-w-2xl text-xs sm:text-sm md:text-base"
      style={{ color: CREAM }}
    >
      {chars.map((char, i) => (
        <AnimatedLetter
          key={`${char}-${i}`}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        >
          {char}
        </AnimatedLetter>
      ))}
    </p>
  );
}

function CreamButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center gap-2 rounded-full py-1.5 pr-1.5 pl-5 transition-all hover:gap-3"
      style={{ backgroundColor: CREAM }}
    >
      <span className="text-sm font-medium text-black sm:text-base">
        {children}
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
        <ArrowRight size={16} style={{ color: CREAM }} />
      </span>
    </a>
  );
}

export function KatieLanding() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const [faqIndex, setFaqIndex] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="kb-page bg-black">
      <section className="h-screen bg-black p-4 md:p-6" id="top">
        <div className="relative h-full overflow-hidden rounded-2xl bg-black md:rounded-[2rem]">
          <img
            src={COVER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
          <nav className="absolute top-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[10px] font-medium sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="absolute right-0 bottom-0 left-0 z-10 p-4 md:p-8">
            <p className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className="text-2xl font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ color: CREAM }}
              >
                Attorney & realtor
              </span>
              <span
                className="text-[10px] font-medium tracking-[0.18em] uppercase sm:text-xs"
                style={{ color: CREAM }}
              >
                Irvine
              </span>
            </p>
            <WordsPullUp
              text="Bayliss"
              showAsterisk
              className="block w-full pr-[0.4em] text-[18vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] xl:text-[13vw]"
              style={{ color: INK }}
            />
            <div className="mt-4 max-w-xl lg:ml-auto">
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl"
                style={{ color: 'rgba(222, 219, 200, 0.88)', lineHeight: 1.35 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              >
                Stop hiring a realtor and a lawyer for the same closing. Katie
                Bayliss, Esq. is a California attorney and realtor — real
                estate, probate, trust, business, injury, and criminal matters
                in Orange County.
              </motion.p>
              <motion.div
                className="mt-5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
              >
                <CreamButton href="#contact">Book a consult</CreamButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 py-4" aria-label="Practice areas">
        <div className="kb-marquee">
          {[...TRUST_MARKS, ...TRUST_MARKS].map((mark, i) => (
            <span
              key={`${mark}-${i}`}
              className="px-8 text-sm font-medium tracking-[0.14em] uppercase"
              style={{ color: CREAM }}
            >
              {mark} ·
            </span>
          ))}
        </div>
      </div>

      <section className="bg-black px-4 py-10 md:px-6" aria-label="About Katie">
        <article className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#101010] md:grid-cols-2">
          <div className="flex flex-col justify-between p-8 md:p-12">
            <p className="text-xs font-medium tracking-[0.16em] uppercase" style={{ color: CREAM }}>
              Bayliss
            </p>
            <blockquote
              className="kb-serif mt-10 text-3xl leading-[1.05] italic md:text-4xl lg:text-5xl"
              style={{ color: INK }}
            >
              The deal and the documents run through one person — so you are not
              only faster, you actually close with counsel at the table.
            </blockquote>
            <p className="mt-8 text-sm text-gray-400">
              Katie Bayliss, Esq. · Bayliss Law · California Bar since 2010
            </p>
          </div>
          <div className="min-h-[320px] md:min-h-[520px]">
            <img
              src={STUDIO}
              alt="Katie Bayliss"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </article>
      </section>

      <section id="about" className="bg-black px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#101010] px-6 py-16 text-center sm:px-10 md:py-24">
          <p className="mb-6 text-[10px] font-medium sm:text-xs" style={{ color: CREAM }}>
            Law & real estate
          </p>
          <WordsPullUpMultiStyle
            className="mx-auto max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ color: INK }}
            segments={[
              { text: 'I am Katie Bayliss,', className: 'font-normal' },
              {
                text: 'a California attorney and realtor.',
                className: 'kb-serif italic',
              },
              {
                text: 'I have skills in closings, probate, and counsel that stays through signature.',
                className: 'font-normal',
              },
            ]}
          />
          <AboutBody text={ABOUT_COPY} />
        </div>
      </section>

      <section className="bg-black px-4 pb-10 md:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 md:grid-cols-3">
          {TRIO.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] bg-[#212121] p-6 md:p-8"
            >
              <h3 className="text-xl font-medium md:text-2xl" style={{ color: INK }}>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-5 text-gray-400">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="practice"
        className="relative overflow-hidden bg-black px-4 py-16 md:px-6 md:py-24"
      >
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 text-center md:mb-14">
            <WordsPullUpMultiStyle
              className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ color: INK }}
              segments={[
                {
                  text: 'Counsel for Orange County closings.',
                  className: 'font-normal',
                },
              ]}
            />
            <div className="mt-2">
              <WordsPullUpMultiStyle
                className="text-xl font-normal text-gray-500 sm:text-2xl md:text-3xl lg:text-4xl"
                segments={[
                  {
                    text: 'Built for the same table. Powered by both licenses.',
                    className: 'font-normal text-gray-500',
                  },
                ]}
              />
            </div>
          </div>

          <div
            ref={featuresRef}
            className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:h-[480px]"
          >
            <motion.article
              className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-0"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={featuresInView ? { scale: 1, opacity: 1 } : undefined}
              transition={{ delay: 0, duration: 0.7, ease: CARD_EASE }}
            >
              <img
                src={PORTRAIT}
                alt="Katie Bayliss"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <p
                className="absolute bottom-5 left-5 text-lg font-medium md:text-xl"
                style={{ color: INK }}
              >
                One person at the table.
              </p>
            </motion.article>

            {FEATURE_CARDS.map((card, i) => (
              <motion.article
                key={card.num}
                className="flex min-h-[280px] flex-col justify-between rounded-2xl bg-[#212121] p-5 lg:min-h-0"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={featuresInView ? { scale: 1, opacity: 1 } : undefined}
                transition={{
                  delay: (i + 1) * 0.15,
                  duration: 0.7,
                  ease: CARD_EASE,
                }}
              >
                <div>
                  <h3
                    className="text-xl font-medium leading-tight md:text-2xl"
                    style={{ color: INK }}
                  >
                    {card.title}{' '}
                    <span className="text-gray-500">{card.num}</span>
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-400"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0"
                          style={{ color: CREAM }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm"
                  style={{ color: CREAM }}
                >
                  Learn more
                  <ArrowRight size={14} className="-rotate-45" />
                </a>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-5">
            {PRACTICES.map((practice) => (
              <article
                key={practice.title}
                className="rounded-2xl bg-[#101010] p-5"
              >
                <h3 className="text-base font-medium" style={{ color: INK }}>
                  {practice.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  {practice.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="steps" className="bg-black px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium tracking-[0.16em] uppercase" style={{ color: CREAM }}>
            What to expect
          </p>
          <h2 className="mt-3 text-3xl font-medium md:text-5xl" style={{ color: INK }}>
            Three steps. One counsel.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-2 md:grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.num} className="rounded-[1.5rem] bg-[#212121] p-6 md:p-8">
                <p className="text-xs text-gray-500">{step.num}</p>
                <h3 className="mt-4 text-xl font-medium md:text-2xl" style={{ color: INK }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-5 text-gray-400">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 pb-10 md:px-6">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#101010] md:grid-cols-2">
          <div className="min-h-[360px]">
            <img
              src={HERO_PHOTO}
              alt="Katie Bayliss outdoors"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-between p-8 md:p-12">
            <p className="text-xs font-medium tracking-[0.16em] uppercase" style={{ color: CREAM }}>
              Orange County
            </p>
            <blockquote
              className="kb-serif mt-8 text-3xl leading-[1.05] italic md:text-4xl"
              style={{ color: INK }}
            >
              “Katie probably saved us a second retainer. Maybe more.”
            </blockquote>
            <p className="mt-8 text-sm text-gray-400">Irvine family · Probate sale</p>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 md:grid-cols-3">
          {QUOTES.map((quote) => (
            <article key={quote.name} className="rounded-[1.5rem] bg-[#212121] p-6 md:p-8">
              <div className="mb-5 h-10 w-10 overflow-hidden rounded-full">
                <img src={HEADSHOT} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="text-sm leading-6" style={{ color: INK }}>
                “{quote.text}”
              </p>
              <p className="mt-6 text-xs font-medium" style={{ color: CREAM }}>
                {quote.name}
              </p>
              <p className="text-xs text-gray-500">{quote.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-black px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-medium md:text-5xl" style={{ color: INK }}>
            Questions
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((item, i) => {
              const open = faqIndex === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  className="w-full py-5 text-left"
                  onClick={() => setFaqIndex(open ? null : i)}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-base font-medium md:text-lg" style={{ color: INK }}>
                      {item.q}
                    </span>
                    <span className="text-gray-500">{open ? '–' : '+'}</span>
                  </span>
                  {open ? (
                    <span className="mt-3 block text-sm leading-6 text-gray-400">
                      {item.a}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black px-4 pb-20 md:px-6">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#101010] md:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="text-xs font-medium tracking-[0.16em] uppercase" style={{ color: CREAM }}>
              New clients welcome
            </p>
            <h2 className="mt-4 text-3xl font-medium md:text-5xl" style={{ color: INK }}>
              Book a consultation
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Call {PHONE} or send a note. Katie will follow up from Bayliss Law
              in Irvine.
            </p>
            <p className="mt-6 text-sm" style={{ color: CREAM }}>
              {ADDRESS}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                @katiebattorney
              </a>
              <a href={REAL_ESTATE_IG} target="_blank" rel="noreferrer">
                @katiebsellscali
              </a>
              <a href={BESTIE_IG} target="_blank" rel="noreferrer">
                @katieb_yourrealbestie
              </a>
            </div>
          </div>
          <div className="p-8 md:p-12">
            {sent ? (
              <p className="text-2xl font-medium" style={{ color: INK }}>
                We’ll call you back.
              </p>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <input className="kb-input" name="name" required placeholder="Full name" />
                <input
                  className="kb-input"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                />
                <input className="kb-input" name="phone" type="tel" placeholder="Phone" />
                <select className="kb-input" name="matter" defaultValue={MATTERS[0]}>
                  {MATTERS.map((matter) => (
                    <option key={matter}>{matter}</option>
                  ))}
                </select>
                <textarea
                  className="kb-input min-h-[120px] rounded-3xl"
                  name="notes"
                  placeholder="What’s going on?"
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-medium text-black"
                  style={{ backgroundColor: CREAM }}
                >
                  Send inquiry
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
