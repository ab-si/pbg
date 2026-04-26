import StepCard from '../StepCard';

const ALIASES = [
  { label: '🎯 Player One', rot: '-2deg' },
  { label: '🃏 The Bluffer', rot: '1.5deg' },
  { label: '♟️ Strategy King', rot: '-1deg' },
  { label: '🎲 Wild Card', rot: '2deg' },
];

export default function NameStep({ value, onChange, step }) {
  return (
    <StepCard
      emoji="👤"
      title="What's your name, player?"
      subtitle="How should we call you at game night?"
      step={step}
    >
      <div className="relative">
        <input
          type="text"
          value={value.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Your game night alias..."
          maxLength={50}
          autoFocus
          className={`w-full px-5 py-4 rounded-2xl border-[3px] text-game-dark font-black text-lg
            placeholder:text-gray-300 placeholder:font-normal transition-all duration-150
            ${value.name
              ? 'border-game-purple bg-pastel-lav-l shadow-hard-purple focus:border-game-purple'
              : 'border-gray-300 bg-gray-50 focus:border-game-purple focus:bg-pastel-lav-l focus:shadow-hard-purple'
            }`}
        />
        {value.name && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl animate-spin-dice">
            👋
          </span>
        )}
      </div>

      {value.name && (
        <div
          className="mt-4 p-3 bg-game-yellow rounded-2xl text-center animate-stamp
            border-[3px] border-game-dark shadow-hard-sm"
        >
          <p className="text-sm font-black text-game-dark uppercase tracking-wide">
            🎉 Player locked in: <span className="font-black">{value.name}</span>!
          </p>
        </div>
      )}

      {/* Alias quick-picks — each slightly tilted */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {ALIASES.map((alias) => (
          <button
            key={alias.label}
            onClick={() => onChange('name', alias.label.split(' ').slice(1).join(' '))}
            style={{ transform: `rotate(${alias.rot})` }}
            className="btn-game px-3 py-1.5 rounded-full bg-white text-game-dark text-xs font-black
              border-[2px] border-game-dark shadow-hard-sm
              hover:-translate-y-0.5 hover:bg-game-yellow
              active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
              transition-all duration-150"
          >
            {alias.label}
          </button>
        ))}
      </div>
    </StepCard>
  );
}
