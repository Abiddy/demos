'use client';

import { useMemo } from 'react';
import { HorizonEstatesPage } from '@/components/realtor/HorizonEstatesPage';
import { horizonConfig } from '@/data/realtor';
import { mergeRealtorConfig } from '@/lib/demo-merge';
import { useDemoPayload } from '@/lib/use-demo-payload';

type RealtorDemoClientProps = {
  demoId?: string;
};

export function RealtorDemoClient({ demoId }: RealtorDemoClientProps) {
  const { payload, status } = useDemoPayload(demoId, 'realtor');
  const config = useMemo(
    () => (payload ? mergeRealtorConfig(payload) : horizonConfig),
    [payload],
  );

  if (status === 'loading') {
    return (
      <main className="flex h-[100dvh] items-center justify-center bg-black text-sm text-white/70">
        Loading demo…
      </main>
    );
  }

  return (
    <main className="h-[100dvh] overflow-hidden">
      <HorizonEstatesPage config={config} />
    </main>
  );
}
