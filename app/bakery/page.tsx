import type { Metadata } from 'next';
import { BakeryLanding } from '@/components/bakery/BakeryLanding';

export const metadata: Metadata = {
  title: 'Bakery Facilities | The Smart Bakery Solution for Professionals',
  description:
    'Premium B2B bakery solutions for foodservice professionals across Asia — European craft, reliable logistics, and culinary expertise.',
};

export default function BakeryPage() {
  return (
    <main>
      <BakeryLanding />
    </main>
  );
}
