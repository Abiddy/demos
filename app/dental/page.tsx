import type { Metadata } from 'next';
import { DentalLanding } from '@/components/dental/DentalLanding';

export const metadata: Metadata = {
  title: 'All Care Dental | Torrance, CA Dentist',
  description:
    'All Care Dental in Torrance — cosmetic dentistry, general dentistry, oral surgery, periodontics, implants, and smile makeovers. Call (310) 371-0113.',
};

export default function DentalPage() {
  return (
    <main>
      <DentalLanding />
    </main>
  );
}
