import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from '@/components/motion/ScrollReveal';
import { featureRows } from '@/data/site';

export function FeaturesListSection() {
  return (
    <section id="why-alpha" className="section-y">
      <div className="mx-auto max-w-page">
        {featureRows.map((row, index) => (
          <ScrollReveal
            key={row.title}
            className={`grid gap-8 py-14 lg:grid-cols-2 lg:items-start lg:gap-20 ${
              index > 0 ? 'border-t hairline' : 'border-y hairline'
            }`}
          >
            <h2 className="stamp-heading !text-[clamp(1.5rem,4vw,3rem)]">
              {row.title.replace(/\s+/g, ' ')}
            </h2>
            <div>
              <p className="text-[18px] leading-[1.6] text-steel">{row.body}</p>
              <ScrollRevealStagger className="mt-8 space-y-4">
                {row.items.map((item) => (
                  <ScrollRevealItem
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-almost-white"
                  >
                    <span className="mt-2 font-mono text-[12px] text-signal-violet">
                      +
                    </span>
                    {item}
                  </ScrollRevealItem>
                ))}
              </ScrollRevealStagger>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
