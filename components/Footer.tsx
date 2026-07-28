'use client';

import { Accordion } from '@/components/ui/Accordion';
import { faqs, footerLinks } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t hairline pb-8 pt-16">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-medium text-almost-white">
              Alpha Structural
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-[1.6] text-steel">
              It&apos;s not that we&apos;re mad at yesterday&apos;s contractors.
              Just disappointed. So we made it better. We made it easier.
              <br />
              <br />
              We made it Alpha.
            </p>
            <a
              href="tel:3232585482"
              className="mt-6 inline-block text-[14px] text-almost-white hover:underline"
            >
              Call Us
            </a>
          </div>

          <div>
            <p className="section-label text-steel">about</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-steel hover:text-almost-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label text-steel">compare</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.compare.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-steel hover:text-almost-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label text-steel">documentation</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.documentation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-steel hover:text-almost-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="faq" className="mt-16 border-t hairline pt-16">
          <Accordion items={faqs} />
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-steel">
            [ ALPHA.FOOTER ]
          </p>
          <p className="text-[13px] text-steel">
            © {new Date().getFullYear()} Alpha Structural, Inc.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-[14px] text-steel">
            <span className="text-almost-white">+</span>
            <div>
              <p className="text-almost-white">Engineer-Led Design/Build</p>
              <p>Foundation & Structural Repair</p>
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-[14px] text-steel">
            <span>34.2591° N, 118.3020° W</span>
            <span className="text-almost-white">♥</span>
          </div>
        </div>

        <p className="mt-8 text-[13px] text-steel">
          Made with ♥ in Sunland, California
        </p>
      </div>
    </footer>
  );
}
