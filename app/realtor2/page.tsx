import type { Metadata } from 'next';
import { VelarLanding } from '@/components/realtor2/VelarLanding';

export const metadata: Metadata = {
  title: 'Velar. | Live in Irreplaceable',
  description:
    'Stately homes built with vision, scope, and architectural finesse.',
};

export default function Realtor2Page() {
  return (
    <main>
      <VelarLanding />
    </main>
  );
}
