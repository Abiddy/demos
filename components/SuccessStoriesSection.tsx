import Image from 'next/image';
import { SectionHeading } from '@/components/motion/SectionHeading';
import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from '@/components/motion/ScrollReveal';
import { successStories } from '@/data/site';

export function SuccessStoriesSection() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-page">
        <SectionHeading stamp="Success Stories" />

        <ScrollRevealStagger className="mt-16 grid gap-4 md:grid-cols-3">
          {successStories.map((story) => (
            <ScrollRevealItem key={story.title}>
              <article className="group relative min-h-[380px] overflow-hidden rounded-card">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="section-label text-steel">{story.location}</p>
                  <h3 className="mt-3 text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-almost-white">
                    {story.title}
                  </h3>
                  <p className="mt-5 text-[14px] text-steel transition-colors group-hover:text-almost-white">
                    View project →
                  </p>
                </div>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
