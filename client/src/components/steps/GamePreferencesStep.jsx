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

const CHIP_STYLES = [
  { bg: 'bg-game-yellow',      text: 'text-game-dark',    border: 'border-game-dark' },
  { bg: 'bg-pastel-pink',      text: 'text-pink-900',     border: 'border-pink-900'  },
  { bg: 'bg-pastel-mint',      text: 'text-emerald-900',  border: 'border-emerald-900'},
  { bg: 'bg-pastel-peach',     text: 'text-orange-900',   border: 'border-orange-900'},
  { bg: 'bg-pastel-sky',       text: 'text-blue-900',     border: 'border-blue-900'  },
  { bg: 'bg-pastel-lav',       text: 'text-violet-900',   border: 'border-violet-900'},
];

const CHIP_ROTS = ['-2deg', '1.5deg', '-1deg', '2.5deg', '-0.5deg', '1deg', '-2.5deg', '0.8deg'];

function chipStyle(i) { return CHIP_STYLES[i % CHIP_STYLES.length]; }
function chipRot(i)   { return CHIP_ROTS[i % CHIP_ROTS.length]; }

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

export default function GamePreferencesStep({ value, onChange, step }) {
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
  const isAlreadySelected = selected.some((g) => g.toLowerCase() === trimmedQuery.toLowerCase());
  const isExactPredefined = PREDEFINED_GAMES.some((g) => g.toLowerCase() === trimmedQuery.toLowerCase());
  const showAddCustom = trimmedQuery.length > 0 && !isExactPredefined && !isAlreadySelected;

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
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
        if (suggestions.length > 0) addGame(suggestions[0]);
        else addGame(trimmedQuery);
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
      subtitle="Search or type any game name and press Enter"
      step={step}
    >
      {/* Selected game chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 min-h-[36px]">
          {selected.map((game, i) => {
            const cs = chipStyle(i);
            return (
              <span
                key={game}
                style={{ transform: `rotate(${chipRot(i)})`, display: 'inline-flex' }}
                className={`items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-black animate-stamp
                  ${cs.bg} ${cs.text} border-[2px] ${cs.border} shadow-hard-sm`}
              >
                🎲 {game}
                <button
                  onClick={() => removeGame(game)}
                  aria-label={`Remove ${game}`}
                  className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-black
                    opacity-70 hover:opacity-100 hover:bg-black/10 transition-opacity"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Search input */}
      <div ref={containerRef} className="relative">
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-[3px] transition-all duration-150
            ${open
              ? 'border-game-purple bg-pastel-lav-l shadow-hard-purple'
              : 'border-gray-300 bg-gray-50 hover:border-game-dark'
            }`}
        >
          <span className="text-gray-500 text-base select-none">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selected.length ? 'Add another game…' : 'Search or type a game name…'}
            className="flex-1 bg-transparent text-game-dark font-bold placeholder:text-gray-300 placeholder:font-normal focus:outline-none text-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="text-gray-400 hover:text-game-dark text-lg leading-none font-black transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && (suggestions.length > 0 || showAddCustom) && (
          <div className="absolute top-full left-0 right-0 z-30 mt-1.5 bg-white rounded-2xl
            shadow-hard-lg border-[2px] border-game-dark overflow-hidden animate-slide-up max-h-64 overflow-y-auto">
            {suggestions.map((game) => (
              <button
                key={game}
                onMouseDown={(e) => { e.preventDefault(); addGame(game); }}
                className="w-full text-left px-4 py-2.5 text-sm font-bold text-game-dark
                  hover:bg-game-yellow transition-colors duration-100 flex items-center gap-2.5"
              >
                <span className="text-base opacity-70">🎲</span>
                <HighlightMatch text={game} query={query} />
              </button>
            ))}

            {showAddCustom && (
              <button
                onMouseDown={(e) => { e.preventDefault(); addGame(trimmedQuery); }}
                className="w-full text-left px-4 py-2.5 text-sm font-black text-game-purple
                  hover:bg-pastel-lav-l transition-colors duration-100 flex items-center gap-2.5
                  border-t-[2px] border-game-dark"
              >
                <span className="text-base">✚</span>
                Add &ldquo;<strong>{trimmedQuery}</strong>&rdquo;
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-wide">
        {selected.length === 0
          ? '🎯 Pick at least one — press Enter or click a suggestion'
          : selected.length === 1
          ? '✓ Nice pick! Add more or Roll Forward'
          : `${selected.length} games locked in · Backspace removes last`}
      </p>

      {/* Quick picks */}
      {selected.length === 0 && !query && (
        <div className="mt-4">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wide mb-2">
            ⚡ Quick picks
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PICKS.map((g, i) => (
              <button
                key={g}
                onClick={() => addGame(g)}
                style={{ transform: `rotate(${chipRot(i)})` }}
                className="btn-game px-3 py-1.5 rounded-full bg-white text-game-dark text-xs font-black
                  border-[2px] border-game-dark shadow-hard-sm
                  hover:bg-game-yellow hover:-translate-y-0.5
                  active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                  transition-all duration-150"
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
