import type { Metadata } from 'next';
import { BoomerangLanding } from '@/components/jr/BoomerangLanding';
import { JrDemoClient } from '@/components/demo/JrDemoClient';

export const metadata: Metadata = {
  title: 'JR Construction | Home Renovations Santa Clarita',
  description:
    'Quality home renovations and construction in Santa Clarita — kitchens, bathrooms, and whole-home projects. Call (818) 625-2609.',
};

type JrPageProps = {
  searchParams?: { demo?: string };
};

export default function JrPage({ searchParams }: JrPageProps) {
  if (searchParams?.demo) {
    return <JrDemoClient demoId={searchParams.demo} />;
  }

  return (
    <main>
      <BoomerangLanding />
    </main>
  );
}
