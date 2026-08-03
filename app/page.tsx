import type { Metadata } from 'next';
import { HomeMineLanding } from '@/components/realtor2/HomeMineLanding';
import './realtor2/velar.css';

export const metadata: Metadata = {
  title: 'HomeMine | Chris Jones, Realtor — Sell for Just 1.5%',
  description:
    'Get the best price for your home with HomeMine. Sell with Chris Jones, Realtor, for a 1.5% listing fee. Call or text (310) 658-7060.',
};

export default function HomePage() {
  return (
    <main>
      <HomeMineLanding />
    </main>
  );
}
