'use client';

import { BookCallButton } from './BookCallButton';
import { navLinks } from '@/data/site';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-nav-panel backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4 sm:px-8">
        <a href="#" className="shrink-0 text-[15px] font-medium text-almost-white">
          Alpha Structural
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="section-label text-[12px] text-steel transition-colors hover:text-almost-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:3232585482"
            className="hidden filled-action px-4 py-2.5 text-[14px] md:inline-flex"
          >
            Log in
          </a>
          <BookCallButton
            label="Book a demo"
            className="px-4 py-2.5 text-[14px]"
          />
        </div>
      </div>
    </header>
  );
}
