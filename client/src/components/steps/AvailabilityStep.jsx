import StepCard from '../StepCard';

const TIME_SLOTS = [
  { id: 'Morning',   emoji: '🌅', label: 'Morning',   time: '9am–12pm' },
  { id: 'Afternoon', emoji: '☀️', label: 'Afternoon', time: '12pm–5pm' },
  { id: 'Evening',   emoji: '🌆', label: 'Evening',   time: '5pm–10pm' },
  { id: 'Late Night',emoji: '🌙', label: 'Late Night',time: '10pm+'    },
];

const DAY_NAMES   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getNext14Days() {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function AvailabilityStep({ value, onChange, step }) {
  const dates = getNext14Days();
  const availability = value.availability;

  const isDateSelected = (d) => availability.some((a) => a.date === formatDate(d));
  const getSlots = (d) => {
    const entry = availability.find((a) => a.date === formatDate(d));
    return entry ? entry.timeSlots : [];
  };

  const toggleDate = (d) => {
    const dateStr = formatDate(d);
    const existing = availability.find((a) => a.date === dateStr);
    if (existing) {
      onChange('availability', availability.filter((a) => a.date !== dateStr));
    } else {
      onChange('availability', [...availability, { date: dateStr, timeSlots: [] }]);
    }
  };

  const toggleSlot = (d, slotId) => {
    const dateStr = formatDate(d);
    onChange(
      'availability',
      availability.map((a) => {
        if (a.date !== dateStr) return a;
        const hasSlot = a.timeSlots.includes(slotId);
        return {
          ...a,
          timeSlots: hasSlot
            ? a.timeSlots.filter((s) => s !== slotId)
            : [...a.timeSlots, slotId],
        };
      })
    );
  };

  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

  return (
    <StepCard
      emoji="📅"
      title="When can you play?"
      subtitle="Tap the squares that work for you!"
      step={step}
    >
      {/* Date grid — board-game squares */}
      <div className="grid grid-cols-7 gap-1.5">
        {dates.map((d, i) => {
          const selected = isDateSelected(d);
          const today    = i === 0;
          const weekend  = isWeekend(d);
          const tinyRot  = (i % 3 === 0 ? -1.5 : i % 3 === 1 ? 0.8 : -0.5);

          return (
            <button
              key={formatDate(d)}
              onClick={() => toggleDate(d)}
              style={{ transform: `rotate(${tinyRot}deg)` }}
              className={`btn-game relative flex flex-col items-center py-2 px-1 rounded-xl text-xs
                font-black transition-all duration-150 border-[2px]
                hover:-translate-y-0.5
                active:translate-x-0.5 active:translate-y-0.5
                ${selected
                  ? 'bg-game-yellow text-game-dark border-game-dark shadow-hard-sm'
                  : weekend
                  ? 'bg-pastel-peach-l text-orange-700 border-orange-300 hover:border-game-dark hover:shadow-hard-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-game-dark hover:shadow-hard-sm'
                }`}
            >
              <span className={`text-[10px] font-bold mb-0.5 ${selected ? 'text-game-dark/70' : 'text-gray-400'}`}>
                {DAY_NAMES[d.getDay()]}
              </span>
              <span className="text-sm font-black">{d.getDate()}</span>
              <span className={`text-[9px] mt-0.5 ${selected ? 'text-game-dark/60' : 'text-gray-400'}`}>
                {MONTH_NAMES[d.getMonth()]}
              </span>
              {today && !selected && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-game-red rounded-full border-2 border-white animate-pulse" />
              )}
              {selected && (
                <span className="text-[11px] mt-0.5">🎯</span>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 font-bold mt-2 text-center uppercase tracking-wide">
        <span className="inline-block w-2.5 h-2.5 bg-game-red rounded-full mr-1 mb-0.5 align-middle" />
        = today · 🟠 = weekend
      </p>

      {/* Time slots */}
      {availability.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wide">
            ⏰ Pick time slots:
          </p>
          {availability
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((entry) => {
              const d = new Date(entry.date + 'T00:00:00');
              return (
                <div
                  key={entry.date}
                  className="bg-pastel-lav-l rounded-2xl p-3 animate-stamp
                    border-[2px] border-game-dark shadow-hard-sm"
                >
                  <p className="text-xs font-black text-game-purple mb-2 uppercase tracking-wide">
                    {DAY_NAMES[d.getDay()]}, {d.getDate()} {MONTH_NAMES[d.getMonth()]}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TIME_SLOTS.map((slot, si) => {
                      const active = entry.timeSlots.includes(slot.id);
                      return (
                        <button
                          key={slot.id}
                          onClick={() => toggleSlot(d, slot.id)}
                          style={{ transform: `rotate(${si % 2 === 0 ? -0.5 : 0.5}deg)` }}
                          className={`btn-game flex items-center gap-2 px-3 py-2 rounded-xl text-xs
                            font-black transition-all duration-150 border-[2px] active:translate-x-0.5 active:translate-y-0.5
                            ${active
                              ? 'bg-game-purple text-white border-game-dark shadow-hard-sm'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-game-dark hover:shadow-hard-sm'
                            }`}
                        >
                          <span>{slot.emoji}</span>
                          <span>
                            {slot.label}
                            <span className={`block text-[9px] ${active ? 'text-white/70' : 'text-gray-400'}`}>
                              {slot.time}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {availability.length === 0 && (
        <p className="text-center text-xs text-gray-500 font-bold mt-3 uppercase tracking-wide animate-fade-in">
          🎯 Tap any square to claim a spot!
        </p>
      )}
    </StepCard>
  );
}
