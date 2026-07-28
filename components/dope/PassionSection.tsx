import type { SiteConfig } from '@/types/site-config';

type PassionSectionProps = {
  passion: SiteConfig['passion'];
};

export function PassionSection({ passion }: PassionSectionProps) {
  return (
    <section className="overflow-hidden bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="stamp-feature-block">
          <p className="stamp-feature-ghost" aria-hidden>
            {passion.stamp} {passion.stamp}
          </p>
          <h2 className="stamp-feature-title max-w-4xl leading-[0.95]">
            {passion.stamp}
          </h2>
        </div>

        <p className="mt-16 max-w-2xl text-[clamp(1.25rem,2.5vw,1.75rem)] font-light leading-[1.3] tracking-[-0.02em] text-[#828384]">
          {passion.body}
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          {passion.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-[1584px] border border-white/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#f0f0f0]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
