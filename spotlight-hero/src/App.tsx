import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260721_142052_eb24fa6b-a69e-4ff2-8e74-8ff14fd0f864.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260721_142424_81e51558-a475-4497-86c1-510dc01e003a.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

const NAV_ITEMS = [
  'Main',
  'Platform',
  'Use',
  'Cases',
  'Integrations',
  'Journal',
  'Contact',
];

type RevealLayerProps = {
  image: string;
  cursorX: number;
  cursorY: number;
};

export function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
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
        className="pointer-events-none absolute inset-0 z-30 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}

export function HeroSection() {
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
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      <div className="pointer-events-none absolute left-0 right-0 top-[12%] z-50 flex items-start justify-between px-5 sm:px-10 md:px-14">
        <h1 className="text-left leading-[0.95] text-white">
          <span
            className="hero-anim hero-reveal font-playfair block text-6xl font-normal italic sm:text-7xl md:text-9xl"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Every layer
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block text-6xl font-normal sm:text-7xl md:text-9xl"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            tells a story.
          </span>
        </h1>

        <p
          className="hero-anim hero-fade hidden max-w-[240px] pt-2 text-left text-base leading-relaxed text-white sm:block"
          style={{ animationDelay: '0.7s' }}
        >
          Turn forgotten records, scattered logs, and silent activity into
          something readable.
        </p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] md:right-14 sm:gap-5"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-sm leading-relaxed text-white sm:text-base">
          EASYLOG transforms historical data into structured decisions — without
          losing the story behind it.
        </p>
        <button
          type="button"
          className="rounded-full bg-[#c8e630] px-8 py-3.5 text-base font-medium text-gray-900 transition-all hover:scale-[1.03] hover:bg-[#b8d620] hover:shadow-lg hover:shadow-[#c8e630]/30 active:scale-95"
        >
          Start uncovering
        </button>
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
        <span className="text-xs text-white/60">20-26</span>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <span className="font-playfair text-2xl italic text-white">easylog</span>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/20 hover:text-white ${
                item === 'Main' ? 'text-white' : 'text-white/80'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
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
        className={`fixed inset-0 z-[90] transition-opacity duration-500 md:hidden ${
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
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              type="button"
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
              {item}
            </button>
          ))}

          <button
            type="button"
            className={`mt-10 rounded-full bg-[#c8e630] px-8 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-500 ease-out hover:bg-[#b8d620] ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '480ms' : '0ms' }}
            onClick={() => setMenuOpen(false)}
          >
            Start uncovering
          </button>
        </div>
      </div>

      <HeroSection />
    </div>
  );
}
