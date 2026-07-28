import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from '@/components/motion/ScrollReveal';
import { stats } from '@/data/site';

export function StatsSection() {
  return (
    <section className="border-y hairline">
      <ScrollRevealStagger className="mx-auto grid max-w-page gap-10 px-6 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {stats.map((stat, index) => (
          <ScrollRevealItem
            key={stat.label}
            className={`text-left lg:px-8 ${
              index < stats.length - 1 ? 'lg:border-r hairline' : ''
            }`}
          >
            <p className="text-[clamp(2rem,4vw,3rem)] font-light leading-none tracking-[-0.04em] text-almost-white">
              {stat.value}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-steel">
              {stat.label}
            </p>
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </section>
  );
}
