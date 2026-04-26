const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const STEP_META = [
  { label: 'Name',   emoji: '👤' },
  { label: 'When',   emoji: '📅' },
  { label: 'Games',  emoji: '🎮' },
  { label: 'Food',   emoji: '🍕' },
  { label: 'Drinks', emoji: '🍹' },
];

export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className="w-full">
      {/* Step markers + connector */}
      <div className="flex items-center justify-between relative">
        {/* Background track */}
        <div className="absolute top-5 left-0 right-0 h-2 bg-gray-200 rounded-full -z-10
          border border-game-dark" />
        {/* Progress fill */}
        <div
          className="absolute top-5 left-0 h-2 bg-game-yellow rounded-full -z-10 transition-all duration-500
            border border-game-dark"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {STEP_META.map((meta, i) => {
          const stepNum = i + 1;
          const isDone    = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={stepNum} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black
                  border-[2.5px] border-game-dark transition-all duration-300
                  ${isDone
                    ? 'bg-game-yellow text-game-dark shadow-hard-sm'
                    : isCurrent
                    ? 'bg-game-purple text-white shadow-hard scale-110 animate-pulse-border'
                    : 'bg-white text-gray-400'
                  }`}
              >
                {isDone ? DICE_FACES[i] : meta.emoji}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-wide transition-colors duration-300
                  ${isCurrent ? 'text-game-purple' : isDone ? 'text-game-dark' : 'text-gray-300'}`}
              >
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Level counter — game show style */}
      <div className="flex justify-center mt-4">
        <span className="badge-sticker" style={{ transform: 'rotate(-1deg)' }}>
          Level {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
