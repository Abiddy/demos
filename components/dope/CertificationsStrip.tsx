import type { SiteConfig } from '@/types/site-config';

type CertificationsStripProps = {
  config: SiteConfig['certifications'];
};

export function CertificationsStrip({ config }: CertificationsStripProps) {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#090909] py-10 sm:py-12">
      <p className="mb-8 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-[#828384]">
        {config.label}
      </p>
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-4 px-6 md:px-12">
        {config.items.map((item) => (
          <span
            key={item}
            className="rounded-[1584px] border border-white/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#f0f0f0]"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
