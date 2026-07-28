'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BoardingPassCard } from './BoardingPassCard';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="hero-atmosphere relative min-h-screen pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(175,80,255,0.14),transparent_42%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-page items-end gap-10 px-6 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24">
        <div className="max-w-2xl pb-8 lg:pb-0">
          <motion.p
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[14px] font-normal text-almost-white/90"
          >
            Announcing <strong className="font-medium">engineer-led design/build</strong>
          </motion.p>

          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 space-y-1"
          >
            <p className="font-display text-[clamp(2.5rem,7vw,4.5rem)] italic leading-[0.95] tracking-[-0.03em] text-almost-white">
              Foundation repair,
            </p>
            <h1 className="text-[clamp(2.75rem,8vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-almost-white">
              engineered and built
            </h1>
            <p className="font-display text-[clamp(2.5rem,7vw,4.5rem)] italic leading-[0.95] tracking-[-0.03em] text-almost-white">
              in-house.
            </p>
          </motion.div>

          <motion.p
            custom={0.18}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-md text-[20px] font-light leading-[1.45] text-almost-white/75"
          >
            Never subcontract your structural integrity again.
          </motion.p>

          <motion.div custom={0.24} variants={fadeUp} initial="hidden" animate="visible">
            <Link href="#contact" className="demo-arrow mt-10 inline-flex">
              Book a demo
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <BoardingPassCard />
        </motion.div>
      </div>
    </section>
  );
}
