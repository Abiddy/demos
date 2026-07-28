import type { Metadata } from 'next';
import { HorizonEstatesPage } from '@/components/realtor/HorizonEstatesPage';

export const metadata: Metadata = {
  title: 'Horizon Estates',
  description:
    'Where the horizon meets timeless elegance — unparalleled seaside living.',
};

export default function RealtorPage() {
  return (
    <main className="h-[100dvh] overflow-hidden">
      <HorizonEstatesPage />
    </main>
  );
}
