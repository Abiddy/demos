type BookCallButtonProps = {
  label?: string;
  variant?: 'filled' | 'ghost-pill' | 'violet';
  className?: string;
  href?: string;
};

export function BookCallButton({
  label = 'Get Started',
  variant = 'filled',
  className = '',
  href = '#contact',
}: BookCallButtonProps) {
  if (variant === 'ghost-pill') {
    return (
      <a href={href} className={`ghost-pill ${className}`}>
        {label}
      </a>
    );
  }

  if (variant === 'violet') {
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center rounded-btn bg-signal-violet px-4 py-4 text-[16px] font-normal text-almost-white transition-opacity hover:opacity-90 ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <a href={href} className={`filled-action ${className}`}>
      {label}
    </a>
  );
}
