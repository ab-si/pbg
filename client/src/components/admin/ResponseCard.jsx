const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const GAME_COLORS = {
  'Strategy':                  'bg-pastel-lav text-violet-800',
  'Party Games':               'bg-pastel-pink text-pink-800',
  'Card Games':                'bg-pastel-peach text-orange-800',
  'Bluffing / Social Deduction': 'bg-pastel-mint text-emerald-800',
  'Casual Games':              'bg-pastel-sky text-blue-800',
  'Anything':                  'bg-gray-100 text-gray-700',
};

const GAME_EMOJI = {
  'Strategy': '♟️',
  'Party Games': '🎉',
  'Card Games': '🃏',
  'Bluffing / Social Deduction': '🕵️',
  'Casual Games': '🎪',
  'Anything': '🎲',
};

const FOOD_EMOJI  = { Veg: '🥦', 'Non-veg': '🍗', Vegan: '🌱', Jain: '🫚', 'No preference': '🤷' };
const DRINKS_EMOJI = { Yes: '🥂', No: '🥤', Maybe: '🤔' };
const DRINKS_COLOR = {
  Yes:   'bg-pastel-pink-l text-pink-700',
  No:    'bg-pastel-sky-l text-blue-700',
  Maybe: 'bg-pastel-lav-l text-violet-700',
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d < 7)  return `${d}d ago`;
  const dt = new Date(dateStr);
  return `${dt.getDate()} ${MONTH_NAMES[dt.getMonth()]}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

export default function ResponseCard({ response }) {
  const { name, availability, gamePreferences, foodPreference, snacks, drinks, createdAt } = response;

  return (
    <div className="bg-white rounded-3xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 p-5 flex flex-col gap-4">
      {/* Header: name + timestamp */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-black text-gray-800 text-base leading-tight">{name}</p>
            <p className="text-xs text-gray-400 font-medium">Player</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2.5 py-1 rounded-full">
          {timeAgo(createdAt)}
        </span>
      </div>

      {/* Availability */}
      {availability?.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
            📅 Availability
          </p>
          <div className="flex flex-wrap gap-1.5">
            {availability
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((entry) => (
                <div key={entry.date} className="bg-pastel-lav-l rounded-xl px-2.5 py-1.5">
                  <p className="text-xs font-bold text-violet-700">{formatDate(entry.date)}</p>
                  {entry.timeSlots.length > 0 && (
                    <p className="text-[10px] text-violet-400 font-medium">
                      {entry.timeSlots.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Game preferences */}
      {gamePreferences?.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
            🎮 Game Preferences
          </p>
          <div className="flex flex-wrap gap-1.5">
            {gamePreferences.map((g) => (
              <span
                key={g}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${GAME_COLORS[g] || 'bg-gray-100 text-gray-700'}`}
              >
                {GAME_EMOJI[g] || '🎲'} {g}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Food + Drinks */}
      <div className="flex gap-2 flex-wrap">
        {foodPreference && (
          <div className="flex items-center gap-1.5 bg-pastel-mint-l px-3 py-1.5 rounded-2xl">
            <span className="text-base">{FOOD_EMOJI[foodPreference] || '🍽️'}</span>
            <span className="text-xs font-bold text-emerald-700">{foodPreference}</span>
          </div>
        )}
        {drinks && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl ${DRINKS_COLOR[drinks] || 'bg-gray-50 text-gray-700'}`}>
            <span className="text-base">{DRINKS_EMOJI[drinks] || '🍹'}</span>
            <span className="text-xs font-bold">{drinks === 'Yes' ? 'Drinks: Yes' : drinks === 'No' ? 'No drinks' : 'Drinks: Maybe'}</span>
          </div>
        )}
      </div>

      {/* Snacks */}
      {snacks && (
        <div className="bg-pastel-peach-l rounded-2xl px-3 py-2">
          <p className="text-xs text-orange-600">
            <span className="font-bold">🍿 Snack request: </span>
            <span className="font-medium">{snacks}</span>
          </p>
        </div>
      )}
    </div>
  );
}
