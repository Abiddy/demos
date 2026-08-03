import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HomeMine | Chris Jones, Realtor — Sell for Just 1.5%',
  description:
    'Get the best price for your home with HomeMine. Sell with Chris Jones, Realtor, for a 1.5% listing fee. Call or text (310) 658-7060.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
