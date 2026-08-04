'use client';

import { useRef, useState } from 'react';
import { Button } from './Button';
import { MARQUEE_IMAGES } from './marqueeImages';
import { useInViewAnimation } from './useInViewAnimation';

type Spawn = {
  id: number;
  x: number;
  y: number;
  src: string;
  rot: number;
};

export function PartnerSection() {
  const { ref, animClass } = useInViewAnimation();
  const areaRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);
  const [spawns, setSpawns] = useState<Spawn[]>([]);
  const idRef = useRef(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const id = ++idRef.current;
    const src =
      MARQUEE_IMAGES[Math.floor(Math.random() * MARQUEE_IMAGES.length)];
    const rot = Math.random() * 20 - 10;
    const spawn: Spawn = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      src,
      rot,
    };

    setSpawns((prev) => [...prev, spawn]);
    window.setTimeout(() => {
      setSpawns((prev) => prev.filter((s) => s.id !== id));
    }, 1000);
  };

  return (
    <section ref={ref} className="w-full px-6 py-12" id="about">
      <div
        ref={areaRef}
        onMouseMove={handleMove}
        className={`relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white py-48 text-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${animClass}`}
      >
        {spawns.map((s) => (
          <img
            key={s.id}
            src={s.src}
            alt=""
            className="viktor-spawn pointer-events-none absolute h-24 w-24 rounded-xl object-cover shadow-lg"
            style={{
              left: s.x,
              top: s.y,
              ['--spawn-rot' as string]: `${s.rot}deg`,
            }}
          />
        ))}

        <h2 className="font-mondwest relative z-10 mb-12 text-[48px] text-[#0D212C] md:text-[64px] lg:text-[80px]">
          Partner with us
        </h2>

        <div className="relative z-10 flex justify-center">
          <Button
            href="https://halaskastudio.com/./book"
            target="_blank"
            className="gap-3 pl-3"
          >
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120"
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
            Start chat with Viktor
          </Button>
        </div>
      </div>
    </section>
  );
}
