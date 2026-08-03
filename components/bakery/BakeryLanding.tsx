'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronDown,
  Download,
  Globe,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { animateChars, splitChars } from './split-text';

gsap.registerPlugin(ScrollTrigger);

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const SCROLL_PER_SLIDE_VH = 150;

const VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260515_113235_88e0d62e-8103-40c1-948e-f0a4f886ffd1.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260515_114315_ee3663e6-bd79-41b4-9e5b-0fae62827eb9.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260515_114559_dca18b14-90f5-47c4-8a84-3cbae9bd8a0c.mp4',
] as const;

const REGIONS = ['Mainland China', 'Hong Kong / Macau', 'Taiwan'] as const;

const NAV_LEFT = [
  {
    label: 'About Us',
    items: [
      'Our History',
      'Food Service Experts',
      'Creating unforgettable culinary experiences',
    ],
  },
  {
    label: 'Partnering With Us',
    items: [
      'Sourcing from trusted suppliers',
      'Empowering Customer Operations',
      'Our Experts',
    ],
  },
] as const;

const NAV_RIGHT = [
  {
    label: 'Our Products',
    items: [
      'Viennese Pastry',
      'Bread',
      'Dessert',
      'Savory',
      'Speciality Pastry',
      'Culinary Aid',
      'Ingredient',
    ],
  },
  {
    label: "Let's Connect!",
    items: [
      'Contact',
      'LinkedIn',
      'WhatsApp',
      'Newsletter',
      'Brochure',
      'Join Us',
    ],
  },
] as const;

const GALLERY = [
  {
    label: 'Viennese Pastry',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Bread',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Dessert',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Savory',
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Sweet Treats',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Culinary Aid',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Ingredient',
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85',
  },
] as const;

const PARTNERS = [
  'Bridor de France',
  'Traiteur de Paris',
  'Panidor',
  'Boncolac',
  'Mademoiselle Desserts',
  'Mountry',
  'Pfalzgraf',
  'Dolceria Alba',
  'St Michel',
  'Poppies Bakeries',
  'Alysse Food',
  'Les Delices du Chef',
] as const;

const ABOUT_TEXT =
  'In 1976, Mr Louis Le Duff Opened The First French Casual Food Restaurant. Today, Bakery Facilities Delivers Premium Frozen Bakery Solutions To Professionals Across Asia — Combining European Craft, Reliable Logistics, And Culinary Expertise That Empowers Foodservice Operators To Create Unforgettable Experiences.';

const PARTNER_BG =
  'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=2000&q=85';

const LOTTIE_URLS = [
  'https://assets10.lottiefiles.com/packages/lf20_jbrw3hcz.json',
  'https://assets2.lottiefiles.com/packages/lf20_tll0j4bb.json',
  'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json',
  'https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json',
] as const;

const PARTNER_CARDS = [
  'Trusted Sourcing',
  'Food Safety Standards',
  'Operational Efficiency',
  'Expert Support',
] as const;

