import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

const FOOD_EMOJI = {
  Veg: '🥦',
  'Non-veg': '🍗',
  Vegan: '🌱',
  Jain: '🫚',
  'No preference': '🤷',
};

const DRINKS_EMOJI = { Yes: '🥂', No: '🥤', Maybe: '🤔' };

export default function SubmitScreen({ data }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);

    const colors = ['#FFB3C1', '#B5EAD7', '#C3B1E1', '#FFD4B3', '#AED9E0', '#a78bfa', '#f472b6'];
    const end = Date.now() + 3500;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
        shapes: ['circle', 'square'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
        shapes: ['circle', 'square'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
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
    <div className="min-h-screen bg-gradient-to-br from-pastel-lav-l via-pastel-pink-l to-pastel-sky-l font-lato flex items-center justify-center px-4 py-10">
      <div
        className={`max-w-md w-full transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Hero card */}
        <div className="bg-white rounded-3xl shadow-soft-lg p-8 text-center mb-4">
          <div
            className="text-7xl mb-3 inline-block"
            style={{ animation: 'bounceSoft 1.5s ease-in-out infinite' }}
          >
            🎉
          </div>
          <h1 className="text-2xl font-black text-gray-800 mb-1">You're in the game!</h1>
          <p className="text-gray-500 font-medium">
            Thanks{data?.name ? `, ${data.name}` : ''}! Your response has been saved.
            Game night is going to be epic 🎲
          </p>
        </div>

        {/* Summary card */}
        <div className="bg-white rounded-3xl shadow-soft p-6 mb-4 space-y-4">
          <h2 className="text-sm font-black text-gray-500 uppercase tracking-wide">
            📋 Your Summary
          </h2>

          {/* Availability */}
          {data?.availability?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 mb-2">📅 Available on</p>
              <div className="flex flex-wrap gap-1.5">
                {data.availability
                  .slice()
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((entry) => (
                    <span
                      key={entry.date}
                      className="px-2.5 py-1 bg-pastel-lav-l text-violet-700 text-xs font-semibold rounded-full"
                    >
                      {formatDateLabel(entry.date)}
                      {entry.timeSlots.length > 0 && (
                        <span className="text-violet-400 ml-1">
                          ({entry.timeSlots.join(', ')})
                        </span>
                      )}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Games */}
          {data?.gamePreferences?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 mb-2">🎮 Games</p>
              <div className="flex flex-wrap gap-1.5">
                {data.gamePreferences.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 bg-pastel-peach-l text-orange-700 text-xs font-semibold rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Food & Drinks */}
          <div className="flex gap-3">
            {data?.foodPreference && (
              <div className="flex-1 bg-pastel-mint-l rounded-2xl px-3 py-2.5 text-center">
                <p className="text-xs font-bold text-gray-400 mb-1">🍕 Food</p>
                <p className="text-sm font-bold text-emerald-700">
                  {FOOD_EMOJI[data.foodPreference] || ''} {data.foodPreference}
                </p>
              </div>
            )}
            {data?.drinks && (
              <div className="flex-1 bg-pastel-pink-l rounded-2xl px-3 py-2.5 text-center">
                <p className="text-xs font-bold text-gray-400 mb-1">🍹 Drinks</p>
                <p className="text-sm font-bold text-pink-700">
                  {DRINKS_EMOJI[data.drinks] || ''} {data.drinks}
                </p>
              </div>
            )}
          </div>

          {data?.snacks && (
            <div className="bg-pastel-peach-l rounded-2xl px-3 py-2.5">
              <p className="text-xs font-bold text-gray-400 mb-1">🍿 Snack request</p>
              <p className="text-sm text-orange-700 font-medium">{data.snacks}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-3.5 rounded-2xl bg-white text-gray-600 font-semibold shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            ↩ Fill Again
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white font-bold shadow-soft hover:shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            Share Link 🔗
          </button>
        </div>
      </div>
    </div>
  );
}
