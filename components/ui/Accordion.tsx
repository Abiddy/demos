'use client';

import { useState } from 'react';

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[17px] font-normal tracking-[-0.02em] text-white">
                {item.question}
              </span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center font-mono text-[16px] text-[#828384]">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <p className="pb-6 text-[16px] leading-[1.6] text-[#828384]">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
