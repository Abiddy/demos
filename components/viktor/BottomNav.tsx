'use client';

import { Button } from './Button';

export function BottomNav() {
  return (
    <div className="viktor-bottom-nav fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white px-8 py-2">
      <span className="font-mondwest text-2xl font-semibold text-[#051A24]">
        V
      </span>
      <Button href="https://halaskastudio.com/./book" target="_blank">
        Start a chat
      </Button>
    </div>
  );
}
