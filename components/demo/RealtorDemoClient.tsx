'use client';

import { useEffect, useState } from 'react';
import { HorizonEstatesPage } from '@/components/realtor/HorizonEstatesPage';
import { horizonConfig, type HorizonConfig } from '@/data/realtor';
import { mergeRealtorConfig } from '@/lib/demo-merge';
import { readDemoPayload } from '@/lib/demo-payload';

export function RealtorDemoClient() {
  const [config, setConfig] = useState<HorizonConfig>(horizonConfig);

  useEffect(() => {
    const payload = readDemoPayload();
    if (payload?.templateId === 'realtor') {
      setConfig(mergeRealtorConfig(payload));
    }
  }, []);

  return (
    <main className="h-[100dvh] overflow-hidden">
      <HorizonEstatesPage config={config} />
    </main>
  );
}
