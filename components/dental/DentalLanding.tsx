'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

const PHONE = '(310) 371-0113';
const TEL = 'tel:3103710113';
const SITE = 'http://www.torranceallcaredental.com/';

const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

const SECTION3_IMG1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';

const SECTION3_IMG2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';

const SECTION3_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80';
const BOOK_IMAGE =
  'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=80';

const HOURS = [
  { day: 'Monday', time: '9:00 am – 6:00 pm' },
  { day: 'Tuesday', time: '10:00 am – 7:00 pm' },
  { day: 'Wednesday', time: '9:00 am – 6:00 pm' },
  { day: 'Thursday', time: '10:00 am – 7:00 pm' },
  { day: 'Friday', time: '9:00 am – 5:00 pm' },
  { day: 'Saturday', time: 'Closed' },
  { day: 'Sunday', time: 'Closed' },
];

const FAQS = [
  {
    q: 'Do you take new patients?',
    a: 'Yes. Call or book below and we’ll find a time that works for your first visit.',
  },
  {
    q: 'What if I have a dental emergency?',
    a: 'Call (310) 371-0113. We’ll do our best to see you the same day when we can.',
  },
  {
    q: 'Where is the office?',
    a: '19019 Hawthorne Blvd, Suite 100-B, Torrance, CA 90503 — just off Hawthorne.',
  },
];

const FORM_SERVICES = [
  'New patient exam',
  'Cleaning',
  'Cosmetic consultation',
  'Implants',
  'Emergency',
  'Other',
];

const featureBars = ['Advanced Dentistry', 'High Quality Equipment', 'Friendly Staff'];

const services = [
  { name: 'Dental\nVeneers', num: '01', active: true },
  { name: 'Dental\nCrowns', num: '02', active: false },
  { name: 'Teeth\nWhitening', num: '03', active: false },
  { name: 'Dental\nImplants', num: null, active: false },
];

const NAV_LINKS = ['Home', 'Services', 'About', 'Gallery', 'Contact'] as const;

const NAV_HREFS: Record<(typeof NAV_LINKS)[number], string> = {
  Home: '#home',
  Services: '#services',
  About: '#about',
  Gallery: '#gallery',
  Contact: '#book',
};

type MaskPos = { x: number; y: number; sw: number; sh: number };

function useMaskPositions(
  sectionRef: RefObject<HTMLElement | null>,
  cardsRef: RefObject<(HTMLDivElement | null)[]>
) {
  const [positions, setPositions] = useState<MaskPos[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const sRect = section.getBoundingClientRect();
      const cards = cardsRef.current ?? [];
      setPositions(
        cards.map((card) => {
          if (!card) return { x: 0, y: 0, sw: sRect.width, sh: sRect.height };
          const r = card.getBoundingClientRect();
          return {
            x: r.left - sRect.left,
            y: r.top - sRect.top,
            sw: sRect.width,
            sh: sRect.height,
          };
        })
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [sectionRef, cardsRef]);

  return positions;
}

function useImageWidth(src: string, sectionHeight: number) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!src || !sectionHeight) return;
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth * (sectionHeight / img.naturalHeight));
    };
    img.src = src;
  }, [src, sectionHeight]);

  return width;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return mobile;
}

function useStaggeredReveal(count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, count]);

  const getAnimStyle = (index: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  return { containerRef, getAnimStyle };
}

