import type { Metadata } from 'next';
import { SpotlightHero } from '@/components/fjc/SpotlightHero';
import { SiteSections } from '@/components/dope/SiteSections';
import { vasqConfig } from '@/data/vasq';

export const metadata: Metadata = {
  title: 'Vasquez Construction Company | Building Quality Spaces — San Diego',
  description:
    'General construction, coatings, and air barrier contractor serving CA, AZ, and NV since 1989. Call (619) 237-3607. CA License 560999.',
};

export default function VasqPage() {
  return (
    <main className="bg-black">
      <SpotlightHero config={vasqConfig} />
      <SiteSections config={vasqConfig} showContactForm />
    </main>
  );
}
