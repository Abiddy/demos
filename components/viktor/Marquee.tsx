'use client';

import { MARQUEE_IMAGES } from './marqueeImages';

export function Marquee() {
  const images = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section className="mt-16 mb-16 w-full overflow-hidden md:mt-20" aria-hidden>
      <div className="animate-marquee flex w-max flex-row">
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="mx-3 h-[280px] rounded-2xl object-cover shadow-lg md:h-[500px]"
            loading={i < 4 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    </section>
  );
}
