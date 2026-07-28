'use client';

import { useEffect, useState } from 'react';

export function useFadeIn(delay: number) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return visible;
}
