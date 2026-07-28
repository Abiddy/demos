'use client';

import type { SiteConfig } from '@/types/site-config';

type ContactSectionProps = {
  config: SiteConfig;
};

export function ContactSection({ config }: ContactSectionProps) {
  const { contact, cta } = config;

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-[#090909] px-6 py-24 md:px-12 lg:px-16 lg:py-[120px]"
    >
      <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#af50ff]">
            Find Us
          </h2>
          <div className="mt-6 overflow-hidden rounded-[19.2px] border border-white/10">
            <iframe
              title={`Map of ${contact.address}`}
              src={`https://maps.google.com/maps?q=${contact.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="h-[320px] w-full grayscale invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-8 space-y-2">
            <a
              href={`tel:${cta.phone}`}
              className="block text-[18px] font-medium text-white hover:underline"
            >
              {cta.phoneDisplay}
            </a>
            <a
              href={`mailto:${cta.email}`}
              className="block text-[15px] text-[#828384] hover:text-white hover:underline"
            >
              {cta.email}
            </a>
            <p className="text-[15px] text-[#828384]">{contact.address}</p>
          </div>
        </div>

        <div>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#af50ff]">
            Contact Us
          </h2>
          <form
            className="mt-6 space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            {['Name', 'Email', 'Phone Number'].map((label) => (
              <div key={label}>
                <label className="sr-only" htmlFor={label}>
                  {label}
                </label>
                <input
                  id={label}
                  type={label === 'Email' ? 'email' : 'text'}
                  placeholder={label}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-[#828384] outline-none transition-colors focus:border-white/50"
                />
              </div>
            ))}
            <div>
              <label className="sr-only" htmlFor="service">
                Service
              </label>
              <select
                id="service"
                className="w-full border-b border-white/20 bg-transparent py-3 text-[15px] text-[#828384] outline-none transition-colors focus:border-white/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Service
                </option>
                {config.featureAccordion.slice(0, 4).map((item) => (
                  <option key={item.label} value={item.label} className="bg-[#090909]">
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="sr-only" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Message"
                className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-[#828384] outline-none transition-colors focus:border-white/50"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[1584px] bg-white/[0.05] py-4 text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/[0.1]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
