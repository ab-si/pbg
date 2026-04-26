import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponseCard from '../components/admin/ResponseCard';
import SkeletonCard from '../components/admin/SkeletonCard';

const FOOD_OPTIONS = ['All', 'Veg', 'Non-veg', 'Vegan', 'Jain', 'No preference'];
const DRINKS_OPTIONS = ['All', 'Yes', 'No', 'Maybe'];

function StatCard({ emoji, label, value, sub, bg }) {
  return (
    <div className={`${bg} rounded-2xl px-4 py-3 flex items-center gap-3`}>
      <span className="text-2xl">{emoji}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide leading-none mb-0.5">
          {label}
        </p>
        <p className="font-black text-gray-800 text-lg leading-tight truncate">{value}</p>
        {sub && <p className="text-xs text-gray-400 font-medium">{sub}</p>}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 active:scale-95 ${
        active
          ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white shadow-soft'
          : 'bg-white text-gray-500 hover:bg-pastel-lav-l hover:text-violet-600 shadow-soft'
      }`}
    >
      {label}
    </button>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [foodFilter, setFoodFilter] = useState('All');
  const [drinksFilter, setDrinksFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem('admin_token');

  const fetchResponses = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError('');
      try {
        const { data } = await axios.get('/api/responses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResponses(data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('admin_token');
          navigate('/admin', { replace: true });
        } else {
          setError('Failed to load responses. Try refreshing.');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token, navigate]
  );

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin', { replace: true });
  };

  // Stats
  const stats = useMemo(() => {
    if (!responses.length) return null;

    const gameCounts = {};
    responses.forEach((r) =>
      (r.gamePreferences || []).forEach((g) => {
        gameCounts[g] = (gameCounts[g] || 0) + 1;
      })
    );
    const topGame = Object.entries(gameCounts).sort((a, b) => b[1] - a[1])[0];

    const foodCounts = {};
    responses.forEach((r) => {
      if (r.foodPreference)
        foodCounts[r.foodPreference] = (foodCounts[r.foodPreference] || 0) + 1;
    });
    const topFood = Object.entries(foodCounts).sort((a, b) => b[1] - a[1])[0];

    const drinkYes = responses.filter((r) => r.drinks === 'Yes').length;

    return { topGame, topFood, drinkYes };
  }, [responses]);

  // Game popularity — aggregated from all responses
  const gameStats = useMemo(() => {
    const counts = {};
    responses.forEach((r) =>
      (r.gamePreferences || []).forEach((g) => {
        const key = g.trim();
        if (key) counts[key] = (counts[key] || 0) + 1;
      })
    );
    return Object.entries(counts)
      .map(([game, votes]) => ({ game, votes }))
      .sort((a, b) => b.votes - a.votes);
  }, [responses]);

  const totalGameVotes = gameStats.reduce((sum, g) => sum + g.votes, 0);

  // Filtered list
  const filtered = useMemo(() => {
    return responses.filter((r) => {
      const foodOk = foodFilter === 'All' || r.foodPreference === foodFilter;
      const drinkOk = drinksFilter === 'All' || r.drinks === drinksFilter;
      return foodOk && drinkOk;
    });
  }, [responses, foodFilter, drinksFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lav-l via-white to-pastel-sky-l font-lato">
      {/* Top nav */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-soft">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎲</span>
            <div>
              <p className="font-black text-gray-800 text-sm leading-tight">Game Night Admin</p>
              <p className="text-xs text-gray-400 font-medium">Response Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchResponses(true)}
              disabled={refreshing}
              className="px-3 py-1.5 rounded-xl bg-pastel-lav-l text-violet-700 text-xs font-bold hover:bg-pastel-lav active:scale-95 transition-all duration-150"
            >
              {refreshing ? '⟳ Refreshing…' : '⟳ Refresh'}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 active:scale-95 transition-all duration-150"
            >
              Logout →
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        {!loading && responses.length > 0 && stats && (
          <div className="grid grid-cols-3 gap-3 animate-fade-in">
            <StatCard
              emoji="👥"
              label="Total"
              value={responses.length}
              sub={responses.length === 1 ? 'response' : 'responses'}
              bg="bg-pastel-lav-l"
            />
            <StatCard
              emoji="🎮"
              label="Top Game"
              value={stats.topGame ? stats.topGame[0] : '—'}
              sub={stats.topGame ? `${stats.topGame[1]} vote${stats.topGame[1] > 1 ? 's' : ''}` : ''}
              bg="bg-pastel-peach-l"
            />
            <StatCard
              emoji="🥂"
              label="Want Drinks"
              value={`${stats.drinkYes} / ${responses.length}`}
              sub="said yes"
              bg="bg-pastel-pink-l"
            />
          </div>
        )}

        {/* Game Popularity */}
        {!loading && gameStats.length > 0 && (
          <div className="bg-white rounded-3xl shadow-soft p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-gray-800 text-base">🎮 Game Popularity</h2>
              <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full font-medium">
                {totalGameVotes} total vote{totalGameVotes !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-2">
              {gameStats.map((item, i) => {
                const pct = totalGameVotes > 0
                  ? Math.round((item.votes / totalGameVotes) * 100)
                  : 0;
                const MEDALS = ['🥇', '🥈', '🥉'];
                const medal = MEDALS[i] ?? null;
                const isTop3 = i < 3;

                return (
                  <div
                    key={item.game}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${
                      isTop3 ? 'bg-pastel-lav-l' : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0 select-none">
                      {medal ?? '🎲'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-sm truncate leading-none ${
                            isTop3 ? 'font-black text-gray-800' : 'font-bold text-gray-700'
                          }`}
                        >
                          {item.game}
                        </span>
                        <span className="text-xs font-bold text-gray-500 ml-3 flex-shrink-0">
                          {item.votes} vote{item.votes !== 1 ? 's' : ''} &middot; {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        {!loading && responses.length > 0 && (
          <div className="bg-white rounded-2xl shadow-soft p-4 space-y-3 animate-fade-in">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                🍕 Filter by Food
              </p>
              <div className="flex flex-wrap gap-2">
                {FOOD_OPTIONS.map((o) => (
                  <FilterChip
                    key={o}
                    label={o}
                    active={foodFilter === o}
                    onClick={() => setFoodFilter(o)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                🍹 Filter by Drinks
              </p>
              <div className="flex flex-wrap gap-2">
                {DRINKS_OPTIONS.map((o) => (
                  <FilterChip
                    key={o}
                    label={o}
                    active={drinksFilter === o}
                    onClick={() => setDrinksFilter(o)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results count when filtered */}
        {!loading && (foodFilter !== 'All' || drinksFilter !== 'All') && (
          <p className="text-sm text-gray-500 font-medium animate-fade-in">
            Showing{' '}
            <span className="font-black text-violet-600">{filtered.length}</span> of{' '}
            {responses.length} responses
            {filtered.length !== responses.length && (
              <button
                onClick={() => { setFoodFilter('All'); setDrinksFilter('All'); }}
                className="ml-2 text-xs text-fuchsia-500 font-bold hover:underline"
              >
                Clear filters ×
              </button>
            )}
          </p>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center animate-fade-in">
            <p className="text-red-500 font-semibold text-sm">⚠️ {error}</p>
            <button
              onClick={() => fetchResponses()}
              className="mt-2 text-xs text-red-400 font-bold hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && responses.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <span className="text-6xl block mb-4">🎲</span>
            <h2 className="text-xl font-black text-gray-600 mb-2">No responses yet</h2>
            <p className="text-gray-400 font-medium text-sm">
              Share the survey link and responses will appear here!
            </p>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 text-white font-bold text-sm shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200"
            >
              Open Survey →
            </a>
          </div>
        )}

        {/* Empty filter result */}
        {!loading && !error && responses.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <span className="text-5xl block mb-3">🔍</span>
            <p className="text-gray-500 font-semibold">No responses match your filters.</p>
            <button
              onClick={() => { setFoodFilter('All'); setDrinksFilter('All'); }}
              className="mt-3 text-sm text-violet-500 font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Response cards grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <div key={r._id} className="animate-slide-up">
                <ResponseCard response={r} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
