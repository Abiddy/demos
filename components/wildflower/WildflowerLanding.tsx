'use client';

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';
import { MapPin, Clock3, Instagram } from 'lucide-react';
import { useRef } from 'react';
import OrbitImages from '@/components/lomelis/OrbitImages';

const ORDER_URL = 'https://wildflowercafe-redondobeach.com';
const MENU_URL = '#menu';
const ADDRESS = '600 S Pacific Coast Hwy, Redondo Beach, CA 90277';
const MAPS =
  'https://maps.google.com/?q=600+S+Pacific+Coast+Hwy,+Redondo+Beach,+CA+90277';
const INSTAGRAM = 'https://www.instagram.com/';

const orbitDishes = [
  {
    src: '/wildflower/pancakes.jpg',
    name: 'Berry Pancakes',
    description: 'Fluffy stack, strawberries, whipped cream & chocolate chips.',
    price: '$14',
  },
  {
    src: '/wildflower/eggs-benedict.jpg',
    name: 'Eggs Benedict',
    description: 'Poached eggs, hollandaise, home fries & fresh fruit.',
    price: '$16',
  },
  {
    src: '/wildflower/chicken-salad.jpg',
    name: 'Crispy Chicken Salad',
    description: 'Crispy chicken, greens, bacon, cheddar & honey mustard.',
    price: '$15',
  },
  {
    src: '/wildflower/chicken-avocado.jpg',
    name: 'Chicken Avocado Melt',
    description: 'Grilled chicken, avocado, tomato, cheddar on toast.',
    price: '$15',
  },
  {
    src: '/wildflower/quesadillas.jpg',
    name: 'Cheese Quesadillas',
    description: 'Golden wedges with guac, pico & sour cream.',
    price: '$13',
  },
  {
    src: '/wildflower/breakfast-spread.jpg',
    name: 'Sunrise Plate',
    description: 'Eggs, potatoes, sausage & pancakes — the full cafe spread.',
    price: '$17',
  },
] as const;

const FEATURED = [
  orbitDishes[0],
  orbitDishes[1],
  orbitDishes[2],
  orbitDishes[3],
];

