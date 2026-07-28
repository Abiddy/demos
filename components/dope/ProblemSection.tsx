'use client';

import { useState } from 'react';
import type { SiteConfig } from '@/types/site-config';

type ProblemSectionProps = {
  problem: SiteConfig['problem'];
};

export function ProblemSection({ problem }: ProblemSectionProps) {
  const [active, setActive] = useState('gen1');
  const current =
    problem.generations.find((item) => item.id === active) ??
    problem.generations[0];

  return (
    <section id="about" className="bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex gap-8 border-b border-white/10 pb-6">
          {problem.generations.map((gen) => (
            <button
              key={gen.id}
              type="button"
              onClick={() => setActive(gen.id)}
              className={`font-mono text-[12px] uppercase tracking-[0.14em] transition-colors ${
                active === gen.id ? 'text-[#f0f0f0]' : 'text-[#828384]'
              }`}
            >
              {gen.label}
            </button>
          ))}
        </div>

        <h2 className="mt-16 max-w-4xl text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.04em] text-white">
          There&apos;s a problem with{' '}
          <span className="lowercase">{problem.headingEmphasis}</span> today.
        </h2>
        <div className="mt-6 h-px w-12 bg-white/20" />

        <div className="mt-16 grid gap-12 lg:grid-cols-[180px_1fr] lg:gap-20">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#828384]">
              {current.label}
            </p>
            <p className="mt-2 text-[14px] text-[#f0f0f0]">{current.era}</p>
          </div>
          <div>
            <h3
              className={`text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.03em] ${
                current.highlight ? 'text-[#e1bdff]' : 'text-white'
              }`}
            >
              {current.title}
            </h3>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-[#828384]">
              {current.body}
            </p>
            {current.highlight ? (
              <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.2em] text-[#af50ff]">
                {problem.brandHighlight}
              </p>
            ) : null}
          </div>
        </div>

        {active !== 'gen3' ? (
          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            {problem.badTags.map((tag) => (
              <div
                key={tag}
                className="rounded-[19.2px] border border-white/10 p-8"
              >
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#828384]">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 rounded-[19.2px] border border-white/10 bg-white/[0.03] p-10">
            <p className="text-[clamp(1.5rem,3vw,2rem)] font-light leading-[1.12] tracking-[-0.03em] text-white">
              {problem.gen3Quote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
