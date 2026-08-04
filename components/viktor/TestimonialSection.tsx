'use client';

import { Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInViewAnimation } from './useInViewAnimation';

const PARALLAX_IMG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85';

export function TestimonialSection() {
  const { ref, animClass } = useInViewAnimation();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const el = imgWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      setOffset((clamped - 0.5) * 200);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const el = imgWrapRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      },
      { threshold: 0 },
    );

    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="mx-auto flex max-w-2xl flex-col items-center px-6 py-12 text-center"
    >
      <Quote
        className={`mb-6 h-6 w-6 text-slate-900 ${animClass}`}
        style={{ animationDelay: '0.1s' }}
      />

      <p
        className={`text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${animClass}`}
        style={{ animationDelay: '0.2s' }}
      >
        I left <span className="font-mondwest">Apple</span> to build the studio
        I always wanted to work with
      </p>

      <p
        className={`mt-6 text-sm italic text-[#273C46] ${animClass}`}
        style={{ animationDelay: '0.3s' }}
      >
        Viktor Oddy
      </p>

      <div
        className={`mt-10 flex flex-wrap items-center justify-center gap-8 ${animClass}`}
        style={{ animationDelay: '0.4s' }}
      >
        <span className="inline-flex w-[80px] justify-center text-[24px] font-medium text-slate-900">
          Apple
        </span>
        <span className="inline-flex w-[83px] justify-center text-[24px] font-medium text-slate-900">
          IDEO
        </span>
        <span className="inline-flex w-[110px] justify-center text-[24px] font-medium text-slate-900">
          Polygon
        </span>
      </div>

      <div
        ref={imgWrapRef}
        className={`mt-10 w-full max-w-xs overflow-hidden rounded-2xl ${animClass}`}
        style={{ animationDelay: '0.5s' }}
      >
        <img
          src={PARALLAX_IMG}
          alt="Chris Halaska"
          className="w-full rounded-2xl object-cover shadow-lg will-change-transform"
          style={{ transform: `translateY(${offset}px)` }}
        />
      </div>
    </section>
  );
}
