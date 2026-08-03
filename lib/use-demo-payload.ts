'use client';

import { useEffect, useState } from 'react';
import {
  readDemoPayload,
  type DemoPayload,
  type DemoTemplateId,
} from '@/lib/demo-payload';

type DemoLoadState = 'loading' | 'ready' | 'missing';

export function useDemoPayload(
  demoId: string | undefined,
  expectedTemplate: DemoTemplateId,
) {
  const [payload, setPayload] = useState<DemoPayload | null>(null);
  const [status, setStatus] = useState<DemoLoadState>('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (demoId && demoId !== '1') {
        try {
          const res = await fetch(`/api/demo/${demoId}`);
          if (res.ok) {
            const data = (await res.json()) as DemoPayload;
            if (!cancelled && data.templateId === expectedTemplate) {
              setPayload(data);
              setStatus('ready');
              return;
            }
          }
        } catch {
          // fall through to local storage
        }
      }

      const local = readDemoPayload();
      if (!cancelled && local?.templateId === expectedTemplate) {
        setPayload(local);
        setStatus('ready');
        return;
      }

      if (!cancelled) {
        setPayload(null);
        setStatus('missing');
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [demoId, expectedTemplate]);

  return { payload, status };
}
