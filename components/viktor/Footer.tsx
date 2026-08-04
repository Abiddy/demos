'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  return (
    <footer
      id="services"
      className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between"
    >
      <Button href="https://halaskastudio.com/./book" target="_blank">
        Start a chat
      </Button>

      <div className="flex gap-10">
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#051A24]" />
        <div className="flex gap-16">
          <ul className="space-y-3">
            <li>
              <a
                href="#services"
                className="text-base text-[#051A24] transition hover:opacity-70"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-base text-[#051A24] transition hover:opacity-70"
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-base text-[#051A24] transition hover:opacity-70"
              >
                About
              </a>
            </li>
          </ul>
          <ul className="space-y-3">
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-base text-[#051A24] transition hover:opacity-70"
              >
                x.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-base text-[#051A24] transition hover:opacity-70"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
