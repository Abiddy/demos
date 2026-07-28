'use client';

import { useState } from 'react';
import type { AccordionItem } from '@/types/site-config';

type FeatureAccordionSectionProps = {
  items: AccordionItem[];
};

export function FeatureAccordionSection({ items }: FeatureAccordionSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="features"
      className="bg-[#090909] px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] border-t border-white/10">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.label} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                aria-expanded={isOpen}
              >
                <span className="feature-stamp-label">{item.label}</span>
                <span
                  className={`shrink-0 text-sm text-[#828384] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  ⌄
                </span>
              </button>
              {isOpen ? (
                <p className="pb-6 max-w-2xl text-[15px] leading-[1.6] text-[#828384]">
                  {item.body}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
