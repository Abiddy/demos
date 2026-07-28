import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alpha Structural | Foundation Repair Los Angeles',
  description:
    'The most trusted structural specialist and foundation repair contractor in Los Angeles and Southern California since 1993.',
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
