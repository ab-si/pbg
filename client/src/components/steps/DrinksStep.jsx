import StepCard from '../StepCard';

const DRINKS_OPTIONS = [
  {
    id: 'Yes',
    emoji: '🥂',
    label: 'Yes!',
    desc: "Let's toast to good games",
    bg: 'bg-pastel-pink-l',
    activeBg: 'from-pink-400 to-fuchsia-400',
    text: 'text-pink-800',
  },
  {
    id: 'No',
    emoji: '🥤',
    label: 'No thanks',
    desc: 'Staying hydrated with H2O',
    bg: 'bg-pastel-sky-l',
    activeBg: 'from-sky-400 to-blue-400',
    text: 'text-blue-800',
  },
  {
    id: 'Maybe',
    emoji: '🤔',
    label: 'Maybe...',
    desc: 'Depends on the game!',
    bg: 'bg-pastel-lav-l',
    activeBg: 'from-violet-400 to-purple-400',
    text: 'text-violet-800',
  },
];

export default function DrinksStep({ value, onChange }) {
  return (
    <StepCard
      emoji="🍹"
      title="Drink preferences"
      subtitle=" — Dont say no!"
    >
      <div className="flex flex-col gap-3">
        {DRINKS_OPTIONS.map((opt) => {
          const isSelected = value.drinks === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange('drinks', opt.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl font-semibold text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                isSelected
                  ? `bg-gradient-to-r ${opt.activeBg} text-white shadow-soft-lg`
                  : `${opt.bg} ${opt.text} hover:shadow-soft`
              }`}
            >
              <span className={`text-4xl transition-transform duration-200 ${isSelected ? 'scale-125' : ''}`}>
                {opt.emoji}
              </span>
              <span className="flex-1">
                <span className={`font-black text-lg block ${isSelected ? 'text-white' : ''}`}>
                  {opt.label}
                </span>
                <span className={`text-sm ${isSelected ? 'text-white/70' : 'opacity-60'}`}>
                  {opt.desc}
                </span>
              </span>
              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? 'bg-white/30 border-white text-white'
                    : 'border-gray-300'
                }`}
              >
                {isSelected ? '✓' : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-pastel-mint-l rounded-2xl">
        <p className="text-xs text-emerald-700 font-medium text-center">
          🌟 Almost there! One click away from joining the game night.
        </p>
      </div>
    </StepCard>
  );
}
