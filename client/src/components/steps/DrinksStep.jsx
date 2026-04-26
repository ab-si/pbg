import StepCard from '../StepCard';
import { DRINK_CHOICES } from '../../utils/drinks';

const DRINKS_OPTIONS = [
  {
    id: DRINK_CHOICES.alcohol,
    emoji: '🥂',
    label: 'Alcohol please',
    desc: "Let's toast to good games!",
    unselBg: 'bg-pastel-pink-l border-pink-300',
    selBg:   'bg-game-red border-game-dark',
    rot: '-1.5deg',
  },
  {
    id: DRINK_CHOICES.nonAlcoholic,
    emoji: '🥤',
    label: 'Non-alcoholic',
    desc: 'Juice, soda, mocktails — zero proof',
    unselBg: 'bg-pastel-sky-l border-sky-300',
    selBg:   'bg-sky-500 border-game-dark',
    rot: '1deg',
  },
  {
    id: DRINK_CHOICES.water,
    emoji: '💧',
    label: "Water's fine",
    desc: 'Keep it simple and hydrated',
    unselBg: 'bg-pastel-lav-l border-violet-300',
    selBg:   'bg-game-purple border-game-dark',
    rot: '-0.5deg',
  },
];

export default function DrinksStep({ value, onChange, step }) {
  return (
    <StepCard
      emoji="🍹"
      title="Drink preferences"
      subtitle="Don't say no!"
      step={step}
    >
      <div className="flex flex-col gap-3">
        {DRINKS_OPTIONS.map((opt) => {
          const isSelected = value.drinks === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange('drinks', opt.id)}
              style={{ transform: `rotate(${opt.rot})` }}
              className={`btn-game flex items-center gap-4 p-4 rounded-2xl font-black text-left
                transition-all duration-150 border-[3px] uppercase tracking-wide
                hover:-translate-y-0.5
                active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                ${isSelected
                  ? `${opt.selBg} text-white shadow-hard`
                  : `${opt.unselBg} text-game-dark hover:border-game-dark hover:shadow-hard-sm`
                }`}
            >
              <span className={`text-4xl transition-transform duration-150 ${isSelected ? 'scale-125 animate-jitter' : ''}`}>
                {opt.emoji}
              </span>
              <span className="flex-1">
                <span className="font-black text-base block">{opt.label}</span>
                <span className={`text-xs font-semibold normal-case tracking-normal ${isSelected ? 'text-white/75' : 'text-gray-500'}`}>
                  {opt.desc}
                </span>
              </span>
              <span
                className={`w-7 h-7 rounded-full border-[2.5px] flex items-center justify-center text-sm
                  font-black transition-all duration-150
                  ${isSelected ? 'bg-white/30 border-white text-white animate-stamp' : 'border-gray-300'}`}
              >
                {isSelected ? '✓' : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-4 p-3 bg-game-yellow rounded-2xl border-[2.5px] border-game-dark shadow-hard-sm"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        <p className="text-xs text-game-dark font-black text-center uppercase tracking-wide">
          🌟 Final boss level! One click away from locking in your spot!
        </p>
      </div>
    </StepCard>
  );
}
