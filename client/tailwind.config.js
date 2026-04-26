/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFB3C1',
          'pink-l': '#FFD6E0',
          mint: '#B5EAD7',
          'mint-l': '#D4F7EC',
          lav: '#C3B1E1',
          'lav-l': '#DDD4F0',
          peach: '#FFD4B3',
          'peach-l': '#FFE8D4',
          sky: '#AED9E0',
          'sky-l': '#D4EFF3',
        },
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0, 0, 0, 0.07)',
        'soft-lg': '0 8px 40px rgba(0, 0, 0, 0.12)',
        glow: '0 0 24px rgba(195, 177, 225, 0.5)',
        'glow-pink': '0 0 24px rgba(255, 179, 193, 0.5)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        wiggle: 'wiggle 0.4s ease-in-out',
        'pop': 'pop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(5deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
