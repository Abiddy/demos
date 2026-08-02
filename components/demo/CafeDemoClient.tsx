'use client';

import { useEffect, useState } from 'react';
import { CafeLanding } from '@/components/cafe/CafeLanding';
import { cafeConfig, type CafeConfig } from '@/data/cafe';
import { mergeCafeConfig } from '@/lib/demo-merge';
import { readDemoPayload } from '@/lib/demo-payload';

export function CafeDemoClient() {
  const [config, setConfig] = useState<CafeConfig>(cafeConfig);

  useEffect(() => {
    const payload = readDemoPayload();
    if (payload?.templateId === 'cafe') {
      setConfig(mergeCafeConfig(payload));
    }
  }, []);

  return (
    <main>
      <CafeLanding config={config} />
    </main>
  );
}
