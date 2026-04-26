import StepCard from '../StepCard';

export default function NameStep({ value, onChange }) {
  return (
    <StepCard
      emoji="👤"
      title="What's your name, player?"
      subtitle="How should we call you at game night?"
    >
      <div className="relative">
        <input
          type="text"
          value={value.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Your game night alias..."
          maxLength={50}
          autoFocus
          className={`w-full px-5 py-4 rounded-2xl border-2 text-gray-800 font-semibold text-lg placeholder:text-gray-300 placeholder:font-normal transition-all duration-200 ${
            value.name
              ? 'border-violet-300 bg-pastel-lav-l shadow-soft focus:border-violet-400 focus:shadow-glow'
              : 'border-gray-200 bg-gray-50 focus:border-violet-300 focus:bg-pastel-lav-l'
          }`}
        />
        {value.name && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl animate-pop">
            👋
          </span>
        )}
      </div>

      {value.name && (
        <div className="mt-4 p-3 bg-pastel-mint-l rounded-2xl text-center animate-fade-in">
          <p className="text-sm font-semibold text-emerald-700">
            Nice to meet you, <span className="font-black">{value.name}</span>! 🎉
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['🎯 Player One', '🃏 The Bluffer', '♟️ Strategy King', '🎲 Wild Card'].map((alias) => (
          <button
            key={alias}
            onClick={() => onChange('name', alias.split(' ').slice(1).join(' '))}
            className="px-3 py-1.5 rounded-full bg-pastel-peach-l text-orange-600 text-xs font-semibold hover:bg-pastel-peach hover:scale-105 active:scale-95 transition-all duration-150"
          >
            {alias}
          </button>
        ))}
      </div>
    </StepCard>
  );
}