function easeInOutCubic(p: number) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 305 304" fill="none" className={className} aria-hidden>
      <path
        d="M157.135 303.572C157.135 222.53 223.131 156.832 304.174 156.832V303.572H157.135Z"
        fill="white"
      />
      <path
        d="M147.039 303.572C147.039 222.53 81.0425 156.832 0 156.832V303.572H147.039Z"
        fill="white"
      />
      <path
        d="M157.135 0C157.135 81.0426 223.131 146.74 304.174 146.74C304.174 65.698 238.178 0 157.135 0Z"
        fill="white"
      />
      <path
        d="M147.039 0C147.039 81.0426 81.0425 146.74 0 146.74C0 65.698 65.9962 0 147.039 0Z"
        fill="white"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
        fill="currentColor"
      />
      <path
        d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
        fill="currentColor"
      />
      <path
        d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="font-body text-[13px] text-white transition-colors duration-300 hover:text-[#CB9D06] inline-flex items-center gap-1"
      >
        {label}
        <ChevronDown size={14} className="opacity-70" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="bg-white py-2 shadow-lg text-black">
          {items.map((item) => (
            <a
              key={item}
              href="#products"
              className="block px-4 py-2.5 text-[13px] transition-colors hover:bg-[#CB9D06] hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function LottieIcon({ url }: { url: string }) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!data) {
    return <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10" />;
  }

  return (
    <div className="h-10 w-10 md:h-12 md:w-12">
      <Lottie animationData={data} loop autoplay />
    </div>
  );
}

export function BakeryLanding() {
  const heroOuterRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutWordsRef = useRef<HTMLParagraphElement>(null);
  const partnerTitleRef = useRef<HTMLHeadingElement>(null);
  const partnerCardsRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [region, setRegion] = useState<(typeof REGIONS)[number]>('Hong Kong / Macau');
  const [regionOpen, setRegionOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | '繁'>('EN');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isMobileHero, setIsMobileHero] = useState(false);
  const [lottieReady, setLottieReady] = useState(false);

  useEffect(() => {
    setLottieReady(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobileHero(window.innerWidth < 768);
    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const updateClips = useCallback(() => {
    const outer = heroOuterRef.current;
    if (!outer) return;
    const rect = outer.getBoundingClientRect();
    const totalScroll = outer.offsetHeight - window.innerHeight;
    const progress = Math.min(
      1,
      Math.max(0, -rect.top / Math.max(totalScroll, 1)),
    );
    const slideCount = VIDEOS.length;
    const per = 1 / slideCount;

    VIDEOS.forEach((_, index) => {
      const el = slideRefs.current[index];
      if (!el) return;
      if (index === 0) {
        el.style.clipPath = 'none';
        el.style.zIndex = '1';
        return;
      }
      const start = (index - 1) * per;
      const local = Math.min(1, Math.max(0, (progress - start) / per));
      const eased = easeInOutCubic(local);
      el.style.clipPath = `ellipse(${5 + eased * 150}% ${8 + eased * 150}% at 50% 50%)`;
      el.style.zIndex = String(index + 1);
    });
  }, []);

  useEffect(() => {
    updateClips();
    window.addEventListener('scroll', updateClips, { passive: true });
    window.addEventListener('resize', updateClips);
    return () => {
      window.removeEventListener('scroll', updateClips);
      window.removeEventListener('resize', updateClips);
    };
  }, [updateClips]);

  useGSAP(() => {
    if (h1Ref.current) {
      const chars = splitChars(h1Ref.current);
      animateChars(chars, {
        onComplete: () => {
          if (!subRef.current) return;
          const subChars = splitChars(
            subRef.current,
            'split-char font-luxurious',
          );
          animateChars(subChars);
        },
      });
    }

    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-card');
      gsap.fromTo(
        items,
        { opacity: 0, y: 120, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }

    if (aboutRef.current && aboutWordsRef.current) {
      const words = aboutWordsRef.current.querySelectorAll('.about-word');
      gsap.fromTo(
        aboutRef.current,
        { rotate: 3 },
        {
          rotate: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        words,
        { opacity: 0.1, filter: 'blur(4px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top bottom-=20%',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
    }

    if (partnerTitleRef.current) {
      const chars = splitChars(partnerTitleRef.current);
      gsap.set(chars, { opacity: 0, y: 40 });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: partnerTitleRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }

    if (partnerCardsRef.current) {
      const cards = partnerCardsRef.current.querySelectorAll('.partner-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 1 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: partnerCardsRef.current,
              start: 'top 90%',
              once: true,
            },
          },
        );
      });
    }
  }, []);

  const aboutWords = useMemo(() => ABOUT_TEXT.split(' '), []);

  const heroHeight = `calc(100vh + ${VIDEOS.length * SCROLL_PER_SLIDE_VH}vh)`;

  return (
    <div className="bakery-page min-h-screen">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 flex items-center px-4 md:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-[80px] shadow-md py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setRegionOpen((o) => !o)}
            className="inline-flex items-center gap-2 text-white text-[12px] font-body hover:text-[#CB9D06] transition-colors"
          >
            <Globe size={16} />
            <span>{region}</span>
            <ChevronDown size={14} />
          </button>
          {regionOpen ? (
            <div className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg py-2 z-40">
              {REGIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setRegion(item);
                    setRegionOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 text-[13px] text-black hover:bg-[#CB9D06] hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex-1 flex items-center justify-center gap-6 lg:gap-10">
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LEFT.map((item) => (
              <NavDropdown key={item.label} label={item.label} items={item.items} />
            ))}
          </div>

          <a href="#top" className="shrink-0" aria-label="Bakery Facilities">
            <Logo
              className={`w-auto transition-all duration-300 ${
                scrolled
                  ? 'h-[24px] md:h-[32px]'
                  : 'h-[32px] md:h-[48px]'
              }`}
            />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_RIGHT.map((item) => (
              <NavDropdown key={item.label} label={item.label} items={item.items} />
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 ml-auto">
          {(['EN', '繁'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLang(item)}
              className={`px-2.5 py-1 text-[12px] font-body transition-colors ${
                lang === item
                  ? 'bg-[#CB9D06] text-white'
                  : 'text-white hover:text-[#CB9D06]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden ml-auto text-white p-1"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Logo className="h-8 w-auto" />
          <button
            type="button"
            className="text-white p-1"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="px-6 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
          {[...NAV_LEFT, ...NAV_RIGHT].map((group) => (
            <div key={group.label} className="border-b border-white/10">
              <button
                type="button"
                className="w-full flex items-center justify-between py-4 text-white font-body"
                onClick={() =>
                  setMobileAccordion((cur) =>
                    cur === group.label ? null : group.label,
                  )
                }
              >
                {group.label}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    mobileAccordion === group.label ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileAccordion === group.label ? (
                <div className="pb-3 space-y-1">
                  {group.items.map((item) => (
                    <a
                      key={item}
                      href="#products"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 pl-2 text-sm text-white/70 hover:text-[#CB9D06]"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Floating nav */}
      <aside className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {[
          {
            icon: <Download size={18} />,
            label: 'Download Brochure',
            href: '#connect',
          },
          {
            icon: <LinkedInIcon className="h-5 w-5" />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/',
          },
          {
            icon: <MessageCircle size={18} />,
            label: 'Chat With Us',
            href: '#connect',
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            className="group flex h-12 items-center overflow-hidden rounded-full bg-black text-white transition-colors duration-300 hover:bg-[#CB9D06]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center">
              {item.icon}
            </span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap pr-0 text-[12px] font-body transition-all duration-300 group-hover:max-w-[180px] group-hover:pr-4">
              {item.label}
            </span>
          </a>
        ))}
      </aside>

      {/* SECTION 1: Hero */}
      <div
        id="top"
        ref={heroOuterRef}
        className="relative"
        style={{ height: heroHeight }}
      >
        <section className="sticky top-0 w-full h-screen overflow-visible">
          {VIDEOS.map((src, index) => (
            <div
              key={src}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="absolute inset-0"
              style={
                {
                  clipPath: index === 0 ? 'none' : 'ellipse(5% 8% at 50% 50%)',
                } as CSSProperties
              }
            >
              <video
                className="w-full h-full object-cover"
                src={src}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          ))}

          <div className="absolute inset-0 z-10 pointer-events-none">
            <p
              ref={subRef}
              className={`absolute inset-x-0 top-0 text-center font-luxurious text-white ${
                isMobileHero ? 'text-[12vw]' : 'text-[3vw]'
              }`}
              style={{ paddingTop: 'calc(80px + 60px)' }}
            >
              for Professionals
            </p>
            <h1
              ref={h1Ref}
              className={`absolute inset-x-0 font-accent text-white tracking-[-0.04em] ${
                isMobileHero
                  ? 'bottom-[48px] px-4 text-[40px] leading-[1.1] whitespace-normal text-center'
                  : 'bottom-[-26px] text-[9.7vw] leading-[1] whitespace-nowrap text-center'
              }`}
            >
              THE SMART BAKERY SOLUTION
            </h1>
          </div>
        </section>
      </div>

      {/* SECTION 2: Gallery */}
      <section
        id="products"
        className="bg-white py-8 md:py-16 flex justify-center"
      >
        <div ref={galleryRef} className="w-[90%] md:w-[65%]">
          <div className="grid grid-cols-2 min-[1000px]:grid-cols-4 gap-x-2 gap-y-10">
            {GALLERY.map((item, index) => {
              const spanTwo =
                index === 5 ? 'min-[1000px]:col-span-2' : '';
              return (
                <article
                  key={item.label}
                  className={`gallery-card ${spanTwo}`}
                >
                  <div className="overflow-hidden aspect-[3/4] p-[4px]">
                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="gallery-card-img absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-left text-black text-sm mt-2 font-manrope font-medium px-1">
                    {item.label}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: About */}
      <section
        id="about"
        className="bg-white py-16 md:py-32 flex flex-col items-center justify-center px-6 md:px-[18%]"
      >
        <div ref={aboutRef} className="w-full origin-center">
          <h2 className="font-luxurious text-[32px] text-center text-black mb-[20px]">
            About us
          </h2>
          <p
            ref={aboutWordsRef}
            className="font-accent uppercase text-[24px] leading-[36px] md:text-[40px] md:leading-[56px] text-center text-black"
          >
            {aboutWords.map((word, index) => (
              <span key={`${word}-${index}`} className="about-word inline-block mr-[0.35em]">
                {word}
              </span>
            ))}
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#partnering"
              className="px-8 py-3 bg-black text-white font-manrope text-sm tracking-wide hover:bg-[#CB9D06] transition-colors duration-300"
            >
              Read more
            </a>
          </div>
        </div>

        <div className="partner-marquee relative mt-16 md:mt-[140px] w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="partner-marquee-track flex w-max gap-12">
            {[...PARTNERS, ...PARTNERS].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="font-body text-[14px] tracking-[0.2em] uppercase text-black/40 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Partnering */}
      <section
        id="partnering"
        className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 md:py-28 px-4"
      >
        <img
          src={PARTNER_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2
            ref={partnerTitleRef}
            className="font-accent uppercase text-[28px] md:text-[40px] leading-[1.4] text-white text-center mb-10 md:mb-14"
          >
            Partnering With Us
          </h2>
          <div
            ref={partnerCardsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-[8px] w-[90%] md:w-[64%]"
          >
            {PARTNER_CARDS.map((label, index) => (
              <article
                key={label}
                className="partner-card bg-black px-4 md:px-6 py-6 md:py-8 flex flex-col items-center text-center gap-3 md:gap-4"
              >
                {lottieReady ? (
                  <LottieIcon url={LOTTIE_URLS[index] ?? LOTTIE_URLS[0]} />
                ) : (
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10" />
                )}
                <p className="text-white font-body text-[12px] md:text-[14px] tracking-wide capitalize">
                  {label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Footer */}
      <footer id="connect" className="bg-white w-full text-black">
        <div className="px-6 md:px-10 lg:px-16 pt-12 md:pt-20 pb-10 md:pb-16">
          <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12 md:mb-16">
            <div>
              <p className="text-[13px] text-black/40 uppercase tracking-wider mb-2">
                +852 2407 8840
              </p>
              <a
                href="mailto:orders@bakeryfacilities.com"
                className="text-[14px] font-bold hover:text-[#CB9D06] transition-colors"
              >
                orders@bakeryfacilities.com
              </a>
            </div>
            <div className="flex gap-16">
              <div>
                <p className="text-[12px] uppercase tracking-wider text-black/40 mb-3">
                  Navigate
                </p>
                <ul className="space-y-2">
                  {[
                    'About Us',
                    'Partnering With Us',
                    'Our Products',
                    "Let's Connect!",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#about"
                        className="text-[15px] text-black font-medium hover:text-[#CB9D06] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-wider text-black/40 mb-3">
                  Social
                </p>
                <ul className="space-y-2">
                  {['WhatsApp', 'LinkedIn', 'Newsletter'].map((link) => (
                    <li key={link}>
                      <a
                        href="#connect"
                        className="text-[15px] text-black font-medium hover:text-[#CB9D06] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                region: 'Head Office',
                company: 'Bakery Facilities Limited',
                address: 'Hong Kong',
                phone: '+852 2407 8840',
                email: 'orders@bakeryfacilities.com',
              },
              {
                region: 'Mainland China',
                company: 'Bakery Facilities Shanghai',
                address: 'Shanghai, China',
                phone: '+86 21 0000 0000',
                email: 'cn@bakeryfacilities.com',
              },
              {
                region: 'Taiwan',
                company: 'Bakery Facilities Taiwan',
                address: 'New Taipei City, Taiwan',
                phone: '+886 2 0000 0000',
                email: 'tw@bakeryfacilities.com',
              },
              {
                region: 'Macau',
                company: 'Bakery Facilities Macau',
                address: 'Macau',
                phone: '+853 0000 0000',
                email: 'mo@bakeryfacilities.com',
              },
            ].map((office) => (
              <div key={office.region}>
                <p className="text-[12px] uppercase tracking-wider text-black/40 mb-2">
                  {office.region}
                </p>
                <p className="text-[13px] font-semibold mb-1">{office.company}</p>
                <p className="text-[12px] text-black/60 mb-3">{office.address}</p>
                <p className="text-[12px] text-black/60 inline-flex items-center gap-1.5 mb-1">
                  <Phone size={12} /> {office.phone}
                </p>
                <p className="text-[12px] text-black/60 inline-flex items-center gap-1.5">
                  <Mail size={12} /> {office.email}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black px-6 md:px-10 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/40">
            © {new Date().getFullYear()} Bakery Facilities. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#connect"
              className="text-[12px] text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#connect"
              className="text-[12px] text-white/40 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
