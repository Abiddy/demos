'use client';

import { Button } from './Button';
import { useInViewAnimation } from './useInViewAnimation';

export function Hero() {
  const { ref, animClass } = useInViewAnimation();

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[440px] px-6 pt-12 text-center md:pt-16"
    >
      <h1
        className={`font-mondwest mb-4 text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${animClass}`}
        style={{ animationDelay: '0.1s' }}
      >
        Viktor Oddy
      </h1>

      <p
        className={`mb-2 font-mono text-xs text-[#051A24] md:text-sm ${animClass}`}
        style={{ animationDelay: '0.2s' }}
      >
        The creative studio of Viktor Oddy
      </p>

      <h2
        className={`mt-1 text-[32px] leading-[1.1] tracking-tight text-[#0D212C] whitespace-nowrap md:text-[40px] lg:text-[44px] ${animClass}`}
        style={{ animationDelay: '0.3s' }}
      >
        Build the <span className="font-mondwest">next wave</span>,
        <br />
        the <span className="font-mondwest">bold way.</span>
      </h2>

      <div
        className={`mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base ${animClass}`}
        style={{ animationDelay: '0.4s' }}
      >
        <p>
          I spent seven years at Apple crafting products used by over a billion
          people. I founded Vortex Studio to bring that same level of thinking
          to innovators shaping what comes next.
        </p>
        <p>
          The studio is deliberately small. I guide the creative vision on every
          project, backed by a veteran design crew that moves fast without
          cutting corners.
        </p>
        <p>Projects start at $5,000 per month.</p>
      </div>

      <div
        className={`mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-6 md:gap-4 ${animClass}`}
        style={{ animationDelay: '0.5s' }}
      >
        <Button href="https://halaskastudio.com/./book" target="_blank">
          Start a chat
        </Button>
        <Button href="#projects" variant="secondary">
          View projects
        </Button>
      </div>
    </section>
  );
}
