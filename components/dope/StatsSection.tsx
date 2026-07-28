import type { Stat } from '@/types/site-config';

type StatsSectionProps = {
  stats: Stat[];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="border-y border-white/10 bg-[#090909] px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map((item) => (
          <div key={item.label}>
            <p className="text-[clamp(2rem,4vw,2.75rem)] font-light tracking-[-0.03em] text-white">
              {item.value}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#828384]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
