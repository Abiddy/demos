'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type WheelEvent,
} from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Menu,
  Pause,
  Phone,
  Play,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';

const PHONE = '(559) 914-1284';
const TEL = 'tel:+15599141284';
const ADDRESS = '6648 N Cedar Ave, Fresno, CA 93710';
const MAPS =
  'https://maps.google.com/?q=6648+N+Cedar+Ave,+Fresno,+CA+93710';
const INSTAGRAM = 'https://www.instagram.com/';

const HERO_LEFT_IMG = '/nummy/storefront.jpg';

const SLIDES = [
  '/nummy/taiyaki-mint.jpg',
  '/nummy/taiyaki-duo.jpg',
  '/nummy/taiyaki-box.jpg',
] as const;

const NAV_LINKS = [
  { label: 'menu', href: '#menu' },
  { label: 'flavors', href: '#flavors' },
  { label: 'visit', href: '#visit' },
  { label: 'order', href: TEL },
] as const;

type Product = {
  category: string;
  subcategory?: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  tab: 'best' | 'sets';
};

const PRODUCTS: Product[] = [
  {
    category: 'TAIYAKI',
    name: 'Matcha soft-serve taiyaki',
    price: '$8.50',
    image: '/nummy/taiyaki-mint.jpg',
    tab: 'best',
  },
  {
    category: 'SOFT SERVE',
    subcategory: 'CLASSIC',
    name: 'Milk tea swirl cup',
    price: '$7.50',
    image: '/nummy/taiyaki-duo.jpg',
    tab: 'best',
  },
  {
    category: 'BOX SET',
    name: 'Fresh taiyaki half-dozen',
    price: '$18.00',
    oldPrice: '$21.00',
    image: '/nummy/taiyaki-box.jpg',
    tab: 'sets',
  },
  {
    category: 'TAIYAKI',
    subcategory: 'TOPPED',
    name: 'Chocolate drizzle fish cone',
    price: '$9.00',
    image: '/nummy/taiyaki-duo.jpg',
    tab: 'best',
  },
  {
    category: 'SOFT SERVE',
    subcategory: 'SPRINKLES',
    name: 'Rainbow sprinkle cup',
    price: '$8.00',
    image: '/nummy/taiyaki-duo.jpg',
    tab: 'best',
  },
  {
    category: 'BOX SET',
    name: 'Party taiyaki dozen',
    price: '$32.00',
    oldPrice: '$36.00',
    image: '/nummy/taiyaki-box.jpg',
    tab: 'sets',
  },
  {
    category: 'SIGNATURE',
    subcategory: 'CRUNCH',
    name: 'Crispy topping fish cone',
    price: '$9.50',
    image: '/nummy/taiyaki-mint.jpg',
    tab: 'best',
  },
];

const CATEGORIES = [
  {
    name: 'taiyaki',
    image: '/nummy/taiyaki-mint.jpg',
    href: '#menu',
  },
  {
    name: 'soft serve',
    image: '/nummy/taiyaki-duo.jpg',
    href: '#menu',
  },
  {
    name: 'boxes',
    image: '/nummy/taiyaki-box.jpg',
    href: '#menu',
  },
] as const;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return { ref, isVisible };
}

