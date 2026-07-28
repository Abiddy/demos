import type { SiteConfig } from '@/types/site-config';
import { FeaturedOn } from '@/components/FeaturedOn';
import { CertificationsStrip } from './CertificationsStrip';
import { ComparisonSection } from './ComparisonSection';
import { ContactSection } from './ContactSection';
import { DopeFooter } from './DopeFooter';
import { FeatureAccordionSection } from './FeatureAccordionSection';
import { FeaturesStampSection } from './FeaturesStampSection';
import { PassionSection } from './PassionSection';
import { ProblemSection } from './ProblemSection';
import { StatsSection } from './StatsSection';
import { TrialCTASection } from './TrialCTASection';
import { TrilogySection } from './TrilogySection';

type SiteSectionsProps = {
  config: SiteConfig;
  showMediaMarquee?: boolean;
  showContactForm?: boolean;
};

export function SiteSections({
  config,
  showMediaMarquee = false,
  showContactForm = false,
}: SiteSectionsProps) {
  return (
    <div className="bg-[#090909] text-white">
      <FeatureAccordionSection items={config.featureAccordion} />
      <ProblemSection problem={config.problem} />
      {showMediaMarquee ? (
        <FeaturedOn />
      ) : (
        <CertificationsStrip config={config.certifications} />
      )}
      <FeaturesStampSection features={config.stampedFeatures} />
      <PassionSection passion={config.passion} />
      <StatsSection stats={config.stats} />
      <TrilogySection trilogy={config.trilogy} />
      <ComparisonSection comparisons={config.comparisons} />
      <TrialCTASection
        cta={config.cta}
        sectionId={showContactForm ? undefined : 'contact'}
      />
      {showContactForm ? <ContactSection config={config} /> : null}
      <DopeFooter footer={config.footer} brand={config.brand} />
    </div>
  );
}
