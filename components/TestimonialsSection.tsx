import { testimonials } from '@/data/site';

export function TestimonialsSection() {
  return (
    <section className="border-t border-graphite px-6 py-20 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-page text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
          Testimonials
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
          What clients say
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-page gap-4 lg:grid-cols-2">
        {testimonials.map((item) => (
          <blockquote
            key={item.quote}
            className="rounded-card border border-graphite bg-onyx p-8 text-left"
          >
            <p className="text-[18px] leading-[1.5] text-bone">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="text-[15px] font-medium text-paper-white">
                {item.name}
              </p>
              <p className="text-[14px] text-fog">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
