import { services } from '@/data/site';

export function ServicesSection() {
  return (
    <section className="border-t border-graphite px-6 py-20 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-page text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
          Featured services
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
          A strong structural foundation
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[18px] font-light leading-[1.5] text-fog">
          Residential, multi-family, and commercial solutions — engineered and
          built by one team.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-page gap-4 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-card border border-graphite bg-onyx p-6 text-left"
          >
            <p className="text-[13px] font-semibold text-copper">
              {service.category}
            </p>
            <h3 className="mt-3 text-[20px] font-medium tracking-[-0.02em] text-paper-white">
              {service.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.5] text-mist">
              {service.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
