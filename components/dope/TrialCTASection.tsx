import Link from 'next/link';
import type { SiteConfig } from '@/types/site-config';

type TrialCTASectionProps = {
  cta: SiteConfig['cta'];
  sectionId?: string;
};

export function TrialCTASection({ cta, sectionId = 'contact' }: TrialCTASectionProps) {
  return (
    <section
      id={sectionId}
      className="bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-white">
          {cta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[18px] text-[#828384]">
          {cta.subheading}
        </p>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`tel:${cta.phone}`}
            className="rounded-[1584px] bg-white/[0.05] px-8 py-5 text-[15px] text-white transition-colors hover:bg-white/[0.1]"
          >
            Call {cta.phoneDisplay}
          </Link>
          <Link
            href={`mailto:${cta.email}`}
            className="rounded-[1584px] bg-white/[0.05] px-8 py-5 text-[15px] text-white transition-colors hover:bg-white/[0.1]"
          >
            {cta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
