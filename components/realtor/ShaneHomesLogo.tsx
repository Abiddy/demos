export function ShaneHomesLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`shane-homes-logo ${className}`} aria-label="Shane Homes">
      <div className="shane-homes-logo-name">
        <span>SH</span>
        <span className="shane-homes-logo-a" aria-hidden>
          ▲
        </span>
        <span>NE</span>
      </div>
      <div className="shane-homes-logo-rule" />
      <div className="shane-homes-logo-tag">H O M E S</div>
    </div>
  );
}
