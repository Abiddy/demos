import type { Metadata } from 'next';
import { NummyLanding } from '@/components/nummy/NummyLanding';

export const metadata: Metadata = {
  title: 'Nummy Yummy | Taiyaki Ice Cream & Soft-Serve in Fresno',
  description:
    'Casual cultural dessert spot serving taiyaki ice cream, soft-serve and sweet treats. 6648 N Cedar Ave, Fresno, CA. Call (559) 914-1284.',
};

export default function NummyPage() {
  return (
    <main>
      <NummyLanding />
    </main>
  );
}
