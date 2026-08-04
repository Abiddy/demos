'use client';

import { Button } from './Button';
import { useInViewAnimation } from './useInViewAnimation';

const BOOK = 'https://halaskastudio.com/./book';

export function PricingSection() {
  const { ref, animClass } = useInViewAnimation();

  return (
    <section ref={ref} className="w-full px-6 py-12" id="pricing">
      <div className="ml-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:justify-end">
        <article
          className={`rounded-[40px] bg-[#051A24] pb-10 pl-10 pr-10 pt-3 text-[#F6FCFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] md:pr-24 ${animClass}`}
          style={{ animationDelay: '0.1s' }}
        >
          <h3 className="text-[22px] font-medium text-[#F6FCFF]">
            Monthly Partnership
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#E0EBF0]">
            A dedicated creative design team.
            <br />
            You work directly with Viktor.
          </p>
          <p className="mt-8 text-2xl text-[#F6FCFF]">$5,000</p>
          <p className="text-sm text-[#E0EBF0]">Monthly</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={BOOK} target="_blank">
              Start a chat
            </Button>
            <Button href={BOOK} variant="secondary" target="_blank">
              How it works
            </Button>
          </div>
        </article>

        <article
          className={`rounded-[40px] bg-white pb-10 pl-10 pr-10 pt-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:pr-24 ${animClass}`}
          style={{ animationDelay: '0.2s' }}
        >
          <h3 className="text-[22px] font-medium text-[#0D212C]">
            Custom Project
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#051A24]/70">
            Fixed scope, fixed timeline.
            <br />
            Same team, same standards.
          </p>
          <p className="mt-8 text-2xl text-[#0D212C]">$5,000</p>
          <p className="text-sm text-[#051A24]/70">Minimum</p>
          <div className="mt-8">
            <Button href={BOOK} variant="tertiary" target="_blank">
              Start a chat
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
