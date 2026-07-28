'use client';

import { useEffect, useState } from 'react';

type AnimatedHeadingProps = {
  lines: string[];
  charDelay?: number;
  initialDelay?: number;
  className?: string;
};

export function AnimatedHeading({
  lines,
  charDelay = 30,
  initialDelay = 200,
  className = '',
}: AnimatedHeadingProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), initialDelay);
    return () => window.clearTimeout(timer);
  }, [initialDelay]);

  return (
    <div
      className={`text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl ${className}`}
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => {
        const priorChars = lines
          .slice(0, lineIndex)
          .reduce((sum, priorLine) => sum + priorLine.length, 0);

        return (
          <div key={line} className="flex flex-wrap">
            {line.split('').map((char, charIndex) => {
              const delay = (priorChars + charIndex) * charDelay;

              return (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className={`char-span ${visible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
