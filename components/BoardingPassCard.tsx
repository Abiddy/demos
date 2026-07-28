'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BookCallButton } from './BookCallButton';

export function BoardingPassCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <div
      ref={ref}
      className="flex items-center justify-center [perspective:1200px]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="boarding-pass w-full max-w-md p-10"
      >
        <p className="section-label text-steel">Free Instant Trial</p>

        <div className="mt-8 flex items-center gap-2">
          <span className="text-almost-white">+</span>
          <p className="section-label">Boarding Pass</p>
        </div>

        <p className="mt-6 font-mono text-[13px] tracking-[0.1em] text-steel">
          ORIGIN <span className="text-almost-white">CRACK</span>
          <span className="mx-2">→</span>
          DESTINATION <span className="text-almost-white">SOLID</span>
        </p>

        <h2 className="mt-5 text-[clamp(1.5rem,2.5vw,2rem)] font-normal leading-[1.15] tracking-[-0.02em] text-almost-white">
          Inspection scheduled in days
        </h2>

        <div className="mt-8 flex flex-col gap-1">
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              className="block w-full border-t border-almost-white/10"
              style={{ height: index % 4 === 0 ? 2 : 1 }}
            />
          ))}
        </div>

        <p className="mt-8 text-[14px] text-steel">Deploys on site in minutes</p>

        <div className="mt-6 flex flex-col gap-3">
          <BookCallButton
            label="Request an estimate"
            variant="ghost-pill"
            className="w-full justify-center text-[15px]"
          />
          <BookCallButton
            label="Call (323) 258-5482"
            variant="ghost-pill"
            href="tel:3232585482"
            className="w-full justify-center text-[15px]"
          />
        </div>
      </motion.div>
    </div>
  );
}
