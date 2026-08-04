import type { Metadata } from 'next';
import { VegerieLanding } from '@/components/vegerie/VegerieLanding';

export const metadata: Metadata = {
  title: "lil' Vegerie | Food for Life — Redondo Beach Juices & Bowls",
  description:
    "Cold-pressed juices and plant-forward bowls at 800 S. PCH Ste.6A, Redondo Beach, CA 90277. Order now · catering available.",
};

export default function Route3322Page() {
  return (
    <main>
      <VegerieLanding />
    </main>
  );
}
