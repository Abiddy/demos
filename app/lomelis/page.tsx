import type { Metadata } from 'next';
import { LomelisLanding } from '@/components/lomelis/LomelisLanding';

export const metadata: Metadata = {
  title: "Lomeli's Italian Restaurant | Pizzas, Pastas & Red-Sauce Classics",
  description:
    "Crafted with love since 1978 in Gardena, CA. Pizzas, pastas & Italian classics. Order online or call (310) 323-7993. 2223 W Redondo Beach Blvd.",
};

export default function LomelisPage() {
  return (
    <main>
      <LomelisLanding />
    </main>
  );
}
