import { Abc7Logo, BrandLogo } from '@/components/logos/BrandLogo';
import { mediaFeatures } from '@/data/site';

function LogoItem({ brand }: { brand: (typeof mediaFeatures)[number] }) {
  if (brand.name === 'ABC 7') {
    return (
      <div className="flex shrink-0 items-center gap-2 opacity-40">
        <Abc7Logo className="!h-14 !w-14" />
        <span className="text-[32px] font-bold text-white">7</span>
      </div>
    );
  }

  return (
    <BrandLogo
      src={brand.logo}
      alt={brand.name}
      width={brand.width * 1.6}
      height={brand.height * 1.6}
      className="!h-12 !max-w-[200px] shrink-0"
    />
  );
}

function LogoSet({
  idPrefix,
  hidden = false,
}: {
  idPrefix: string;
  hidden?: boolean;
}) {
  return (
    <div className="logo-marquee-set" aria-hidden={hidden || undefined}>
      {mediaFeatures.map((brand) => (
        <LogoItem key={`${idPrefix}-${brand.name}`} brand={brand} />
      ))}
    </div>
  );
}

const MARQUEE_COPIES = 6;

export function FeaturedOn() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#090909] py-10 sm:py-12">
      <p className="mb-8 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-[#828384]">
        Featured on national media
      </p>
      <div className="logo-marquee-ltr">
        <div
          className="logo-marquee-track"
          style={{ ['--marquee-copies' as string]: MARQUEE_COPIES }}
        >
          {Array.from({ length: MARQUEE_COPIES }, (_, index) => (
            <LogoSet
              key={`set-${index}`}
              idPrefix={`set-${index}`}
              hidden={index > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
