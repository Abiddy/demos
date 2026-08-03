import type { Metadata } from 'next';
import { CafeLanding } from '@/components/cafe/CafeLanding';
import { CafeDemoClient } from '@/components/demo/CafeDemoClient';

export const metadata: Metadata = {
  title: 'Little Roast | Specialty Coffee',
  description:
    'Specialty coffee roasted and served with chill vibes — tasty cups for the neighborhood and beyond.',
};

type CafePageProps = {
  searchParams?: { demo?: string };
};

export default function CafePage({ searchParams }: CafePageProps) {
  if (searchParams?.demo) {
    return <CafeDemoClient demoId={searchParams.demo} />;
  }

  return (
    <main>
      <CafeLanding />
    </main>
  );
}
