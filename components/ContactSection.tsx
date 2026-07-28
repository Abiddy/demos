import { BookCallButton } from './BookCallButton';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function ContactSection() {
  return (
    <section id="contact" className="section-y border-t hairline">
      <div className="mx-auto grid max-w-page gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <ScrollReveal>
          <h2 className="stamp-heading !text-[clamp(2rem,5vw,3.5rem)]">
            Contact Us
          </h2>
          <p className="mt-8 max-w-lg text-[18px] font-light leading-[1.6] text-steel">
            Call to schedule an inspection or request an estimate. Financing
            available through GreenSky.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="boarding-pass p-10">
            <div className="space-y-6">
              <div>
                <p className="section-label text-steel">Phone</p>
                <a
                  href="tel:3232585482"
                  className="mt-2 block text-[22px] font-normal text-almost-white transition-colors hover:text-lavender-mist"
                >
                  (323) 258-5482
                </a>
              </div>
              <div>
                <p className="section-label text-steel">Address</p>
                <p className="mt-2 text-[16px] leading-relaxed text-almost-white/85">
                  8334 Foothill Blvd.
                  <br />
                  Sunland, CA 91040
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="section-label text-steel">Hours</p>
                  <p className="mt-2 text-[16px] text-almost-white/85">
                    Mon–Fri · 9am–6pm
                  </p>
                </div>
                <div>
                  <p className="section-label text-steel">License</p>
                  <p className="mt-2 text-[16px] text-almost-white/85">
                    A-663409
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookCallButton label="Request an Estimate" />
              <BookCallButton
                label="Call now"
                variant="ghost-pill"
                href="tel:3232585482"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
