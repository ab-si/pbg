import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { DRINKS_EMOJI, normalizeDrinkPreference } from '../utils/drinks';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

const FOOD_EMOJI = {
  Veg: '🥦', 'Non-veg': '🍗', Vegan: '🌱', Jain: '🫚', 'No preference': '🤷',
};

export default function SubmitScreen({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);

    const colors = ['#FFD600', '#FF3366', '#7C3AED', '#FF6B35', '#00BFA5', '#FFB3C1', '#C3B1E1'];
    const end = Date.now() + 4000;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.6 },
        colors,
        shapes: ['circle', 'square'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.6 },
        colors,
        shapes: ['circle', 'square'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: '🎲 Board Game Night Planner', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied! 📋'));
    }
  };

  return (
    <div className="min-h-screen bg-game-board font-lato flex items-center justify-center px-4 py-10">
      <div
        className={`max-w-md w-full transition-all duration-700
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Victory card */}
        <div
          className="bg-game-yellow rounded-3xl border-[4px] border-game-dark shadow-hard-lg p-8 text-center mb-4 tilt-l"
        >
          <div
            className="text-7xl mb-3 inline-block"
            style={{ animation: 'ticker 1.8s ease-in-out infinite' }}
          >
            🏆
          </div>
          <h1 className="text-3xl font-black text-game-dark mb-2 uppercase tracking-tight text-shadow-hard">
            You're in the game!
          </h1>
          <p className="text-game-dark font-bold">
            Your response has been saved. Game night is going to be epic 🎲
          </p>
          {data?.name && (
            <p className="text-game-dark font-black text-xl mt-2">
              Player: <span className="underline decoration-wavy">{data.name}</span> 🎯
            </p>
          )}
        </div>

        {/* Summary card — tilted opposite direction */}
        <div className="bg-white rounded-3xl border-[3px] border-game-dark shadow-hard p-6 mb-4 space-y-4 tilt-r">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black text-game-dark uppercase tracking-wide">
              📋 Your Score Card
            </h2>
            <span className="badge-sticker">locked in</span>
          </div>

          {data?.availability?.length > 0 && (
            <div>
              <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wide">📅 Available on</p>
              <div className="flex flex-wrap gap-1.5">
                {data.availability
                  .slice()
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((entry, i) => (
                    <span
                      key={entry.date}
                      style={{ transform: `rotate(${i % 2 === 0 ? '-1.5deg' : '1deg'})`, display: 'inline-block' }}
                      className="px-2.5 py-1 bg-pastel-lav-l text-game-purple text-xs font-black rounded-full
                        border-[2px] border-game-purple shadow-hard-sm"
                    >
                      {formatDateLabel(entry.date)}
                      {entry.timeSlots.length > 0 && (
                        <span className="text-game-purple/60 ml-1">
                          ({entry.timeSlots.join(', ')})
                        </span>
                      )}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {data?.gamePreferences?.length > 0 && (
            <div>
              <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wide">🎮 Games</p>
              <div className="flex flex-wrap gap-1.5">
                {data.gamePreferences.map((g, i) => (
                  <span
                    key={g}
                    style={{ transform: `rotate(${i % 2 === 0 ? '1.5deg' : '-1deg'})`, display: 'inline-block' }}
                    className="px-2.5 py-1 bg-game-yellow text-game-dark text-xs font-black rounded-full
                      border-[2px] border-game-dark shadow-hard-sm"
                  >
                    🎲 {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {data?.foodPreference && (
              <div
                className="flex-1 bg-pastel-mint-l rounded-2xl px-3 py-2.5 text-center
                  border-[2px] border-emerald-400 shadow-hard-sm"
                style={{ transform: 'rotate(-0.8deg)' }}
              >
                <p className="text-xs font-black text-gray-500 mb-1 uppercase tracking-wide">🍕 Food</p>
                <p className="text-sm font-black text-emerald-800">
                  {FOOD_EMOJI[data.foodPreference] || ''} {data.foodPreference}
                </p>
              </div>
            )}
            {data?.drinks && (
              <div
                className="flex-1 bg-pastel-pink-l rounded-2xl px-3 py-2.5 text-center
                  border-[2px] border-pink-400 shadow-hard-sm"
                style={{ transform: 'rotate(0.8deg)' }}
              >
                <p className="text-xs font-black text-gray-500 mb-1 uppercase tracking-wide">🍹 Drinks</p>
                <p className="text-sm font-black text-pink-800">
                  {DRINKS_EMOJI[normalizeDrinkPreference(data.drinks)] || ''} {normalizeDrinkPreference(data.drinks)}
                </p>
              </div>
            )}
          </div>

          {data?.snacks && (
            <div
              className="bg-pastel-peach-l rounded-2xl px-3 py-2.5 border-[2px] border-orange-300 shadow-hard-sm"
              style={{ transform: 'rotate(-1deg)' }}
            >
              <p className="text-xs font-black text-gray-500 mb-1 uppercase tracking-wide">🍿 Snack request</p>
              <p className="text-sm text-orange-800 font-bold">{data.snacks}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            style={{ transform: 'rotate(-1deg)' }}
            className="btn-game flex-1 py-3.5 rounded-2xl bg-white text-game-dark font-black uppercase tracking-wide
              border-[3px] border-game-dark shadow-hard
              hover:-translate-y-0.5 hover:shadow-hard-lg
              active:translate-x-1 active:translate-y-1 active:shadow-none
              transition-all duration-150"
          >
            ↩ Play Again
          </button>
          <button
            onClick={handleShare}
            style={{ transform: 'rotate(0.5deg)' }}
            className="btn-game flex-1 py-3.5 rounded-2xl bg-game-purple text-white font-black uppercase tracking-wide
              border-[3px] border-game-dark shadow-hard-purple
              hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#7C3AED]
              active:translate-x-1 active:translate-y-1 active:shadow-none
              transition-all duration-150"
          >
            Invite Friends 🔗
          </button>
        </div>
      </div>
    </div>
  );
}
