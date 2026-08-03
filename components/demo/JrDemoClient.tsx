'use client';

import { useMemo } from 'react';
import { BoomerangLanding } from '@/components/jr/BoomerangLanding';
import { jrLandingConfig } from '@/data/jr';
import { mergeJrConfig } from '@/lib/demo-merge';
import { useDemoPayload } from '@/lib/use-demo-payload';

type JrDemoClientProps = {
  demoId?: string;
};

export function JrDemoClient({ demoId }: JrDemoClientProps) {
  const { payload, status } = useDemoPayload(demoId, 'construction-2');
  const config = useMemo(
    () => (payload ? mergeJrConfig(payload) : jrLandingConfig),
    [payload],
  );

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-sm text-black/60">
        Loading demo…
      </main>
    );
  }

  return (
    <main>
      <BoomerangLanding config={config} />
    </main>
  );
}