function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX,
  className,
  children,
  cardRef,
  style,
  id,
}: {
  bgImage: string;
  position?: MaskPos;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
  id?: string;
}) {
  const pos = position ?? { x: 0, y: 0, sw: 0, sh: 0 };
  const overflow = imageWidth > pos.sw ? imageWidth - pos.sw : 0;
  const focalOffset = overflow * focalX;

  return (
    <div
      id={id}
      ref={cardRef}
      className={className}
      style={{
        ...style,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: pos.sh ? `auto ${pos.sh}px` : 'cover',
        backgroundPosition: `-${pos.x + focalOffset}px -${pos.y}px`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <path
        d="M1 7h12m0 0L8 2m5 5L8 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.floor(elapsed / 20));
      setCount(next);
      if (next >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setExiting(true), 200);
        window.setTimeout(() => onComplete(), 900);
      }
    }, 20);
    return () => window.clearInterval(id);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-start bg-white transition-opacity duration-700 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="p-6 text-7xl font-bold leading-none tabular-nums text-black md:p-10 md:text-9xl">
        {count}
      </span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 px-4 py-2 backdrop-blur-md md:px-6 md:py-3">
        <a href="#home" className="flex flex-col text-black">
          <span className="text-xl font-extrabold uppercase leading-none tracking-tight md:text-2xl">
            All Care
          </span>
          <span className="-mt-1.5 text-xl font-extrabold uppercase leading-none tracking-tight md:-mt-2 md:text-2xl">
            Dental
          </span>
          <span className="mt-1.5 text-[8px] font-medium leading-none md:mt-2 md:text-[9px]">
            quality healthcare
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#gallery"
            className="rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Menu
          </a>
          <a href={TEL} className="text-sm font-semibold text-black">
            Dental Emergency · {PHONE}
          </a>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? 'translate-y-0 rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 rounded-full bg-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? 'translate-y-0 -rotate-45' : 'translate-y-2'
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={close}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex h-full flex-col justify-center gap-1 px-8">
            {NAV_LINKS.map((label, i) => (
              <a
                key={label}
                href={NAV_HREFS[label]}
                onClick={close}
                className={`text-4xl font-bold text-black transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-neutral-500 ${
                  open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${100 + i * 60}ms` }}
              >
                {label}
              </a>
            ))}
            <div
              className={`mt-8 border-t border-neutral-200 pt-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              <p className="mb-4 text-sm font-semibold text-black">
                Dental Emergency
              </p>
              <a
                href="#book"
                onClick={close}
                className="block w-full rounded-full bg-black px-6 py-4 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-neutral-800"
              >
                Book Appointment
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

function AppointmentForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-[280px] flex-col justify-between rounded-xl bg-zinc-900 p-5 md:min-h-[360px] md:rounded-2xl md:p-8">
        <p className="text-xs font-semibold text-white md:text-sm">Request received</p>
        <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.9] text-white">
          We’ll call
          <br />
          you back.
        </h3>
        <p className="max-w-md text-sm font-medium text-zinc-400">
          Thanks — All Care Dental will confirm your appointment at {PHONE}.
        </p>
      </div>
    );
  }

  return (
    <form
      className="h-full rounded-xl bg-zinc-100 p-5 md:rounded-2xl md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-black">Full name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black outline-none"
            placeholder="Jane Rivera"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-black">Phone</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black outline-none"
            placeholder="(310) 000-0000"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-black">Email</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black outline-none"
            placeholder="you@email.com"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-black">Preferred date</span>
          <input
            name="date"
            type="date"
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-xs font-semibold text-black">Reason for visit</span>
          <select
            name="service"
            defaultValue="New patient exam"
            className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black outline-none"
          >
            {FORM_SERVICES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-xs font-semibold text-black">Notes</span>
          <textarea
            name="notes"
            rows={4}
            className="resize-none rounded-xl bg-white px-4 py-3 text-sm font-medium text-black outline-none"
            placeholder="Anything we should know before your visit?"
          />
        </label>
      </div>
      <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-semibold text-black md:text-sm">
          Or call {PHONE} · 19019 Hawthorne Blvd, Suite 100-B
        </p>
        <button
          type="submit"
          className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 md:px-10 md:py-5 md:text-xl"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
}

export function DentalLanding() {
  const [showSplash, setShowSplash] = useState(true);
  const isMobile = useIsMobile();

  const section1Ref = useRef<HTMLElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);
  const s1Cards = useRef<(HTMLDivElement | null)[]>([]);
  const s2Cards = useRef<(HTMLDivElement | null)[]>([]);

  const s1Reveal = useStaggeredReveal(4);
  const s2Reveal = useStaggeredReveal(4);
  const s3Reveal = useStaggeredReveal(4);
  const s4Reveal = useStaggeredReveal(2);
  const s5Reveal = useStaggeredReveal(1);
  const s6Reveal = useStaggeredReveal(2);

  const s1Pos = useMaskPositions(section1Ref, s1Cards);
  const s2Pos = useMaskPositions(section2Ref, s2Cards);

  const s1ImgW = useImageWidth(HERO_IMAGE, s1Pos[0]?.sh ?? 0);
  const s2ImgW = useImageWidth(SECTION2_IMAGE, s2Pos[0]?.sh ?? 0);

  const s1Focal = isMobile ? 0.7 : 0.8;
  const s2Focal = isMobile ? 0.65 : 0.8;

  const setS1Card = (i: number) => (el: HTMLDivElement | null) => {
    s1Cards.current[i] = el;
  };
  const setS2Card = (i: number) => (el: HTMLDivElement | null) => {
    s2Cards.current[i] = el;
  };

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "'Open Sauce One', -apple-system, BlinkMacSystemFont, sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      <Navbar />

      <section
        id="home"
        ref={(el) => {
          section1Ref.current = el;
          s1Reveal.containerRef.current = el;
        }}
        className="flex h-screen w-full flex-col overflow-hidden gap-1.5 px-3 pb-1.5 pt-24 md:gap-2 md:px-5 md:pb-2 md:pt-24"
      >
        {featureBars.map((label, i) => (
          <MaskedCard
            key={label}
            bgImage={HERO_IMAGE}
            position={s1Pos[i]}
            imageWidth={s1ImgW}
            focalX={s1Focal}
            cardRef={setS1Card(i)}
            className="relative h-14 w-full shrink-0 overflow-hidden rounded-xl md:h-20 md:rounded-2xl"
            style={s1Reveal.getAnimStyle(i)}
          >
            <span className="relative z-10 flex h-full items-center justify-center text-center text-lg font-bold text-black md:text-3xl">
              {label}
            </span>
          </MaskedCard>
        ))}

        <MaskedCard
          bgImage={HERO_IMAGE}
          position={s1Pos[3]}
          imageWidth={s1ImgW}
          focalX={s1Focal}
          cardRef={setS1Card(3)}
          className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl md:rounded-2xl"
          style={s1Reveal.getAnimStyle(3)}
        >
          <p className="absolute top-4 left-4 z-10 max-w-[200px] text-xs font-semibold leading-4 text-black md:top-7 md:left-7 md:max-w-[300px] md:text-sm md:leading-5">
            We wish to provide professional dental services
            <br />
            that match the current technologies
          </p>
          <div className="absolute bottom-5 left-3 z-10 md:bottom-8 md:left-4">
            <span className="mb-1 block text-xs font-semibold text-black md:mb-2 md:text-sm">
              Trusted Dentist in Torrance, CA
            </span>
            <h1 className="text-[clamp(3rem,11vw,11rem)] font-bold leading-[0.79] tracking-tight text-black">
              All
              <br />
              Care
            </h1>
          </div>
          <a
            href="#book"
            className="absolute right-3 bottom-4 z-10 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-xs font-bold text-black transition-transform hover:scale-105 md:right-8 md:bottom-10 md:px-6 md:py-3 md:text-sm"
          >
            Free Consultation
          </a>
        </MaskedCard>
      </section>

      <section
        id="gallery"
        ref={(el) => {
          section2Ref.current = el;
          s2Reveal.containerRef.current = el;
        }}
        className="flex min-h-screen w-full flex-col gap-1.5 px-3 pt-1.5 pb-1.5 md:gap-2 md:px-5 md:pt-2 md:pb-2"
      >
        <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_auto_auto_auto] gap-1.5 md:grid-cols-2 md:grid-rows-[1fr_1fr_0.8fr] md:gap-2">
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Pos[0]}
            imageWidth={s2ImgW}
            focalX={s2Focal}
            cardRef={setS2Card(0)}
            className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
            style={s2Reveal.getAnimStyle(0)}
          >
            <h2 className="absolute top-4 left-5 z-10 text-2xl font-bold text-white md:top-6 md:left-7 md:text-3xl md:text-black">
              Smile Gallery
            </h2>
            <p className="absolute bottom-4 left-5 z-10 text-xs font-semibold text-white md:bottom-6 md:left-7 md:text-sm md:text-black">
              Our cosmetic dental work
            </p>
          </MaskedCard>

          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Pos[1]}
            imageWidth={s2ImgW}
            focalX={s2Focal}
            cardRef={setS2Card(1)}
            className="relative min-h-[200px] overflow-hidden rounded-xl md:row-span-2 md:min-h-0 md:rounded-2xl"
            style={s2Reveal.getAnimStyle(1)}
          >
            <p className="absolute bottom-16 left-5 z-10 text-xs font-semibold leading-4 text-white md:bottom-20 md:left-7 md:text-sm md:leading-5">
              If you want a gorgeous smile,
              <br />
              call us to ask about a smile makeover.
            </p>
            <a
              href={TEL}
              className="absolute right-4 bottom-4 z-10 rounded-full bg-white px-5 py-3 text-base font-bold text-black transition-transform hover:scale-105 md:right-6 md:bottom-6 md:px-8 md:py-5 md:text-xl"
            >
              Call Us
            </a>
          </MaskedCard>

          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Pos[2]}
            imageWidth={s2ImgW}
            focalX={s2Focal}
            cardRef={setS2Card(2)}
            className="relative min-h-[160px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
            style={s2Reveal.getAnimStyle(2)}
          >
            <h2 className="absolute top-4 left-5 z-10 text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] text-white md:top-6 md:left-7 md:text-black">
              Smile
              <br />
              makeover
            </h2>
          </MaskedCard>

          <MaskedCard
            id="services"
            bgImage={SECTION2_IMAGE}
            position={s2Pos[3]}
            imageWidth={s2ImgW}
            focalX={s2Focal}
            cardRef={setS2Card(3)}
            className="relative col-span-1 min-h-[200px] overflow-hidden rounded-xl md:col-span-2 md:min-h-0 md:rounded-2xl"
            style={s2Reveal.getAnimStyle(3)}
          >
            <div className="absolute inset-0 z-10 flex flex-wrap gap-1.5 p-2 md:flex-nowrap md:gap-2 md:p-3">
              {services.map((svc) => (
                <div
                  key={svc.name}
                  className={`flex min-w-[calc(50%-4px)] flex-1 flex-col justify-between rounded-xl p-3 md:min-w-0 md:rounded-2xl md:p-5 ${
                    svc.active
                      ? 'bg-white/90 backdrop-blur-md'
                      : 'bg-white/20 backdrop-blur-xl'
                  }`}
                >
                  <h3
                    className={`whitespace-pre-line text-xl font-bold leading-[1.05] md:text-4xl ${
                      svc.active ? 'text-black' : 'text-white'
                    }`}
                  >
                    {svc.name}
                  </h3>
                  {svc.num ? (
                    <span
                      className={`flex h-8 w-8 items-center justify-center self-end rounded-full border text-xs font-semibold md:h-12 md:w-12 md:text-sm ${
                        svc.active
                          ? 'border-black text-black'
                          : 'border-white text-white'
                      }`}
                    >
                      {svc.num}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </MaskedCard>
        </div>
      </section>

      <section
        id="implants"
        ref={(el) => {
          s3Reveal.containerRef.current = el;
        }}
        className="flex min-h-screen w-full flex-col gap-1.5 px-3 pt-1.5 pb-1.5 md:gap-2 md:px-5 md:pt-2 md:pb-2"
      >
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div
              className="flex min-h-[200px] shrink-0 flex-col justify-between rounded-xl bg-sky-300 p-5 md:rounded-2xl md:p-7"
              style={s3Reveal.getAnimStyle(0)}
            >
              <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] text-black">
                Implant
                <br />
                Dentistry
              </h2>
              <p className="text-xs font-semibold text-black md:text-sm">
                Restore Missing Teeth
              </p>
            </div>

            <div
              className="flex min-h-[140px] flex-1 gap-1.5 md:min-h-0 md:gap-2"
              style={s3Reveal.getAnimStyle(1)}
            >
              <div className="flex-1 overflow-hidden rounded-xl md:rounded-2xl">
                <img
                  src={SECTION3_IMG1}
                  alt="Dental implant procedure"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-xl md:rounded-2xl">
                <img
                  src={SECTION3_IMG2}
                  alt="Dental restoration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div
              className="flex shrink-0 flex-col justify-between gap-4 rounded-xl bg-zinc-900 p-5 sm:flex-row sm:items-end md:rounded-2xl md:p-7"
              style={s3Reveal.getAnimStyle(2)}
            >
              <div>
                <p className="mb-2 text-xs font-semibold text-white md:mb-3 md:text-sm">
                  Consultation
                </p>
                <h3 className="text-xl font-bold leading-6 text-white md:text-3xl md:leading-8">
                  Dental
                  <br />
                  Restoration
                  <br />
                  Services
                </h3>
              </div>
              <a
                href="#book"
                className="rounded-full bg-blue-600 px-5 py-3 text-base font-bold text-white transition-transform hover:scale-105 md:px-8 md:py-5 md:text-xl"
              >
                Book Online
              </a>
            </div>
          </div>

          <div
            className="relative min-h-[350px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
            style={s3Reveal.getAnimStyle(3)}
          >
            <img
              src={SECTION3_BG}
              alt="Smiling patient"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-3 bottom-3 left-3 flex gap-1.5 md:right-5 md:bottom-5 md:left-5 md:gap-2">
              <div className="flex min-h-[9rem] flex-1 flex-col justify-between rounded-xl bg-zinc-900 p-3 md:min-h-[13rem] md:rounded-2xl md:p-5">
                <h4 className="text-lg font-bold leading-5 text-white md:text-2xl md:leading-7">
                  The Process
                  <br />
                  of Installing
                  <br />
                  Implants
                </h4>
                <span className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-white text-white md:h-12 md:w-12">
                  <ArrowIcon className="rotate-[-45deg]" />
                </span>
              </div>
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[9rem] flex-1 flex-col justify-between rounded-xl bg-blue-600/85 p-3 backdrop-blur-xl md:min-h-[13rem] md:rounded-2xl md:p-5"
              >
                <h4 className="text-lg font-bold leading-5 text-white md:text-2xl md:leading-7">
                  Caring
                  <br />
                  for Dental
                  <br />
                  Implants
                </h4>
                <span className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-white text-white md:h-12 md:w-12">
                  <ArrowIcon className="rotate-[-45deg] text-white" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={(el) => {
          s4Reveal.containerRef.current = el;
        }}
        className="flex min-h-screen w-full flex-col gap-1.5 px-3 pt-1.5 pb-1.5 md:gap-2 md:px-5 md:pt-2 md:pb-2"
      >
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
          <div
            className="relative min-h-[320px] overflow-hidden rounded-xl md:min-h-0 md:rounded-2xl"
            style={s4Reveal.getAnimStyle(0)}
          >
            <img
              src={ABOUT_IMAGE}
              alt="All Care Dental treatment room"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div
              className="flex shrink-0 flex-col justify-between gap-6 rounded-xl bg-sky-300 p-5 md:rounded-2xl md:p-7"
              style={s4Reveal.getAnimStyle(1)}
            >
              <p className="text-xs font-semibold text-black md:text-sm">
                About the practice
              </p>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.9] text-black">
                Care for
                <br />
                every smile.
              </h2>
              <p className="max-w-md text-sm font-medium leading-5 text-neutral-800 md:text-base md:leading-6">
                Cosmetic, general, oral surgery, and periodontics in Torrance —
                exams, x-rays, fillings, root canals, and implants.
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
              <div className="rounded-xl bg-zinc-900 p-5 md:rounded-2xl md:p-6">
                <p className="mb-3 text-xs font-semibold text-white md:text-sm">Hours</p>
                <ul className="space-y-1">
                  {HOURS.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-baseline justify-between gap-3 text-xs font-semibold text-white md:text-sm"
                    >
                      <span>{row.day.slice(0, 3)}</span>
                      <span className="font-medium text-zinc-400">{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://maps.google.com/?q=19019+Hawthorne+Blvd+Suite+100-B+Torrance+CA+90503"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col justify-between rounded-xl bg-blue-600 p-5 md:rounded-2xl md:p-6"
              >
                <p className="text-xs font-semibold text-white md:text-sm">Visit us</p>
                <p className="text-lg font-bold leading-6 text-white md:text-2xl md:leading-7">
                  19019 Hawthorne Blvd
                  <br />
                  Suite 100-B
                  <br />
                  Torrance, CA 90503
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          s5Reveal.containerRef.current = el;
        }}
        className="flex w-full flex-col px-3 pt-1.5 pb-1.5 md:px-5 md:pt-2 md:pb-2"
      >
        <div
          className="relative min-h-[420px] overflow-hidden rounded-xl md:min-h-[480px] md:rounded-2xl"
          style={s5Reveal.getAnimStyle(0)}
        >
          <img
            src={SECTION2_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-2 md:p-3">
            <div className="relative overflow-hidden rounded-xl bg-white/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl md:rounded-2xl md:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-transparent"
                aria-hidden
              />
              <h2 className="relative text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] text-white">
                Questions
              </h2>
              <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {FAQS.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-lg font-bold text-white md:text-xl">
                      {item.q}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-5 text-white/80">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="book"
        ref={(el) => {
          s6Reveal.containerRef.current = el;
        }}
        className="flex w-full flex-col gap-1.5 px-3 pt-1.5 pb-1.5 md:min-h-[80vh] md:gap-2 md:px-5 md:pt-2 md:pb-2"
      >
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-2">
          <div
            className="relative min-h-[280px] overflow-hidden rounded-xl md:min-h-[520px] md:rounded-2xl"
            style={s6Reveal.getAnimStyle(0)}
          >
            <img
              src={BOOK_IMAGE}
              alt="Healthy smile"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-5 md:p-8">
              <p className="mb-2 text-xs font-semibold text-white md:text-sm">
                New patients welcome
              </p>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] text-white">
                Book an
                <br />
                Appointment
              </h2>
              <a
                href={TEL}
                className="mt-5 w-fit rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition-transform hover:scale-105 md:px-7 md:py-4 md:text-base"
              >
                Call {PHONE}
              </a>
            </div>
          </div>
          <div className="h-full" style={s6Reveal.getAnimStyle(1)}>
            <AppointmentForm />
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 px-3 py-6 text-xs font-semibold text-neutral-500 md:flex-row md:items-center md:justify-between md:px-5 md:py-8 md:text-sm">
        <span>© {new Date().getFullYear()} All Care Dental</span>
        <span>19019 Hawthorne Blvd, Suite 100-B · Torrance, CA 90503</span>
        <a href={TEL} className="text-black">
          {PHONE}
        </a>
      </footer>
    </div>
  );
}
