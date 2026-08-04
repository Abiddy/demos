import type { Metadata } from 'next';
import { WildflowerLanding } from '@/components/wildflower/WildflowerLanding';

export const metadata: Metadata = {
  title: 'Wildflower Cafe | Breakfast & Lunch — Redondo Beach',
  description:
    'Artful counter-serve American cafe for breakfast & lunch with coffee, beer & indoor/outdoor seats. 600 S Pacific Coast Hwy, Redondo Beach, CA 90277.',
};

export default function WildflowerPage() {
  return (
    <main>
      <WildflowerLanding />
    </main>
  );
}
