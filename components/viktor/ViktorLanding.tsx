'use client';

import { BottomNav } from './BottomNav';
import { CopyrightBar } from './CopyrightBar';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Marquee } from './Marquee';
import { PartnerSection } from './PartnerSection';
import { PricingSection } from './PricingSection';
import { ProjectsSection } from './ProjectsSection';
import { TestimonialCarousel } from './TestimonialCarousel';
import { TestimonialSection } from './TestimonialSection';

export function ViktorLanding() {
  return (
    <div className="viktor-page min-h-screen pb-28">
      <Hero />
      <Marquee />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </div>
  );
}
