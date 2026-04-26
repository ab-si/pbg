const TILT_CLASSES = ['tilt-l', 'tilt-r', 'tilt-ll', 'tilt-r', 'tilt-l'];
const ACCENT_COLORS = [
  'border-t-game-purple',
  'border-t-game-red',
  'border-t-game-orange',
  'border-t-game-teal',
  'border-t-game-yellow',
];

export default function StepCard({ emoji, title, subtitle, children, step = 0 }) {
  const tilt = TILT_CLASSES[step % TILT_CLASSES.length];
  const accent = ACCENT_COLORS[step % ACCENT_COLORS.length];

  return (
    <div
      className={`bg-white rounded-3xl border-[3px] border-game-dark border-t-[6px] ${accent}
        shadow-hard-lg p-6 ${tilt} transition-shadow duration-150`}
    >
      <div className="text-center mb-6">
        <span
          className="text-5xl inline-block"
          style={{ animation: 'ticker 2.8s ease-in-out infinite' }}
        >
          {emoji}
        </span>
        <h2 className="text-xl font-black text-game-dark mt-3 leading-tight uppercase tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1 font-semibold">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
