import { SectionHeading } from '@/components/motion/SectionHeading';
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from '@/components/motion/ScrollReveal';
import { foundationCards, services } from '@/data/site';

export function FoundationSection() {
  return (
    <section id="services" className="section-y border-t hairline">
      <div className="mx-auto max-w-page">
        <SectionHeading
          align="center"
          stamp="Foundation Services"
          description="Residential, multi-family, and commercial solutions — engineered and built by one team."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {foundationCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.08}>
              <article className="relative min-h-[320px] overflow-hidden rounded-card border hairline bg-iron-wash p-10">
                <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(175,80,255,0.15),transparent_70%)]" />
                <p className="section-label text-steel">{card.eyebrow}</p>
                <h3 className="mt-6 max-w-sm text-[clamp(1.75rem,3vw,2.25rem)] font-normal leading-[1.1] tracking-[-0.02em] text-almost-white">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-steel">
                  {card.body}
                </p>
                <span className="mt-10 inline-flex rounded-control border hairline px-3 py-1 text-[12px] text-soft-white">
                  {card.accent}
                </span>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollRevealStagger className="mt-4 grid gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <ScrollRevealItem key={service.title}>
              <article className="h-full rounded-card border hairline p-6 transition-colors hover:border-almost-white/20">
                <p className="section-label text-steel">{service.category}</p>
                <h3 className="mt-4 text-[20px] font-normal tracking-[-0.02em] text-almost-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.55] text-steel">
                  {service.body}
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-block text-[14px] text-almost-white underline-offset-4 hover:underline"
                >
                  Learn more
                </a>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
