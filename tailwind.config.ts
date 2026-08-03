import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '5%',
    },
    extend: {
      borderRadius: {
        DEFAULT: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['P22 Mackinac W01 Book', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        body: ['"Open Sans"', 'sans-serif'],
        accent: ['"Instrument Serif"', 'serif'],
        manrope: ['Manrope', 'sans-serif'],
        luxurious: ['"Luxurious Script"', 'cursive'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
      },
      colors: {
        bakery: {
          gold: '#CB9D06',
        },
      },
    },
  },
  plugins: [],
};

export default config;
