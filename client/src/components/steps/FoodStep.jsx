import { useState } from 'react';
import StepCard from '../StepCard';

const FOOD_OPTIONS = [
  {
    id: 'Veg',
    emoji: '🥦',
    label: 'Veg',
    desc: 'Keep it green',
    bg: 'bg-pastel-mint-l',
    activeBg: 'from-emerald-400 to-teal-400',
    text: 'text-emerald-800',
  },
  {
    id: 'Non-veg',
    emoji: '🍗',
    label: 'Non-veg',
    desc: 'Bring on the meat',
    bg: 'bg-pastel-peach-l',
    activeBg: 'from-orange-400 to-amber-400',
    text: 'text-orange-800',
  },
  {
    id: 'Vegan',
    emoji: '🌱',
    label: 'Vegan',
    desc: 'Plant-powered',
    bg: 'bg-pastel-mint-l',
    activeBg: 'from-green-400 to-emerald-500',
    text: 'text-green-800',
  },
  {
    id: 'Jain',
    emoji: '🫚',
    label: 'Jain',
    desc: 'No root veggies',
    bg: 'bg-pastel-lav-l',
    activeBg: 'from-yellow-400 to-orange-400',
    text: 'text-yellow-800',
  },
  {
    id: 'No preference',
    emoji: '🤷',
    label: 'No preference',
    desc: "I'll eat anything!",
    bg: 'bg-gray-50',
    activeBg: 'from-violet-400 to-fuchsia-400',
    text: 'text-gray-700',
  },
];

export default function FoodStep({ value, onChange }) {
  const [snackFocused, setSnackFocused] = useState(false);

  return (
    <StepCard
      emoji="🍕"
      title="Food vibes?"
      subtitle="What's your food preference for game night?"
    >
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {FOOD_OPTIONS.map((opt) => {
          const isSelected = value.foodPreference === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange('foodPreference', opt.id)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl font-semibold text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                isSelected
                  ? `bg-gradient-to-r ${opt.activeBg} text-white shadow-soft`
                  : `${opt.bg} ${opt.text} hover:shadow-soft`
              } ${opt.id === 'No preference' ? 'col-span-2' : ''}`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span>
                <span className={`font-bold text-sm block ${isSelected ? 'text-white' : ''}`}>
                  {opt.label}
                </span>
                <span className={`text-xs ${isSelected ? 'text-white/70' : 'opacity-60'}`}>
                  {opt.desc}
                </span>
              </span>
              {isSelected && (
                <span className="ml-auto text-white font-bold">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Snacks input */}
      <div className={`rounded-2xl transition-all duration-200 ${snackFocused ? 'bg-pastel-peach-l' : 'bg-gray-50'}`}>
        <div className="px-4 pt-3 pb-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            🍿 Any snack requests? (optional)
          </label>
        </div>
        <textarea
          value={value.snacks}
          onChange={(e) => onChange('snacks', e.target.value)}
          onFocus={() => setSnackFocused(true)}
          onBlur={() => setSnackFocused(false)}
          placeholder="Nachos, chips, cookies... anything?"
          rows={2}
          className="w-full px-4 pb-3 bg-transparent text-gray-700 text-sm placeholder:text-gray-300 resize-none focus:outline-none"
        />
      </div>
    </StepCard>
  );
}
