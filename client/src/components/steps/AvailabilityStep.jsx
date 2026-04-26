import StepCard from '../StepCard';

const TIME_SLOTS = [
  { id: 'Morning', emoji: '🌅', label: 'Morning', time: '9am–12pm' },
  { id: 'Afternoon', emoji: '☀️', label: 'Afternoon', time: '12pm–5pm' },
  { id: 'Evening', emoji: '🌆', label: 'Evening', time: '5pm–10pm' },
  { id: 'Late Night', emoji: '🌙', label: 'Late Night', time: '10pm+' },
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

export default function AvailabilityStep({ value, onChange }) {
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
      subtitle="Pick all the dates that work for you"
    >
      <div className="grid grid-cols-7 gap-1.5">
        {dates.map((d, i) => {
          const selected = isDateSelected(d);
          const today = i === 0;
          const weekend = isWeekend(d);
          return (
            <button
              key={formatDate(d)}
              onClick={() => toggleDate(d)}
              className={`relative flex flex-col items-center py-2 px-1 rounded-2xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                selected
                  ? 'bg-gradient-to-b from-violet-400 to-fuchsia-400 text-white shadow-soft'
                  : weekend
                  ? 'bg-pastel-peach-l text-orange-600 hover:bg-pastel-peach'
                  : 'bg-gray-50 text-gray-600 hover:bg-pastel-lav-l hover:text-violet-600'
              }`}
            >
              <span className={`text-[10px] font-bold mb-0.5 ${selected ? 'text-white/80' : 'text-gray-400'}`}>
                {DAY_NAMES[d.getDay()]}
              </span>
              <span className="text-sm font-black">{d.getDate()}</span>
              <span className={`text-[9px] mt-0.5 ${selected ? 'text-white/70' : 'text-gray-400'}`}>
                {MONTH_NAMES[d.getMonth()]}
              </span>
              {today && !selected && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-fuchsia-400 rounded-full border-2 border-white" />
              )}
              {selected && (
                <span className="text-[10px] mt-0.5">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Today label */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        <span className="inline-block w-2.5 h-2.5 bg-fuchsia-400 rounded-full mr-1 mb-0.5 align-middle" />
        = today · 🟠 = weekend
      </p>

      {/* Time slots for selected dates */}
      {availability.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Pick time slots for each date:
          </p>
          {availability
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((entry) => {
              const d = new Date(entry.date + 'T00:00:00');
              return (
                <div
                  key={entry.date}
                  className="bg-pastel-lav-l rounded-2xl p-3 animate-fade-in"
                >
                  <p className="text-xs font-bold text-violet-700 mb-2">
                    {DAY_NAMES[d.getDay()]}, {d.getDate()} {MONTH_NAMES[d.getMonth()]}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TIME_SLOTS.map((slot) => {
                      const active = entry.timeSlots.includes(slot.id);
                      return (
                        <button
                          key={slot.id}
                          onClick={() => toggleSlot(d, slot.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
                            active
                              ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white shadow-soft'
                              : 'bg-white text-gray-600 hover:bg-pastel-lav hover:text-violet-700'
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
        <p className="text-center text-xs text-gray-400 mt-3 font-medium">
          Tap any date above to add it 👆
        </p>
      )}
    </StepCard>
  );
}
