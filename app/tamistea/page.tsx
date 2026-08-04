import type { Metadata } from 'next';
import { TamisteaLanding } from '@/components/tamistea/TamisteaLanding';

export const metadata: Metadata = {
  title: 'tamistea | Bakery Cafe & Coffee Shop — Torrance',
  description:
    'Bakery cafe & coffee shop in Torrance Village. Matcha, pastries, and coffee at 3535 Torrance Blvd, Torrance, CA 90503. Dine-in & takeout. Closes at 5 PM.',
};

export default function TamisteaPage() {
  return (
    <main>
      <TamisteaLanding />
    </main>
  );
}
