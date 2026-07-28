import { SectionHeading } from '@/components/motion/SectionHeading';
import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from '@/components/motion/ScrollReveal';
import { tools } from '@/data/site';

export function ToolsGridSection() {
  return (
    <section className="section-y border-t hairline">
      <div className="mx-auto max-w-page">
        <SectionHeading stamp="Capabilities" />

        <ScrollRevealStagger className="mt-16 grid gap-px overflow-hidden rounded-card border hairline bg-almost-white/10 md:grid-cols-2">
          {tools.map((tool) => (
            <ScrollRevealItem key={tool.title}>
              <article
                className={`h-full bg-near-black p-8 ${
                  tool.wide ? 'md:col-span-2' : ''
                }`}
              >
                <h3 className="text-[18px] font-normal tracking-[-0.02em] text-almost-white">
                  {tool.title}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-steel">
                  {tool.body}
                </p>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