export function WildflowerLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevScroll = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rx = useTransform(scrollYProgress, [0, 0.08, 1], ['0%', '55%', '55%']);
  const ry = useTransform(scrollYProgress, [0, 0.08, 1], ['0%', '55%', '55%']);
  const clipPath = useMotionTemplate`ellipse(${rx} ${ry} at 50% 50%)`;

  const textOpacity = useTransform(
    scrollYProgress,
    [0.03, 0.08, 0.15, 0.22, 0.9, 0.98, 1],
    [0, 1, 1, 0, 0, 1, 1],
  );
  const textBlurVal = useTransform(
    scrollYProgress,
    [0.03, 0.08, 0.15, 0.22, 0.9, 0.98, 1],
    [15, 0, 0, 15, 15, 0, 0],
  );
  const filterText = useMotionTemplate`blur(${textBlurVal}px)`;
  const yElement = useTransform(
    scrollYProgress,
    [0.03, 0.08, 0.15, 0.22, 0.9, 0.98, 1],
    [20, 0, 0, 20, 20, 0, 0],
  );

  const targetRadius = 650;

  const orbitItemSize = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95, 1],
    [80, 520, 520, 80, 80],
  );
  const orbitRx = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95, 1],
    [330, targetRadius, targetRadius, 330, 330],
  );
  const orbitRy = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95, 1],
    [140, targetRadius, targetRadius, 140, 140],
  );
  const orbitRotation = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95, 1],
    [-15, 0, 0, -15, -15],
  );
  const orbitTx = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95, 1],
    [0, -targetRadius, -targetRadius, 0, 0],
  );
  const focusStrength = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95, 1],
    [0, 1, 1, 0, 0],
  );

  const orbitProgress = useMotionValue(0);

  useAnimationFrame((_time, delta) => {
    const pos = scrollYProgress.get();
    const scrollDelta = pos - prevScroll.current;
    prevScroll.current = pos;

    let frameSpeed = 0;
    if (pos > 0.15 && pos < 0.85) {
      frameSpeed = scrollDelta * 200;
    } else {
      frameSpeed = (delta / 1000) * 2.5;
    }

    orbitProgress.set(orbitProgress.get() + frameSpeed);
  });

  return (
    <div className="lomelis-page wildflower-page">
      <div ref={containerRef} className="relative w-full h-[600vh] bg-black">
        <div className="sticky top-0 w-full h-screen overflow-hidden text-white">
          <div className="absolute inset-0 z-0 grid grid-cols-3">
            <div className="relative h-full overflow-hidden">
              <img
                src="/wildflower/pancakes.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src="/wildflower/breakfast-spread.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative h-full overflow-hidden">
              <img
                src="/wildflower/eggs-benedict.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-black/45 z-[1]" />

          <div
            className="absolute z-10 w-[90vw] md:w-[80vw]"
            style={{ left: '3vw', bottom: '3vw' }}
          >
            <svg
              viewBox="0 10 520 72"
              className="w-full h-auto drop-shadow-2xl overflow-visible"
              preserveAspectRatio="xMinYMax meet"
            >
              <text
                x="-3"
                y="80"
                fontFamily="'Instrument Serif', serif"
                fill="#F5D08A"
                className="select-none"
              >
                <tspan fontSize="64">Wildflower Cafe</tspan>
              </text>
            </svg>
          </div>

          <motion.div
            className="absolute z-20 flex items-center justify-center overflow-hidden"
            style={{
              clipPath,
              rotate: -15,
              width: '150vw',
              height: '150vh',
              left: '-25vw',
              top: '-25vh',
            }}
          >
            <div className="absolute inset-0 bg-[#FBF6EE]" />
            <div
              className="relative flex flex-col items-center justify-center"
              style={{
                width: '100vw',
                height: '100vh',
                transform: 'rotate(15deg)',
              }}
            >
              <motion.div className="w-[90vw] max-w-[1200px] aspect-square relative z-0">
                <OrbitImages
                  dishes={[...orbitDishes]}
                  altPrefix="Wildflower Cafe menu item"
                  shape="ellipse"
                  direction="normal"
                  duration={40}
                  fill={true}
                  showPath={false}
                  responsive={true}
                  baseWidth={800}
                  progressOverride={orbitProgress}
                  radiusXOverride={orbitRx}
                  radiusYOverride={orbitRy}
                  itemSizeOverride={orbitItemSize}
                  rotationOverride={orbitRotation}
                  translateXOverride={orbitTx}
                  focusStrength={focusStrength}
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="absolute inset-0 z-[60] pointer-events-none">
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
              <motion.div
                className="flex flex-col items-center whitespace-nowrap pointer-events-auto"
                style={{
                  filter: filterText,
                  opacity: textOpacity,
                  WebkitFontSmoothing: 'antialiased',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <div className="flex items-baseline text-black leading-none mb-1">
                  <span className="font-serif text-[40px] md:text-[55px] italic tracking-tight text-black">
                    B
                  </span>
                  <span className="font-serif text-[40px] md:text-[55px] tracking-tight text-black">
                    reakfast &amp; lunch
                  </span>
                </div>
                <span className="font-sans text-[24px] md:text-[36px] tracking-tight text-black mt-[-5px]">
                  coffee · beer · patio
                </span>
              </motion.div>
            </div>

            <motion.div
              className="absolute top-32 right-[calc(6vw+150px)] md:right-[214px] flex flex-col items-start text-left pointer-events-auto cursor-text"
              style={{ y: yElement, filter: filterText, opacity: textOpacity }}
            >
              <span className="font-serif text-[40px] leading-none mb-3 text-black">
                PCH
              </span>
              <span className="font-serif text-[16px] uppercase tracking-widest text-black leading-[20px] text-left">
                AMERICAN
                <br />
                CAFE
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex flex-col items-start text-black pointer-events-auto cursor-text"
              style={{ y: yElement, filter: filterText, opacity: textOpacity }}
            >
              <span className="font-serif text-[40px] leading-none mb-1 text-black">
                90277
              </span>
              <span className="font-serif text-[16px] uppercase tracking-widest text-black">
                REDONDO BEACH
              </span>
            </motion.div>

            <div className="absolute bottom-16 right-[6vw] md:right-[10vw] flex flex-col items-start z-10 pointer-events-auto">
              <motion.p
                className="font-serif text-[16px] uppercase tracking-widest text-black leading-[20px] mb-6 text-left w-[260px] cursor-text"
                style={{ y: yElement, filter: filterText, opacity: textOpacity }}
              >
                ARTFUL COUNTER-SERVE CAFE FOR BREAKFAST &amp; LUNCH ON SOUTH PCH.
              </motion.p>
              <motion.div
                className="flex gap-0 pointer-events-auto items-center"
                style={{
                  y: yElement,
                  filter: filterText,
                  opacity: textOpacity,
                }}
              >
                <a
                  href={MENU_URL}
                  className="bg-black hover:bg-black/90 transition-colors text-white rounded-[40px] px-8 py-3.5 font-serif tracking-[0.1em] uppercase text-[12px] md:text-[14px] z-10"
                >
                  See Menu
                </a>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-black hover:bg-black/90 transition-colors w-[46px] h-[46px] flex items-center justify-center rounded-[50%] text-white -ml-2 z-0"
                  aria-label="Order online"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
              <motion.a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="mt-4 font-sans text-[13px] tracking-wide text-black/80 hover:text-black"
                style={{
                  y: yElement,
                  filter: filterText,
                  opacity: textOpacity,
                }}
              >
                {ADDRESS}
              </motion.a>
            </div>
          </div>

          <motion.header
            className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-[100] pointer-events-none"
            style={{ opacity: textOpacity, filter: filterText }}
          >
            <div
              className="flex items-start text-black select-none leading-none pointer-events-auto"
              style={{
                fontFamily: "'Instrument Serif', serif",
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              <span style={{ fontSize: '32px' }}>Wildflower</span>
            </div>

            <a
              href={MENU_URL}
              className="group relative flex items-center justify-center w-[72px] h-[44px] hover:scale-105 transition-transform duration-300 cursor-pointer pointer-events-auto"
              aria-label="Menu"
            >
              <div className="absolute inset-0 bg-[#B85C38] rounded-[50%] -rotate-[15deg]" />
              <svg
                className="relative z-10"
                width="24"
                height="10"
                viewBox="0 0 24 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H23M1 9H23"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </motion.header>
        </div>
      </div>

      <section className="bg-[#FBF6EE] text-black px-6 md:px-16 py-20 md:py-28">
        <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-black/50 mb-4">
              About
            </p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-6">
              Artful cafe on PCH
            </h2>
            <p className="font-sans text-base md:text-lg text-black/75 leading-relaxed mb-5">
              Wildflower Cafe is an artful, counter-serve American cafe for
              breakfast and lunch — with coffee, beer, and indoor/outdoor seats
              in Redondo Beach.
            </p>
            <p className="font-sans text-base md:text-lg text-black/75 leading-relaxed">
              Dine in, take out, or grab no-contact delivery. Expect classic
              plates, bright plating, and a relaxed South Bay vibe.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
            <img
              src="/wildflower/quesadillas.jpg"
              alt="Quesadillas from Wildflower Cafe"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section
        id="menu"
        className="bg-black text-white px-6 md:px-16 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/50 mb-4">
                Menu
              </p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
                From the counter
              </h2>
            </div>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex self-start md:self-auto items-center rounded-full bg-white text-black px-7 py-3 font-serif uppercase tracking-[0.1em] text-sm hover:bg-[#F5D08A] transition-colors"
            >
              Order online
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURED.map((dish) => (
              <article key={dish.name} className="group">
                <div className="aspect-square overflow-hidden mb-4 bg-white/5">
                  <img
                    src={dish.src}
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-serif text-2xl">{dish.name}</h3>
                  <span className="font-serif text-lg text-[#F5D08A] shrink-0">
                    {dish.price}
                  </span>
                </div>
                <p className="font-sans text-sm text-white/65 leading-relaxed">
                  {dish.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 py-20 md:py-28 overflow-hidden">
        <img
          src="/wildflower/chicken-avocado.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/55 mb-4">
            Visit
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-6">
            Dine in, takeout &amp; delivery
          </h2>
          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed mb-8">
            Counter-serve American cafe for breakfast and lunch — typically
            $10–20 per person. Closes 2:30 PM. Indoor and outdoor seating on
            South PCH.
          </p>
          <a
            href={MAPS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-[#F5D08A] text-black px-8 py-3.5 font-serif uppercase tracking-[0.1em] text-sm hover:bg-white transition-colors"
          >
            Get directions
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#FBF6EE] text-black px-6 md:px-16 py-20 md:py-28"
      >
        <div className="mx-auto max-w-5xl grid md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B85C38] text-white mb-5">
              <MapPin size={18} />
            </div>
            <h3 className="font-serif text-2xl mb-3">Visit Us</h3>
            <p className="font-sans text-sm text-black/70 leading-relaxed mb-4">
              {ADDRESS}
            </p>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm underline underline-offset-4 hover:opacity-70"
            >
              Get directions
            </a>
          </div>
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B85C38] text-white mb-5">
              <Clock3 size={18} />
            </div>
            <h3 className="font-serif text-2xl mb-3">Hours</h3>
            <ul className="font-sans text-sm text-black/70 space-y-2">
              <li>Breakfast &amp; lunch daily</li>
              <li>Closes 2:30 PM</li>
              <li>Dine-in · Takeout · Delivery</li>
            </ul>
          </div>
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B85C38] text-white mb-5">
              <Instagram size={18} />
            </div>
            <h3 className="font-serif text-2xl mb-3">Order</h3>
            <p className="font-sans text-sm text-black/70 mb-4">
              Order ahead online or swing by the counter on PCH.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black text-white px-5 py-2.5 font-sans text-xs uppercase tracking-wider hover:bg-black/85"
              >
                Website
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/25 px-5 py-2.5 font-sans text-xs uppercase tracking-wider hover:bg-[#B85C38] hover:text-white hover:border-[#B85C38] transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white/55 px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-wide">
        <span className="font-serif text-white text-lg tracking-normal">
          Wildflower Cafe
        </span>
        <span>Redondo Beach · Breakfast &amp; Lunch</span>
        <span>{ADDRESS}</span>
      </footer>
    </div>
  );
}
