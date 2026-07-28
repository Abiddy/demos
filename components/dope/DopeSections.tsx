import { alphaConfig } from '@/data/alpha-config';
import { SiteSections } from './SiteSections';

export function DopeSections() {
  return <SiteSections config={alphaConfig} showMediaMarquee />;
}
