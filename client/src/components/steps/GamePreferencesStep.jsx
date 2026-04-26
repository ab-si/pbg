import { useState, useRef, useEffect, useMemo } from 'react';
import StepCard from '../StepCard';

const PREDEFINED_GAMES = [
  'Avalon', 'Azul', 'Battleship', 'Cards Against Humanity', 'Catan',
  'Chess', 'Clue', 'Codenames', 'Coup', 'Dixit', 'Dominion',
  'Exploding Kittens', 'Jenga', 'Ludo', 'Mafia', 'Monopoly',
  'Pandemic', 'Pictionary', 'Poker', 'Risk', 'Scrabble',
  'Secret Hitler', 'Sequence', 'Splendor', 'Taboo', 'Terraforming Mars',
  'Ticket to Ride', 'Uno', 'Werewolf', 'Wingspan', '7 Wonders',
].sort();

const QUICK_PICKS = ['Catan', 'Codenames', 'Uno', 'Avalon', 'Exploding Kittens', 'Coup'];

const CHIP_PALETTES = [
  { bg: 'bg-pastel-lav',   text: 'text-violet-800',  ring: 'hover:bg-violet-100' },
  { bg: 'bg-pastel-pink',  text: 'text-pink-800',    ring: 'hover:bg-pink-100'   },
  { bg: 'bg-pastel-mint',  text: 'text-emerald-800', ring: 'hover:bg-emerald-100'},
  { bg: 'bg-pastel-peach', text: 'text-orange-800',  ring: 'hover:bg-orange-100' },
  { bg: 'bg-pastel-sky',   text: 'text-blue-800',    ring: 'hover:bg-blue-100'   },
];

function palette(i) {
  return CHIP_PALETTES[i % CHIP_PALETTES.length];
}

function HighlightMatch({ text, query }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-black">{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function GamePreferencesStep({ value, onChange }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const selected = value.gamePreferences;

  const suggestions = useMemo(() => {
    const q = query.toLowerCase().trim();
    const pool = PREDEFINED_GAMES.filter((g) => !selected.includes(g));
    if (!q) return pool.slice(0, 8);
    return pool.filter((g) => g.toLowerCase().includes(q)).slice(0, 7);
  }, [query, selected]);

  const trimmedQuery = query.trim();
  const isAlreadySelected = selected.some(
    (g) => g.toLowerCase() === trimmedQuery.toLowerCase()
  );
  const isExactPredefined = PREDEFINED_GAMES.some(
    (g) => g.toLowerCase() === trimmedQuery.toLowerCase()
  );
  const showAddCustom =
    trimmedQuery.length > 0 && !isExactPredefined && !isAlreadySelected;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addGame = (name) => {
    const cleaned = name.trim();
    if (!cleaned || selected.includes(cleaned)) return;
    onChange('gamePreferences', [...selected, cleaned]);
    setQuery('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const removeGame = (name) => {
    onChange('gamePreferences', selected.filter((g) => g !== name));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (trimmedQuery) {
        // Prefer first suggestion; fall back to custom entry
        if (suggestions.length > 0) {
          addGame(suggestions[0]);
        } else {
          addGame(trimmedQuery);
        }
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'Backspace' && !query && selected.length > 0) {
      removeGame(selected[selected.length - 1]);
    }
  };

  return (
    <StepCard
      emoji="🎮"
      title="Which games do you want to play?"
      subtitle="Search the list, or type any game name and press Enter"
    >
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
          {selected.map((game, i) => {
            const p = palette(i);
            return (
              <span
                key={game}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold animate-scale-in ${p.bg} ${p.text}`}
              >
                🎲 {game}
                <button
                  onClick={() => removeGame(game)}
                  aria-label={`Remove ${game}`}
                  className={`ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-black opacity-60 hover:opacity-100 transition-opacity ${p.ring}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Input + dropdown */}
      <div ref={containerRef} className="relative">
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all duration-200 ${
            open
              ? 'border-violet-300 bg-pastel-lav-l shadow-glow'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
          }`}
        >
          <span className="text-gray-400 text-base select-none">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selected.length ? 'Add another game…' : 'Search or type a game name…'}
            className="flex-1 bg-transparent text-gray-700 font-medium placeholder:text-gray-300 focus:outline-none text-sm"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-gray-300 hover:text-gray-500 text-lg leading-none transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && (suggestions.length > 0 || showAddCustom) && (
          <div className="absolute top-full left-0 right-0 z-30 mt-1.5 bg-white rounded-2xl shadow-soft-lg border border-gray-100 overflow-hidden animate-slide-up max-h-64 overflow-y-auto">
            {suggestions.map((game) => (
              <button
                key={game}
                onMouseDown={(e) => {
                  e.preventDefault();
                  addGame(game);
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pastel-lav-l hover:text-violet-700 transition-colors duration-100 flex items-center gap-2.5"
              >
                <span className="text-base opacity-70">🎲</span>
                <HighlightMatch text={game} query={query} />
              </button>
            ))}

            {showAddCustom && (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  addGame(trimmedQuery);
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold text-violet-600 hover:bg-pastel-lav-l transition-colors duration-100 flex items-center gap-2.5 border-t border-gray-100"
              >
                <span className="text-base">✚</span>
                Add &ldquo;<strong>{trimmedQuery}</strong>&rdquo;
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-400 mt-2 font-medium">
        {selected.length === 0
          ? 'Pick at least one — press Enter or click a suggestion'
          : selected.length === 1
          ? '✓ Great pick! Add more or continue'
          : `${selected.length} games selected · Backspace removes last`}
      </p>

      {/* Quick picks — shown only when list is empty and no query */}
      {selected.length === 0 && !query && (
        <div className="mt-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
            ⚡ Quick picks
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PICKS.map((g) => (
              <button
                key={g}
                onClick={() => addGame(g)}
                className="px-3 py-1.5 rounded-full bg-pastel-lav-l text-violet-600 text-xs font-semibold hover:bg-pastel-lav hover:scale-105 active:scale-95 transition-all duration-150"
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}
    </StepCard>
  );
}
