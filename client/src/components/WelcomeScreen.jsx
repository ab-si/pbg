import { useEffect, useState } from 'react';

const FLOATERS = [
  { emoji: '🎲', top: '12%', left: '8%', delay: '0s', duration: '4s' },
  { emoji: '🃏', top: '20%', right: '10%', delay: '0.8s', duration: '5s' },
  { emoji: '♟️', top: '55%', left: '5%', delay: '1.2s', duration: '3.8s' },
  { emoji: '🎯', top: '70%', right: '8%', delay: '0.4s', duration: '4.5s' },
  { emoji: '🎮', top: '80%', left: '15%', delay: '1.6s', duration: '5.2s' },
  { emoji: '🎪', top: '35%', right: '5%', delay: '2s', duration: '4.2s' },
  { emoji: '🀄', top: '10%', left: '45%', delay: '0.6s', duration: '3.5s' },
  { emoji: '🎰', top: '60%', right: '18%', delay: '1.4s', duration: '4.8s' },
];

export default function WelcomeScreen({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lav via-pastel-pink to-pastel-sky flex items-center justify-center relative overflow-hidden font-lato">
      {/* Floating background emojis */}
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="absolute text-4xl select-none pointer-events-none opacity-30"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            animation: `float ${f.duration} ease-in-out ${f.delay} infinite`,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Soft blob shapes */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: '#C3B1E1', top: '-60px', right: '-60px' }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: '#B5EAD7', bottom: '-40px', left: '-40px' }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl"
        style={{ background: '#FFB3C1', top: '40%', left: '50%' }}
      />

      {/* Main card */}
      <div
        className={`relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft-lg p-10 mx-4 max-w-md w-full text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Big animated dice */}
        <div
          className="text-7xl mb-4 inline-block"
          style={{ animation: 'bounceSoft 2s ease-in-out infinite' }}
        >
          🎲
        </div>

        <h1 className="text-3xl font-black text-gray-800 leading-tight mb-2 text-shadow">
          Board Game Night
          <br />
          <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Planner
          </span>
        </h1>

        <p className="text-gray-500 text-base mb-2 font-medium">
          Let's find the perfect time to play!
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Takes only 2 minutes · No sign-up needed 🙌
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white font-bold text-lg shadow-soft hover:shadow-glow hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          Join the Game 🎮
        </button>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {['📅 Pick dates', '🎮 Choose games', '🍕 Food prefs', '🍹 Drinks'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-pastel-lav-l text-violet-700 text-xs font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
