'use client';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useInViewAnimation } from './useInViewAnimation';

const TESTIMONIALS = [
  {
    name: 'Marcus Anderson',
    role: 'CEO, Data.storage',
    quote:
      'With very little guidance team delivered designs that were consistently spot on. We’ve received so much positive feedback about the design — our community loves it.',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'alexwu',
    role: 'Founder, Nexgate',
    quote:
      'Viktor led the creation of our best fundraising deck to date! Knows how to merge sophisticated UX with simple, cryptonative design.',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'James Mitchell',
    role: 'VP Product, LaunchPad',
    quote:
      'Working with Viktor transformed our product vision. Clear thinking, beautiful craft, and a team that ships without drama.',
    avatar:
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Rachel Foster',
    role: 'Co-founder, Nexus Labs',
    quote:
      'The design quality exceeded our expectations. Every review felt sharp, intentional, and ready for production.',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'David Zhang',
    role: 'Head of Design, Paradigm Labs',
    quote:
      'Incredible work from start to finish. Fast, thoughtful, and consistently elevating the product at every step.',
    avatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
] as const;

function QuoteMark() {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      aria-hidden
      className="mb-5 text-[#0D212C]"
    >
      <path
        d="M0 22V12.1C0 5.3 3.7 1.1 11.2 0L12.4 3.1C8.5 3.9 6.4 6.1 6.4 10.1H11.5V22H0ZM15.5 22V12.1C15.5 5.3 19.2 1.1 26.7 0L27.9 3.1C24 3.9 21.9 6.1 21.9 10.1H27V22H15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TestimonialCarousel() {
  const { ref, animClass } = useInViewAnimation();
  const items = useMemo(
    () => [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS],
    [],
  );
  const [index, setIndex] = useState<number>(TESTIMONIALS.length);
  const [paused, setPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(427.5);

  useEffect(() => {
    const measure = () => {
      setCardWidth(window.innerWidth < 768 ? window.innerWidth - 48 : 427.5);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (index >= TESTIMONIALS.length * 2) {
      const t = window.setTimeout(() => {
        setIndex(TESTIMONIALS.length);
      }, 820);
      return () => window.clearTimeout(t);
    }
    if (index < TESTIMONIALS.length) {
      const t = window.setTimeout(() => {
        setIndex(TESTIMONIALS.length * 2 - 1);
      }, 820);
      return () => window.clearTimeout(t);
    }
  }, [index]);

  const gap = 24;
  const step = cardWidth + gap;
  const noTransition =
    index === TESTIMONIALS.length || index === TESTIMONIALS.length * 2 - 1;

  return (
    <section
      ref={ref}
      className="w-full py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`mb-10 flex flex-col gap-6 px-6 md:ml-auto md:max-w-4xl md:flex-row md:items-end md:justify-between ${animClass}`}
        style={{ animationDelay: '0.1s' }}
      >
        <h2 className="text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]">
          What <span className="font-mondwest">builders</span> say
        </h2>
        <div className="flex items-center gap-2 text-sm text-[#051A24]">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-black text-black" />
            ))}
          </div>
          <span>Clutch 5/5</span>
        </div>
      </div>

      <div className="relative overflow-hidden px-6">
        <div
          className="flex gap-6"
          style={{
            width: items.length * step,
            transform: `translateX(-${index * step}px)`,
            transition: noTransition
              ? 'none'
              : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {items.map((item, i) => {
            const active = i === index;
            return (
              <article
                key={`${item.name}-${i}`}
                className="shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:rounded-[40px] md:pl-10 md:pr-24"
                style={{
                  width: cardWidth,
                  opacity: active ? 1 : 0.55,
                  transform: active ? 'scale(1)' : 'scale(0.96)',
                  transition:
                    'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <QuoteMark />
                <p className="text-base leading-relaxed text-[#0D212C]">
                  {item.quote}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#051A24]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#273C46]">→ {item.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex gap-3 px-0 md:ml-auto md:max-w-4xl">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => i - 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 bg-white transition hover:bg-slate-50"
          >
            <ChevronLeft className="h-5 w-5 text-[#0D212C]" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => i + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 bg-white transition hover:bg-slate-50"
          >
            <ChevronRight className="h-5 w-5 text-[#0D212C]" />
          </button>
        </div>
      </div>
    </section>
  );
}
