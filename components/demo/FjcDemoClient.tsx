'use client';

import { useMemo } from 'react';
import { SpotlightHero } from '@/components/fjc/SpotlightHero';
import { SiteSections } from '@/components/dope/SiteSections';
import { fjcConfig } from '@/data/fjc';
import { mergeFjcConfig } from '@/lib/demo-merge';
import { useDemoPayload } from '@/lib/use-demo-payload';

type FjcDemoClientProps = {
  demoId?: string;
};

export function FjcDemoClient({ demoId }: FjcDemoClientProps) {
  const { payload, status } = useDemoPayload(demoId, 'construction');
  const config = useMemo(
    () => (payload ? mergeFjcConfig(payload) : fjcConfig),
    [payload],
  );

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-sm text-white/70">
        Loading demo…
      </main>
    );
  }

  return (
    <main className="bg-black">
      <SpotlightHero config={config} />
      <SiteSections config={config} showContactForm />
    </main>
  );
}
