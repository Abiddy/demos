import type { Metadata } from 'next';
import { SpotlightHero } from '@/components/fjc/SpotlightHero';
import { SiteSections } from '@/components/dope/SiteSections';
import { FjcDemoClient } from '@/components/demo/FjcDemoClient';
import { fjcConfig } from '@/data/fjc';

export const metadata: Metadata = {
  title: 'FJC & Company | Water Damage Restoration Hermosa Beach',
  description:
    'Water damage restoration, mold remediation, and emergency services in Hermosa Beach, CA. IICRC certified. Call (310) 343-1263.',
};

type FjcPageProps = {
  searchParams?: { demo?: string };
};

export default function FjcPage({ searchParams }: FjcPageProps) {
  if (searchParams?.demo) {
    return <FjcDemoClient demoId={searchParams.demo} />;
  }

  return (
    <main className="bg-black">
      <SpotlightHero config={fjcConfig} />
      <SiteSections config={fjcConfig} showContactForm />
    </main>
  );
}
