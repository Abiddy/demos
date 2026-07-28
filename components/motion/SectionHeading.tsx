import { ScrollReveal } from './ScrollReveal';

type SectionHeadingProps = {
  stamp: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  stamp,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <ScrollReveal className={`max-w-full ${alignClass}`}>
      <h2 className="stamp-heading">{stamp}</h2>
      {description ? (
        <p className="mx-auto mt-8 max-w-2xl text-[18px] font-light leading-[1.55] text-steel">
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
