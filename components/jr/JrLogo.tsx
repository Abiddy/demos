export function JrLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 22V10h3.2c2.8 0 4.6 1.5 4.6 3.9 0 2.1-1.4 3.5-3.5 3.8L18.5 22H15l-2.8-3.8H12V22H9zm3-6.4h.2c1.2 0 1.9-.6 1.9-1.6s-.7-1.6-1.9-1.6H12v3.2z"
        fill="currentColor"
      />
    </svg>
  );
}
