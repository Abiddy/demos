import { Accordion } from '@/components/ui/Accordion';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { faqs } from '@/data/site';

export function FAQSection() {
  return (
    <section id="faq" className="section-y">
      <div className="mx-auto grid max-w-page gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal>
          <h2 className="stamp-heading !text-[clamp(2rem,5vw,4rem)]">
            Ready To Start
          </h2>
          <p className="mt-8 max-w-md text-[18px] font-light leading-[1.6] text-steel">
            Common questions about inspections, licensing, financing, and our
            service area across Southern California.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Accordion items={faqs} />
        </ScrollReveal>
      </div>
    </section>
  );
}
