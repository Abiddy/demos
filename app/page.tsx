import { SiteHero } from '@/components/SiteHero';
import { DopeSections } from '@/components/dope/DopeSections';
import { alphaConfig } from '@/data/alpha-config';

export default function HomePage() {
  return (
    <main className="bg-black">
      <SiteHero config={alphaConfig} />
      <DopeSections />
    </main>
  );
}
