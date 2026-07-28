import Image from 'next/image';

type BrandLogoProps = {
  src: string;
  alt: string;
  className?: string;
  height?: number;
  width?: number;
  monochrome?: boolean;
};

export function BrandLogo({
  src,
  alt,
  className = '',
  height = 28,
  width = 120,
  monochrome = true,
}: BrandLogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`h-7 w-auto max-w-[140px] object-contain opacity-35 transition-opacity duration-300 hover:opacity-70 ${className}`}
      style={
        monochrome
          ? { filter: 'brightness(0) invert(1)' }
          : undefined
      }
    />
  );
}

export function Abc7Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/logos/abc.svg"
      alt="ABC"
      width={48}
      height={48}
      className={`h-12 w-12 object-contain ${className}`}
    />
  );
}

export function Univision34Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 32"
      className={`h-10 w-auto text-fog opacity-50 ${className}`}
      fill="currentColor"
      role="img"
      aria-label="Univision 34"
    >
      <path d="M4 28V4h8c6.4 0 11.2 4.8 11.2 11.2S18.4 26.4 12 26.4H8V28H4zm4-11.2h3.2c2.4 0 4-1.6 4-4s-1.6-4-4-4H8v8zm18.4 11.2V4h4v24h-4zm12 0V4h14v4h-10v6.4h8.8v4H38.4V28h10.4v4H34.4zm24 0l-8-24h4.8l4.8 16.8L54 4h4.8l-8 24h-4.8zm18.4 0V4h14v4h-10v6.4h8.8v4H68.8V28h10.4v4H64.4zm28 0V4h4v24h-4zm12 0V4h14v4h-10v6.4h8.8v4H98.4V28h10.4v4H94.4z" />
      <text
        x="132"
        y="23"
        fontSize="14"
        fontWeight="700"
        fontFamily="Inter, Arial, sans-serif"
      >
        34
      </text>
    </svg>
  );
}
