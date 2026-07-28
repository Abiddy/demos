import { BookCallButton } from './BookCallButton';
import { SectionHeading } from '@/components/motion/SectionHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { plans } from '@/data/site';

export function PlansSection() {
  return (
    <section className="section-y border-t hairline">
      <div className="mx-auto max-w-page">
        <SectionHeading
          align="center"
          stamp="Get Started"
          description="Choose a path that scales with your property."
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.1}>
              <article
                className={`h-full rounded-card border p-10 ${
                  plan.highlighted
                    ? 'violet-bloom border-transparent'
                    : 'hairline bg-iron-wash'
                }`}
              >
                <p
                  className={`section-label ${
                    plan.highlighted ? 'text-lavender-mist/80' : 'text-steel'
                  }`}
                >
                  {plan.name}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-none tracking-[-0.04em] ${
                      plan.highlighted ? 'text-almost-white' : 'text-almost-white'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-[15px] ${
                      plan.highlighted ? 'text-lavender-mist/80' : 'text-steel'
                    }`}
                  >
                    {plan.priceNote}
                  </span>
                </div>

                <ul
                  className={`mt-8 space-y-3 border-t pt-8 ${
                    plan.highlighted
                      ? 'border-almost-white/20'
                      : 'hairline'
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 text-[15px] ${
                        plan.highlighted
                          ? 'text-lavender-mist/95'
                          : 'text-almost-white/85'
                      }`}
                    >
                      <span className="font-mono text-[12px] text-almost-white">
                        +
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  {plan.highlighted ? (
                    <BookCallButton
                      label={plan.cta}
                      variant="filled"
                      className="border-almost-white/30 bg-near-black/20"
                    />
                  ) : (
                    <BookCallButton label={plan.cta} variant="ghost-pill" />
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
