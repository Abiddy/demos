import type { Metadata } from 'next';
import './viktor.css';

export const metadata: Metadata = {
  title: 'Viktor Oddy | Creative Design Studio',
  description:
    'The creative studio of Viktor Oddy. Build the next wave, the bold way. Projects start at $5,000 per month.',
  other: {
    'theme-color': '#ffffff',
  },
};

export default function VasqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://assets.website-files.com"
        crossOrigin="anonymous"
      />
      {children}
    </>
  );
}
