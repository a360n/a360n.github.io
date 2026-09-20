import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mub: {
          navy: {
            950: '#040814',
            900: '#0A1124',
            850: '#0F1E36',
            800: '#162846',
            700: '#1F3860',
            600: '#2A4B80',
            500: '#3B68B0',
          },
          gold: {
            600: '#B48C20',
            500: '#D4AF37',
            400: '#E5BE48',
            300: '#F5D061',
            200: '#FBE8A6',
            100: '#FDF6E2',
          },
          slate: {
            900: '#0B0F19',
            800: '#111827',
            700: '#1F2937',
            600: '#374151',
            400: '#9CA3AF',
            200: '#E5E7EB',
            100: '#F3F4F6',
          }
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(at 10% 20%, rgba(212, 175, 55, 0.15) 0px, transparent 50%), radial-gradient(at 90% 80%, rgba(30, 58, 138, 0.25) 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
