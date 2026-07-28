import { SectionHeading } from '@/components/motion/SectionHeading';
import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from '@/components/motion/ScrollReveal';
import { pillars } from '@/data/site';

export function TrustSection() {
  return (
    <section className="section-y border-y hairline">
      <div className="mx-auto max-w-page">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
          <SectionHeading
            stamp="Secure By Design"
            description="Alpha Structural holds contractor license A-663409 and delivers PE-stamped engineering — the same team from inspection through construction."
          />

          <ScrollRevealStagger className="grid gap-4">
            {pillars.map((item) => (
              <ScrollRevealItem key={item.title}>
                <article className="rounded-card border hairline p-6">
                  <h3 className="text-[17px] font-normal text-almost-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-steel">
                    {item.body}
                  </p>
                </article>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </div>
    </section>
  );
}
