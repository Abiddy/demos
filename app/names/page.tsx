import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Demo Sites | Names',
  description: 'Quick links to all demo websites.',
};

const SITES = [
  { href: '/yani', label: 'Yoni Rios', path: '/yani' },
  { href: '/lesli', label: 'Lesli Koontz', path: '/lesli' },
  { href: '/rudy', label: 'Rudy D. Zuniga', path: '/rudy' },
  { href: '/kay', label: 'Kay Corken', path: '/kay' },
  { href: '/nummy', label: 'Nummy Yummy', path: '/nummy' },
  { href: '/bakery', label: 'Bakery Facilities', path: '/bakery' },
  { href: '/lomelis', label: "Lomeli's Italian", path: '/lomelis' },
  { href: '/3322', label: "lil' Vegerie", path: '/3322' },
  { href: '/vasq', label: 'Viktor Oddy', path: '/vasq' },
] as const;

export default function NamesPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] px-6 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-4xl tracking-tight">Demo sites</h1>
        <p className="mt-2 text-sm text-white/55">
          Jump to any of the client demos.
        </p>

        <ul className="mt-10 flex flex-col gap-3">
          {SITES.map((site) => (
            <li key={site.href}>
              <Link
                href={site.href}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-white/25 hover:bg-white/[0.08]"
              >
                <span className="text-base font-medium tracking-tight">
                  {site.label}
                </span>
                <span className="font-mono text-sm text-white/40 transition group-hover:text-white/70">
                  {site.path}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
