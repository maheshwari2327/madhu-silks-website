import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FDF2F4',
          100: '#FBE8EC',
          200: '#F5C6D0',
          300: '#EB9BB0',
          400: '#DC6788',
          500: '#C73860',
          600: '#A4284A',
          700: '#8A273D',
          800: '#722D3B', // Brand primary deep maroon
          900: '#521D27',
          950: '#2E0E15',
        },
        gold: {
          50: '#FAF8F2',
          100: '#F3EFE1',
          200: '#E5DDC0',
          300: '#D5C69A',
          400: '#C4B074',
          500: '#B08A4A', // Brand primary antique gold
          600: '#9E743A',
          700: '#835B2E',
          800: '#694827',
          900: '#553B23',
          950: '#2F1E0F',
        },
        ivory: '#FFFDF7',
        cream: '#F5EFE6',
        softpink: '#E8C5C8',
        warmbeige: '#EADBC8',
        mutedgold: '#CBB279',
        darkbrown: '#2C161A',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
