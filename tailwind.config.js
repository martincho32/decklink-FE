/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    flexGrow: {
      2: '2',
      2.5: '2.5',
    },
    spacing: {
      5.5: '1.5rem',
    },
    colors: {
      persimmon: '#F1511B',
      mirage: '#161A20',
    },
    borderRadius: {
      3: '3px',
    },
    maxWidth: {
      '8xl': '90rem',
      custom: '70rem',
    },
    gap: {
      0.7: '0.19rem',
    },
    keyframes: {
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    screens: {
      mobilev: '320px',

      mobileh: '480px',

      tablet: '768px',

      laptop: '1024px',

      desktop: '1280px',

      desktopxl: '1440px',
    },
  },
};
export const plugins = [tailwindcssAnimate];
