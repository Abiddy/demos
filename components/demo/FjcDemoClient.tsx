'use client';

import { useEffect, useState } from 'react';
import { SpotlightHero } from '@/components/fjc/SpotlightHero';
import { SiteSections } from '@/components/dope/SiteSections';
import { fjcConfig } from '@/data/fjc';
import { mergeFjcConfig } from '@/lib/demo-merge';
import { readDemoPayload } from '@/lib/demo-payload';
import type { SiteConfig } from '@/types/site-config';

export function FjcDemoClient() {
  const [config, setConfig] = useState<SiteConfig>(fjcConfig);

  useEffect(() => {
    const payload = readDemoPayload();
    if (payload?.templateId === 'construction') {
      setConfig(mergeFjcConfig(payload));
    }
  }, []);

  return (
    <main className="bg-black">
      <SpotlightHero config={config} />
      <SiteSections config={config} showContactForm />
    </main>
  );
}
