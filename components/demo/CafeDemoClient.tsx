'use client';

import { useMemo } from 'react';
import { CafeLanding } from '@/components/cafe/CafeLanding';
import { cafeConfig } from '@/data/cafe';
import { mergeCafeConfig } from '@/lib/demo-merge';
import { useDemoPayload } from '@/lib/use-demo-payload';

type CafeDemoClientProps = {
  demoId?: string;
};

export function CafeDemoClient({ demoId }: CafeDemoClientProps) {
  const { payload, status } = useDemoPayload(demoId, 'cafe');
  const config = useMemo(
    () => (payload ? mergeCafeConfig(payload) : cafeConfig),
    [payload],
  );

  return (
    <main>
      {status === 'loading' ? (
        <div className="cafe-page flex min-h-screen items-center justify-center text-sm tracking-wide">
          Loading demo…
        </div>
      ) : (
        <CafeLanding config={config} />
      )}
    </main>
  );
}
