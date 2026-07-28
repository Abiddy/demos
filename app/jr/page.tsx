import type { Metadata } from 'next';
import { BoomerangLanding } from '@/components/jr/BoomerangLanding';

export const metadata: Metadata = {
  title: 'JR Construction | Home Renovations Santa Clarita',
  description:
    'Quality home renovations and construction in Santa Clarita — kitchens, bathrooms, and whole-home projects. Call (818) 625-2609.',
};

export default function JrPage() {
  return (
    <main>
      <BoomerangLanding />
    </main>
  );
}
