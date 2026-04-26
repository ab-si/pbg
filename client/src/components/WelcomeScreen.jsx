import { useEffect, useState } from 'react';

const FLOATERS = [
  { emoji: '🎲', top: '10%', left: '6%',  delay: '0s',   duration: '4s',   rot: '-8deg'  },
  { emoji: '🃏', top: '18%', right: '8%', delay: '0.8s', duration: '5s',   rot: '12deg'  },
  { emoji: '♟️', top: '52%', left: '4%',  delay: '1.2s', duration: '3.8s', rot: '-15deg' },
  { emoji: '🎯', top: '68%', right: '7%', delay: '0.4s', duration: '4.5s', rot: '6deg'   },
  { emoji: '🎮', top: '78%', left: '13%', delay: '1.6s', duration: '5.2s', rot: '-10deg' },
  { emoji: '🎪', top: '33%', right: '4%', delay: '2s',   duration: '4.2s', rot: '20deg'  },
  { emoji: '🀄', top: '8%',  left: '44%', delay: '0.6s', duration: '3.5s', rot: '-5deg'  },
  { emoji: '🎰', top: '58%', right: '16%',delay: '1.4s', duration: '4.8s', rot: '14deg'  },
  { emoji: '🏆', top: '85%', right: '35%',delay: '0.9s', duration: '5.5s', rot: '-12deg' },
  { emoji: '🎴', top: '42%', left: '88%', delay: '1.8s', duration: '3.9s', rot: '8deg'   },
];

export default function WelcomeScreen({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-game-board flex items-center justify-center relative overflow-hidden font-lato">
      {/* Floating background emojis */}
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="absolute text-4xl select-none pointer-events-none opacity-50"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            rotate: f.rot,
            animation: `float ${f.duration} ease-in-out ${f.delay} infinite`,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Color blobs */}
      <div className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: '#7C3AED', top: '-80px', right: '-60px' }} />
      <div className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: '#FFD600', bottom: '-50px', left: '-40px' }} />
      <div className="absolute w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#FF3366', top: '38%', left: '52%' }} />

      {/* Main card — tilted left like a dropped playing card */}
      <div
        className={`relative z-10 bg-white rounded-3xl p-10 mx-4 max-w-md w-full text-center transition-all duration-700
          border-[3px] border-game-dark shadow-hard-lg tilt-l
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Corner badge */}
        <span className="badge-sticker absolute -top-3 -right-3 z-20" style={{ transform: 'rotate(8deg)' }}>
          FREE RSVP
        </span>

        {/* Big animated dice */}
        <div
          className="text-7xl mb-4 inline-block"
          style={{ animation: 'ticker 2.8s ease-in-out infinite' }}
        >
          🎲
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-game-dark leading-tight mb-2 text-shadow-hard uppercase tracking-tight">
          Board Game Night
          <br />
          <span
            className="bg-gradient-to-r from-game-purple to-game-red bg-clip-text text-transparent"
            style={{ WebkitTextStroke: '0px' }}
          >
            Planner
          </span>
        </h1>

        <p className="text-gray-600 text-base mb-1 font-bold">
          Let's find the perfect time to play!
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Takes only 2 minutes · No sign-up needed 🙌
        </p>

        {/* CTA Button — game show style */}
        <button
          onClick={onStart}
          className="btn-game w-full py-4 rounded-2xl bg-game-yellow text-game-dark font-black text-lg
            border-[3px] border-game-dark shadow-hard-lg
            hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A1A2E]
            active:translate-x-1 active:translate-y-1 active:shadow-none
            transition-all duration-150 uppercase tracking-wide"
        >
          Roll the Dice! 🎲
        </button>

        {/* Feature pills — each slightly rotated */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {[
            { label: '📅 Pick dates', rot: '-2deg', bg: 'bg-pastel-lav-l border-violet-300' },
            { label: '🎮 Choose games', rot: '1.5deg', bg: 'bg-pastel-peach-l border-orange-300' },
            { label: '🍕 Food prefs', rot: '-1deg', bg: 'bg-pastel-mint-l border-emerald-300' },
            { label: '🍹 Drinks', rot: '2.5deg', bg: 'bg-pastel-pink-l border-pink-300' },
          ].map((tag) => (
            <span
              key={tag.label}
              className={`px-3 py-1 ${tag.bg} border text-gray-700 text-xs font-bold rounded-full shadow-hard-sm`}
              style={{ transform: `rotate(${tag.rot})`, display: 'inline-block' }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
