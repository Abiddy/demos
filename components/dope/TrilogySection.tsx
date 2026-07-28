import Link from 'next/link';
import type { SiteConfig } from '@/types/site-config';

type TrilogySectionProps = {
  trilogy: SiteConfig['trilogy'];
};

export function TrilogySection({ trilogy }: TrilogySectionProps) {
  return (
    <section className="bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-white">
          {trilogy.heading}
        </h2>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {trilogy.items.map((item, index) => (
            <article
              key={item.title}
              className={`flex min-h-[360px] flex-col justify-between rounded-[19.2px] border border-white/10 p-10 ${
                index === 0 ? 'border-transparent bg-[#af50ff]' : ''
              }`}
            >
              <div>
                <p
                  className={`font-mono text-[12px] uppercase tracking-[0.07em] ${
                    index === 0 ? 'text-[#e1bdff]' : 'text-[#828384]'
                  }`}
                >
                  {item.tag}
                </p>
                <h3 className="mt-6 text-[22px] font-normal leading-[1.2] tracking-[-0.02em] text-white">
                  {item.title}
                </h3>
                <p
                  className={`mt-4 text-[15px] leading-[1.6] ${
                    index === 0 ? 'text-[#e1bdff]/90' : 'text-[#828384]'
                  }`}
                >
                  {item.body}
                </p>
              </div>
              <Link
                href={item.href}
                className="mt-8 inline-flex text-[15px] text-white underline-offset-4 hover:underline"
              >
                {item.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
