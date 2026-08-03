import type { Metadata } from 'next';
import { LesliLanding } from '@/components/lesli/LesliLanding';

export const metadata: Metadata = {
  title: 'Lesli Koontz | South Bay Real Estate — Redondo Beach',
  description:
    'Lesli Koontz Real Estate | Scott Anastasi Realty. Helping buyers and sellers find their happy place in the South Bay. Call (310) 722-5194.',
};

export default function LesliPage() {
  return (
    <main>
      <LesliLanding />
    </main>
  );
}
