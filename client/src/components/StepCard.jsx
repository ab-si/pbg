export default function StepCard({ emoji, title, subtitle, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-soft p-6">
      <div className="text-center mb-6">
        <span className="text-5xl inline-block animate-bounce-soft">{emoji}</span>
        <h2 className="text-xl font-black text-gray-800 mt-3 leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-gray-400 text-sm mt-1 font-medium">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
