'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { SiteConfig, SpotlightHeroConfig } from '@/types/site-config';

const SPOTLIGHT_R = 260;

type RevealLayerProps = {
  image: string;
  cursorX: number;
  cursorY: number;
};

function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    const maskUrl = canvas.toDataURL();
    reveal.style.webkitMaskImage = `url(${maskUrl})`;
    reveal.style.maskImage = `url(${maskUrl})`;
    reveal.style.maskSize = '100% 100%';
    reveal.style.webkitMaskSize = '100% 100%';
  });

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

type HeroSectionProps = {
  spotlight: SpotlightHeroConfig;
};

function HeroSection({ spotlight }: HeroSectionProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({
        x: smooth.current.x,
        y: smooth.current.y,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
    >
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${spotlight.bgImage1})` }}
      />

      <RevealLayer
        image={spotlight.bgImage2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      <div className="pointer-events-none absolute left-0 right-0 top-[12%] z-50 flex items-start justify-between px-5 sm:px-10 md:px-14">
        <h1 className="text-left leading-[0.95] text-white">
          <span
            className="hero-anim hero-reveal font-playfair block text-6xl font-normal italic sm:text-7xl md:text-9xl"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            {spotlight.headingLine1}
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block text-6xl font-normal sm:text-7xl md:text-9xl"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            {spotlight.headingLine2}
          </span>
        </h1>

        <p
          className="hero-anim hero-fade hidden max-w-[240px] pt-2 text-left text-base leading-relaxed text-white sm:block"
          style={{ animationDelay: '0.7s' }}
        >
          {spotlight.topRightText}
        </p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] md:right-14 sm:gap-5"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-sm leading-relaxed text-white sm:text-base">
          {spotlight.bottomRightText}
        </p>
        <Link
          href={spotlight.ctaHref}
          className="pointer-events-auto rounded-full bg-[#c8e630] px-8 py-3.5 text-base font-medium text-gray-900 transition-all hover:scale-[1.03] hover:bg-[#b8d620] hover:shadow-lg hover:shadow-[#c8e630]/30 active:scale-95"
        >
          {spotlight.ctaLabel}
        </Link>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-6 left-5 z-50 flex items-center gap-3 sm:left-10 md:left-14"
        style={{ animationDelay: '1s' }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
          <ChevronDown size={14} className="text-black" />
        </div>
        <span className="text-xs text-white/60">Scroll down for more</span>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-6 right-5 z-50 sm:right-10 md:right-14"
        style={{ animationDelay: '1s' }}
      >
        <span className="text-xs text-white/60">{spotlight.yearStamp}</span>
      </div>
    </section>
  );
}

type SpotlightHeroProps = {
  config: SiteConfig;
};

export function SpotlightHero({ config }: SpotlightHeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const spotlight = config.spotlightHero;

  if (!spotlight) return null;

  const navLinks = config.hero.navLinks;

  return (
    <div
      className="relative min-h-screen tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <span className="font-playfair text-xl italic text-white sm:text-2xl">
          {spotlight.wordmark}
        </span>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/20 hover:text-white ${
                index === 0 ? 'text-white' : 'text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="hidden rounded-full border border-white/30 bg-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/30 md:block"
        >
          menu
        </button>

        <button
          type="button"
          className={`flex h-11 w-11 flex-col items-center justify-center rounded-full transition-all duration-300 active:scale-95 md:hidden ${
            menuOpen
              ? 'border border-neutral-200 bg-neutral-100'
              : 'border border-white/30 bg-white/20 backdrop-blur-md'
          }`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-[1.5px] w-5 rounded-full transition-all duration-300 ease-out ${
              menuOpen ? 'rotate-45 bg-neutral-800' : '-translate-y-[5px] bg-white'
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-full transition-all duration-300 ease-out ${
              menuOpen
                ? 'scale-x-0 opacity-0 bg-neutral-800'
                : 'bg-white opacity-100'
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-full transition-all duration-300 ease-out ${
              menuOpen ? '-rotate-45 bg-neutral-800' : 'translate-y-[5px] bg-white'
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[90] transition-opacity duration-500 ${
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-white backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-8 opacity-0'
          }`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={`text-2xl font-medium text-neutral-800 transition-all duration-500 ease-out hover:text-neutral-950 ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: menuOpen ? `${120 + index * 60}ms` : '0ms',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={spotlight.ctaHref}
            className={`mt-10 rounded-full bg-[#c8e630] px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-500 ease-out hover:bg-[#b8d620] ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '480ms' : '0ms' }}
            onClick={() => setMenuOpen(false)}
          >
            {spotlight.ctaLabel}
          </Link>
        </div>
      </div>

      <HeroSection spotlight={spotlight} />
    </div>
  );
}
