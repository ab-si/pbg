const STEP_META = [
  { label: 'Name', emoji: '👤' },
  { label: 'When', emoji: '📅' },
  { label: 'Games', emoji: '🎮' },
  { label: 'Food', emoji: '🍕' },
  { label: 'Drinks', emoji: '🍹' },
];

export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <div className="w-full">
      {/* Step dots + connector line */}
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10" />
        {/* Progress line */}
        <div
          className="absolute top-4 left-0 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {STEP_META.map((meta, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isFuture = stepNum > currentStep;

          return (
            <div key={stepNum} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white shadow-soft'
                    : isCurrent
                    ? 'bg-white border-2 border-violet-400 text-violet-600 shadow-glow scale-110'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {isDone ? '✓' : meta.emoji}
              </div>
              <span
                className={`text-xs font-semibold transition-colors duration-300 ${
                  isCurrent ? 'text-violet-600' : isDone ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step counter */}
      <p className="text-center text-xs text-gray-400 mt-4 font-medium">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
