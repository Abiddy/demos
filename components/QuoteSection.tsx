import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { featuredQuote } from '@/data/site';

export function QuoteSection() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(175,80,255,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-page">
        <ScrollReveal>
          <blockquote className="max-w-4xl">
            <p className="font-display text-[clamp(2rem,4vw,3rem)] italic leading-[1.15] tracking-[-0.03em] text-almost-white">
              &ldquo;{featuredQuote.quote}&rdquo;
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border hairline text-[14px] text-soft-white">
                {featuredQuote.name.charAt(0)}
              </div>
              <div>
                <p className="text-[15px] text-almost-white">{featuredQuote.name}</p>
                <p className="text-[14px] text-steel">{featuredQuote.role}</p>
              </div>
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
