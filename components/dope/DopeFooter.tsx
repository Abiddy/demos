'use client';

import { Accordion } from '@/components/ui/Accordion';
import type { SiteConfig } from '@/types/site-config';

type DopeFooterProps = {
  footer: SiteConfig['footer'];
  brand: string;
};

export function DopeFooter({ footer, brand }: DopeFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#090909] pb-8 pt-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-medium text-white">{brand}</p>
            <p className="mt-4 max-w-xs text-[15px] leading-[1.6] text-[#828384]">
              {footer.tagline}
            </p>
            <a
              href={`tel:${footer.phone}`}
              className="mt-6 inline-block text-[14px] text-white hover:underline"
            >
              Call Us
            </a>
          </div>

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.07em] text-[#828384]">
              about
            </p>
            <ul className="mt-4 space-y-2">
              {footer.links.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[#828384] hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.07em] text-[#828384]">
              compare
            </p>
            <ul className="mt-4 space-y-2">
              {footer.links.compare.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[#828384] hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.07em] text-[#828384]">
              documentation
            </p>
            <ul className="mt-4 space-y-2">
              {footer.links.documentation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[#828384] hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="faq" className="mt-16 border-t border-white/10 pt-16">
          <Accordion items={footer.faqs} />
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#828384]">
            {footer.stamp}
          </p>
          <p className="text-[13px] text-[#828384]">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-[14px] text-[#828384]">
            <span className="text-white">+</span>
            <div>
              <p className="text-white">{footer.footerTag.title}</p>
              <p>{footer.footerTag.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-[14px] text-[#828384]">
            <span>{footer.coords}</span>
            <span className="text-white">♥</span>
          </div>
        </div>

        <p className="mt-8 text-[13px] text-[#828384]">{footer.location}</p>
      </div>
    </footer>
  );
}
