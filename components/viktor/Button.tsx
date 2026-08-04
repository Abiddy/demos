import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

const variantClass: Record<Variant, string> = {
  primary:
    'viktor-btn-primary bg-[#051A24] text-white hover:opacity-95',
  secondary:
    'viktor-btn-secondary bg-white text-[#051A24] hover:opacity-90',
  tertiary:
    'viktor-btn-tertiary bg-white text-[#051A24] hover:opacity-90',
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children' | 'className'>;

export function Button({
  variant = 'primary',
  href = '#',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition',
    variantClass[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
