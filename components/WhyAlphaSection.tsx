import { pillars } from '@/data/site';

export function WhyAlphaSection() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-page text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
          Why Alpha Structural
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
          Trusted by property owners across Southern California
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-page gap-4 lg:grid-cols-3">
        {pillars.map((item) => (
          <article
            key={item.title}
            className="rounded-card border border-graphite bg-onyx p-6 text-left"
          >
            <h3 className="text-[20px] font-medium text-paper-white">
              {item.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.5] text-mist">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
