/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        5.5: '1.5rem',
      },
      colors: {
        persimmon: '#F1511B',
        mirage: '#161A20',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      gap: {
        0.7: '0.19rem',
      },
    },
  },
  plugins: [],
};
