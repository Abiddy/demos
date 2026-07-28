'use client';

import Link from 'next/link';
import type { Comparison } from '@/types/site-config';
import { useInView } from '@/components/useInView';

type ComparisonSectionProps = {
  comparisons: Comparison[];
};

export function ComparisonSection({ comparisons }: ComparisonSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="compare"
      ref={ref}
      className="bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          className={`compare-heading text-[clamp(2rem,5vw,3rem)] font-normal tracking-[-0.03em] text-white ${
            inView ? 'compare-heading-visible' : ''
          }`}
        >
          How we compare
        </h2>

        <div className="relative mt-16">
          <div
            className={`compare-line absolute left-0 right-0 top-0 hidden h-px bg-white/10 lg:block ${
              inView ? 'compare-line-visible' : ''
            }`}
          />

          <div className="grid gap-4 lg:grid-cols-4">
            {comparisons.map((item, index) => (
              <article
                key={item.number}
                className={`compare-card group relative rounded-[19.2px] border border-white/10 bg-[#090909] p-8 transition-[border-color,box-shadow] duration-300 hover:border-[#af50ff]/35 hover:shadow-[0_0_0_1px_rgba(175,80,255,0.12)] lg:pt-12 ${
                  inView ? 'compare-card-visible' : ''
                }`}
                style={{ transitionDelay: `${420 + index * 120}ms` }}
              >
                <span
                  className={`compare-node absolute left-1/2 top-0 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#090909] lg:block ${
                    inView ? 'compare-node-visible' : ''
                  }`}
                  style={{ transitionDelay: `${280 + index * 100}ms` }}
                />
                <p
                  className={`compare-number font-mono text-[48px] font-light leading-none text-white/10 ${
                    inView ? 'compare-number-visible' : ''
                  }`}
                  style={{ transitionDelay: `${500 + index * 120}ms` }}
                >
                  {item.number}
                </p>
                <p
                  className={`compare-label mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#828384] ${
                    inView ? 'compare-label-visible' : ''
                  }`}
                  style={{ transitionDelay: `${560 + index * 120}ms` }}
                >
                  {item.pain}
                </p>
                <Link
                  href="#compare"
                  className={`compare-link mt-8 inline-flex items-center gap-1 text-[14px] text-white ${
                    inView ? 'compare-link-visible' : ''
                  }`}
                  style={{ transitionDelay: `${620 + index * 120}ms` }}
                >
                  vs.{' '}
                  <span className="underline underline-offset-2">
                    {item.competitor}
                  </span>
                  <span className="compare-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
