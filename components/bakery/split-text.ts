import gsap from 'gsap';

export function splitChars(el: HTMLElement, charsClass = 'split-char font-accent') {
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text);
  el.innerHTML = '';

  const chars: HTMLSpanElement[] = [];
  for (const char of text) {
    const span = document.createElement('span');
    span.className = charsClass;
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

export function animateChars(
  chars: HTMLElement[],
  {
    delay = 0,
    stagger = 0.03,
    duration = 0.8,
    onComplete,
  }: {
    delay?: number;
    stagger?: number;
    duration?: number;
    onComplete?: () => void;
  } = {},
) {
  gsap.set(chars, { opacity: 0, y: 40 });
  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
    onComplete,
  });
}
