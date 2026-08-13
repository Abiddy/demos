import type { Metadata } from 'next';
import { KatieLanding } from '@/components/katie/KatieLanding';
import '../katie.css';

export const metadata: Metadata = {
  title: 'Katie Bayliss, Esq. | Bayliss Law — Orange County Attorney & Realtor',
  description:
    'Katie Bayliss, Esq. — California attorney and realtor at Bayliss Law. Real estate, probate, trust, business, injury, and criminal matters in Orange County.',
};

export default function YaniPage() {
  return (
    <main>
      <KatieLanding />
    </main>
  );
}
