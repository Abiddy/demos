import type { Metadata } from 'next';
import { DemoGenerator } from '@/components/demo/DemoGenerator';

export const metadata: Metadata = {
  title: 'Demo Studio | Template Generator',
  description:
    'Generate lightweight template demos for Realtor and Construction sites — no database required.',
};

export default function TemplatesPage() {
  return <DemoGenerator />;
}
