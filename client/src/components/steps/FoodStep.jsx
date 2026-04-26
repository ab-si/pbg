import { useState } from 'react';
import StepCard from '../StepCard';

const FOOD_OPTIONS = [
  {
    id: 'Veg',
    emoji: '🥦',
    label: 'Veg',
    desc: 'Keep it green',
    unselBg: 'bg-pastel-mint-l border-emerald-300',
    selBg: 'bg-emerald-500 border-game-dark',
    rot: '-1.5deg',
  },
  {
    id: 'Non-veg',
    emoji: '🍗',
    label: 'Non-veg',
    desc: 'Bring on the meat',
    unselBg: 'bg-pastel-peach-l border-orange-300',
    selBg: 'bg-game-orange border-game-dark',
    rot: '1deg',
  },
  {
    id: 'Vegan',
    emoji: '🌱',
    label: 'Vegan',
    desc: 'Plant-powered',
    unselBg: 'bg-pastel-mint-l border-green-300',
    selBg: 'bg-green-500 border-game-dark',
    rot: '-0.5deg',
  },
  {
    id: 'Jain',
    emoji: '🫚',
    label: 'Jain',
    desc: 'No root veggies',
    unselBg: 'bg-pastel-lav-l border-violet-300',
    selBg: 'bg-game-yellow border-game-dark',
    rot: '2deg',
  },
  {
    id: 'No preference',
    emoji: '🤷',
    label: 'No preference',
    desc: "I'll eat anything!",
    unselBg: 'bg-gray-100 border-gray-300',
    selBg: 'bg-game-purple border-game-dark',
    rot: '-1deg',
    full: true,
  },
];

export default function FoodStep({ value, onChange, step }) {
  const [snackFocused, setSnackFocused] = useState(false);

  return (
    <StepCard
      emoji="🍕"
      title="Food vibes?"
      subtitle="What's your food preference for game night?"
      step={step}
    >
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {FOOD_OPTIONS.map((opt) => {
          const isSelected = value.foodPreference === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange('foodPreference', opt.id)}
              style={{ transform: `rotate(${opt.rot})` }}
              className={`btn-game flex items-center gap-3 p-3.5 rounded-2xl font-black text-left
                transition-all duration-150 border-[3px] uppercase tracking-wide
                hover:-translate-y-0.5
                active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                ${isSelected
                  ? `${opt.selBg} text-white shadow-hard`
                  : `${opt.unselBg} text-game-dark hover:border-game-dark hover:shadow-hard-sm`
                }
                ${opt.full ? 'col-span-2' : ''}`}
            >
              <span className={`text-2xl transition-transform duration-150 ${isSelected ? 'scale-125 animate-jitter' : ''}`}>
                {opt.emoji}
              </span>
              <span>
                <span className="font-black text-sm block">{opt.label}</span>
                <span className={`text-xs font-semibold ${isSelected ? 'text-white/75' : 'text-gray-500'}`}>
                  {opt.desc}
                </span>
              </span>
              {isSelected && (
                <span className="ml-auto text-lg animate-stamp">🎯</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Snack request */}
      <div
        className={`rounded-2xl border-[3px] transition-all duration-150
          ${snackFocused
            ? 'bg-pastel-peach-l border-game-orange shadow-hard-sm'
            : 'bg-gray-50 border-gray-300'
          }`}
      >
        <div className="px-4 pt-3 pb-1">
          <label className="text-xs font-black text-gray-600 uppercase tracking-wide">
            🍿 Snack requests? (optional)
          </label>
        </div>
        <textarea
          value={value.snacks}
          onChange={(e) => onChange('snacks', e.target.value)}
          onFocus={() => setSnackFocused(true)}
          onBlur={() => setSnackFocused(false)}
          placeholder="Nachos, chips, cookies... anything?"
          rows={2}
          className="w-full px-4 pb-3 bg-transparent text-game-dark font-semibold text-sm
            placeholder:text-gray-300 placeholder:font-normal resize-none focus:outline-none"
        />
      </div>
    </StepCard>
  );
}
