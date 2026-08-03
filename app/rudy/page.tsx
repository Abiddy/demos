import type { Metadata } from 'next';
import { RudyLanding } from '@/components/rudy/RudyLanding';

export const metadata: Metadata = {
  title: 'Rudy D. Zuniga | Redondo Beach Real Estate — Duvall & Associates',
  description:
    'Rudy D. Zuniga — real estate agent with Duvall & Associates in Redondo Beach. Call (310) 936-1099. 1010 Torrance Blvd Ste A.',
};

export default function RudyPage() {
  return (
    <main>
      <RudyLanding />
    </main>
  );
}
