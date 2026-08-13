import type { Metadata } from 'next';
import { GoEbikesLanding } from '@/components/ebikes/GoEbikesLanding';

export const metadata: Metadata = {
  title: 'Go Ebikes | Electric Bikes & Rentals in Torrance',
  description:
    'Go Ebikes in Torrance — hub motor and mid-drive electric bikes, beach-city rentals, skateboards, free assembly, and LA/OC delivery. Call (530) 429-2410.',
};

export default function GoEbikesPage() {
  return (
    <main>
      <GoEbikesLanding />
    </main>
  );
}
