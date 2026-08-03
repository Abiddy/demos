import type { Metadata } from 'next';
import { HorizonEstatesPage } from '@/components/realtor/HorizonEstatesPage';
import { RealtorDemoClient } from '@/components/demo/RealtorDemoClient';

export const metadata: Metadata = {
  title: 'Horizon Estates',
  description:
    'Where the horizon meets timeless elegance — unparalleled seaside living.',
};

type RealtorPageProps = {
  searchParams?: { demo?: string };
};

export default function RealtorPage({ searchParams }: RealtorPageProps) {
  if (searchParams?.demo) {
    return <RealtorDemoClient demoId={searchParams.demo} />;
  }

  return (
    <main className="h-[100dvh] overflow-hidden">
      <HorizonEstatesPage />
    </main>
  );
}
