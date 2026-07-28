import Link from 'next/link';

type FeaturesStampSectionProps = {
  features: string[];
};

export function FeaturesStampSection({ features }: FeaturesStampSectionProps) {
  return (
    <section id="services" className="bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.07em] text-[#828384]">
            Features
          </p>
          <Link
            href="#contact"
            className="text-[14px] text-white underline-offset-4 hover:underline"
          >
            read_more
          </Link>
        </div>

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
          {features.map((feature) => (
            <div key={feature} className="stamp-feature-block overflow-hidden">
              <p className="stamp-feature-ghost" aria-hidden>
                {feature} {feature}
              </p>
              <h2 className="stamp-feature-title">{feature}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
