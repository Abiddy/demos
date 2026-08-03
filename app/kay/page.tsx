import type { Metadata } from 'next';
import { KayLanding } from '@/components/kay/KayLanding';

export const metadata: Metadata = {
  title: 'Kay Corken | Kay Real Estate — Parker, Colorado Broker',
  description:
    'Kay Corken, Broker/Owner of Kay Real Estate. Serving Colorado residential & commercial real estate since 1993. Call (303) 888-1302.',
};

export default function KayPage() {
  return (
    <main>
      <KayLanding />
    </main>
  );
}