function FadeIn({
  children,
  className = '',
  y = 6,
  duration = 800,
  threshold = 0.15,
  style,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  threshold?: number;
  style?: CSSProperties;
}) {
  const { ref, isVisible } = useInView(threshold);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

export function NummyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tab, setTab] = useState<'best' | 'sets'>('best');
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref: heroTextRef, isVisible: heroVisible } = useInView(0.1);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const onCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const onCarouselWheel = (event: WheelEvent<HTMLDivElement>) => {
    const el = carouselRef.current;
    if (!el) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    }
  };

  const products = PRODUCTS.filter((product) => product.tab === tab);

  return (
    <div className="nummy-page min-h-screen bg-white text-[#1a1a1a]">
      <div className="absolute top-0 left-0 right-0 z-30 bg-[#F9F4F0] text-black">
        <div className="relative flex items-center justify-center gap-3 px-4 py-2.5 sm:py-3">
          <ChevronLeft size={16} className="shrink-0 opacity-70" aria-hidden />
          <p className="text-center text-xs sm:text-sm tracking-wide">
            free treat with orders over $25 · open daily · closes 10 PM
          </p>
          <ChevronRight size={16} className="shrink-0 opacity-70" aria-hidden />
        </div>
      </div>

      <nav className="absolute top-[38px] sm:top-[42px] left-0 right-0 z-30 text-white">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          <a
            href="#top"
            className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase"
          >
            Nummy
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative text-sm lowercase tracking-wide"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <span className="flex h-4 w-6 overflow-hidden rounded-[1px]">
                <span className="w-1/3 bg-blue-700" />
                <span className="w-1/3 bg-white" />
                <span className="w-1/3 bg-red-600" />
              </span>
              <span>usd $</span>
              <ChevronDown size={14} aria-hidden />
            </div>
            <span className="hidden md:block w-px h-5 bg-white/30 mx-1" />
            <button
              type="button"
              className="hidden sm:inline-flex p-1"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <button type="button" className="p-1" aria-label="Search">
              <Search size={20} />
            </button>
            <a href={TEL} className="p-1" aria-label="Order">
              <ShoppingBag size={20} />
            </a>
            <button
              type="button"
              className="md:hidden p-1"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-sm transition-opacity duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          className="absolute top-5 right-5 text-white p-2"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        <ul className="flex h-full flex-col items-center justify-center gap-8 text-white">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-3xl font-light lowercase"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section
        id="top"
        className="relative flex min-h-screen flex-col lg:flex-row"
      >
        <div className="relative flex w-full lg:w-1/2 min-h-[60vh] lg:min-h-0 items-end lg:items-center overflow-hidden">
          <img
            src={HERO_LEFT_IMG}
            alt="Nummy Yummy storefront"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
          <div
            ref={heroTextRef}
            className="relative z-10 px-6 sm:px-10 lg:px-14 pb-16 pt-36 lg:py-24 transition-all duration-1000"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,5vw,6rem)] font-light leading-[1.05] mb-6 text-white">
              sweet fish cones,
              <br />
              <span className="relative inline-block">
                soft-serve joy.
                <svg
                  className="absolute -bottom-1 left-0 w-full h-4"
                  viewBox="0 0 200 16"
                  fill="none"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 C40 2, 80 14, 120 8 S180 2, 198 10"
                    stroke="#F26BA8"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 13 C45 5, 85 15, 125 10 S175 4, 198 12"
                    stroke="#F26BA8"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                  <path
                    d="M2 15 C50 8, 90 16, 130 12 S178 6, 198 14"
                    stroke="#F26BA8"
                    strokeWidth="1"
                    opacity="0.45"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-sm md:text-base text-white/80 mb-10 max-w-md">
              Casual cultural desserts — taiyaki ice cream, soft-serve, and sweet
              treats in Cedar Tree Village, Fresno.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={TEL}
                className="btn-primary inline-flex items-center px-10 py-4 bg-white text-black rounded-full text-sm"
              >
                order pickup
              </a>
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center px-10 py-4 bg-transparent text-white border border-white/60 rounded-full text-sm"
              >
                get directions
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-0 overflow-hidden bg-black">
          {SLIDES.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === slide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === slide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              onClick={() => setPaused((p) => !p)}
              className="w-8 h-8 rounded-full border border-white/50 text-white inline-flex items-center justify-center"
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>
        </div>
      </section>

      <section
        id="menu"
        className="bg-[#F9F4F0] text-black py-12 sm:py-16 px-4 sm:px-6 lg:px-10"
      >
        <FadeIn y={6} duration={800}>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-10 sm:mb-14">
            {(
              [
                { id: 'best' as const, label: 'best sellers' },
                { id: 'sets' as const, label: 'sets' },
              ] as const
            ).map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTab(item.id);
                    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
                    setScrollProgress(0);
                  }}
                  className={`flex items-center gap-3 text-2xl sm:text-4xl md:text-5xl font-medium transition-colors ${
                    active
                      ? 'text-[#1a1a1a]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {active ? (
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1a1a1a] animate-scale-in" />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          onWheel={onCarouselWheel}
          className="flex overflow-x-auto scrollbar-hide"
        >
          {products.map((product, index) => (
            <FadeIn
              key={`${tab}-${product.name}-${index}`}
              y={8}
              duration={500}
              className="group shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[calc(25%-1px)] border border-gray-200 -ml-[1px] first:ml-0 bg-[#F9F4F0]"
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              <div className="px-4 h-12 flex flex-col justify-center">
                <p className="text-xs font-medium tracking-wider uppercase">
                  {product.category}
                </p>
                {product.subcategory ? (
                  <p className="text-xs text-gray-500 uppercase mt-0.5">
                    {product.subcategory}
                  </p>
                ) : null}
              </div>
              <div className="mx-4 aspect-[3/4] rounded-lg overflow-hidden bg-[#F9F4F0]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-5 text-center">
                <p className="text-sm mb-2">{product.name}</p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span>{product.price}</span>
                  {product.oldPrice ? (
                    <span className="text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  ) : null}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 mx-auto max-w-[280px]">
          <div className="h-[2px] bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full w-[30%] bg-[#1a1a1a] rounded-full transition-transform duration-150"
              style={{
                transform: `translateX(${scrollProgress * (100 / 0.3)}%)`,
              }}
            />
          </div>
        </div>
      </section>

      <section id="flavors" className="bg-black text-white">
        <FadeIn
          y={12}
          duration={1000}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {CATEGORIES.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group relative min-h-[400px] sm:min-h-[500px] md:min-h-[750px] p-6 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden"
            >
              <img
                src={category.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                <p
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium"
                  style={{
                    writingMode: 'vertical-lr',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {category.name}
                </p>
              </div>
              <span className="btn-primary relative z-10 self-start px-8 py-3 bg-white text-black rounded-full text-sm">
                shop {category.name}
              </span>
            </a>
          ))}
        </FadeIn>
      </section>

      <section
        id="visit"
        className="bg-[#F9F4F0] text-black px-4 sm:px-6 lg:px-10 py-14 sm:py-20"
      >
        <FadeIn y={8} duration={800} className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
            visit us
          </p>
          <h2 className="text-3xl sm:text-5xl font-medium mb-4">Nummy Yummy</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8">
            Casual, cultural dessert spot serving taiyaki ice cream, soft-serve
            and other sweet treats. Located in Cedar Tree Village.
          </p>
          <p className="text-sm sm:text-base mb-1">{ADDRESS}</p>
          <a
            href={TEL}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium mb-8 hover:opacity-70 transition"
          >
            <Phone size={16} />
            {PHONE}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={TEL}
              className="btn-primary px-8 py-3 bg-[#1a1a1a] text-white rounded-full text-sm"
            >
              order pickup
            </a>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-8 py-3 bg-white border border-gray-300 text-black rounded-full text-sm"
            >
              directions
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-300 text-black rounded-full text-sm"
            >
              <Instagram size={16} />
              Instagram
            </a>
          </div>
        </FadeIn>
      </section>

      <footer className="bg-black text-white/70 px-4 sm:px-6 lg:px-10 py-8 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="tracking-[0.2em] uppercase text-white font-bold">
          Nummy Yummy
        </span>
        <span>Fresno, CA · Cedar Tree Village</span>
        <span>© {new Date().getFullYear()} Nummy Yummy</span>
      </footer>
    </div>
  );
}
