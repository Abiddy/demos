import type { Metadata } from 'next';
import { YaniLanding } from '@/components/yani/YaniLanding';

export const metadata: Metadata = {
  title: 'Yoni Rios | Foreclosures, Probate & Buying/Selling Homes',
  description:
    'Yoni Rios — real estate professional specializing in foreclosures, probate, and buying & selling houses. Connect on Instagram @yonirios07.',
};

export default function YaniPage() {
  return (
    <main>
      <YaniLanding />
    </main>
  );
}
