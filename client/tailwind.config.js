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
        game: {
          yellow: '#FFD600',
          'yellow-d': '#E5BF00',
          red: '#FF3366',
          'red-d': '#E0244F',
          purple: '#7C3AED',
          orange: '#FF6B35',
          teal: '#00BFA5',
          green: '#00C853',
          dark: '#1A1A2E',
          'dark-soft': '#2D2D44',
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
        'glow-yellow': '0 0 24px rgba(255, 214, 0, 0.6)',
        hard: '4px 4px 0px #1A1A2E',
        'hard-sm': '2px 2px 0px #1A1A2E',
        'hard-lg': '6px 6px 0px #1A1A2E',
        'hard-yellow': '4px 4px 0px #FFD600',
        'hard-purple': '4px 4px 0px #7C3AED',
        'hard-red': '4px 4px 0px #FF3366',
        'hard-teal': '4px 4px 0px #00BFA5',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        wiggle: 'wiggle 0.4s ease-in-out',
        pop: 'pop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        jitter: 'jitter 0.35s ease-in-out',
        stamp: 'stamp 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        'spin-dice': 'spinDice 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        ticker: 'ticker 2.8s ease-in-out infinite',
        'slide-in-bounce': 'slideInBounce 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-border': 'pulseBorder 1.5s ease-in-out infinite',
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
        jitter: {
          '0%, 100%': { transform: 'translate(0) rotate(0deg)' },
          '25%': { transform: 'translate(-2px, 1px) rotate(-2deg)' },
          '75%': { transform: 'translate(2px, -1px) rotate(2deg)' },
        },
        stamp: {
          '0%': { transform: 'scale(2) rotate(-10deg)', opacity: '0' },
          '65%': { transform: 'scale(0.92) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        spinDice: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '40%': { transform: 'rotate(200deg) scale(1.4)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        ticker: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        slideInBounce: {
          '0%': { transform: 'translateY(28px) rotate(-3deg)', opacity: '0' },
          '60%': { transform: 'translateY(-4px) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
        },
        pulseBorder: {
          '0%, 100%': { boxShadow: '4px 4px 0px #7C3AED' },
          '50%': { boxShadow: '4px 4px 0px #FF3366' },
        },
      },
    },
  },
  plugins: [],
};
