/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stone: {
          850: '#1f1b18',
          925: '#14110f',
        },
      },
      boxShadow: {
        tactile: '0 18px 60px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
