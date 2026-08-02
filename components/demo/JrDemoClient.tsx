'use client';

import { useEffect, useState } from 'react';
import { BoomerangLanding } from '@/components/jr/BoomerangLanding';
import { jrLandingConfig, type JrLandingConfig } from '@/data/jr';
import { mergeJrConfig } from '@/lib/demo-merge';
import { readDemoPayload } from '@/lib/demo-payload';

export function JrDemoClient() {
  const [config, setConfig] = useState<JrLandingConfig>(jrLandingConfig);

  useEffect(() => {
    const payload = readDemoPayload();
    if (payload?.templateId === 'construction-2') {
      setConfig(mergeJrConfig(payload));
    }
  }, []);

  return (
    <main>
      <BoomerangLanding config={config} />
    </main>
  );
}
