import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Both fields are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/admin/login', form);
      localStorage.setItem('admin_token', data.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error || 'Login failed. Check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-lav via-pastel-pink to-pastel-sky flex items-center justify-center px-4 font-lato">
      {/* Soft blobs */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#C3B1E1', top: '-80px', right: '-80px' }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#AED9E0', bottom: '-60px', left: '-60px' }}
      />

      <div
        className={`relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft-lg p-8 w-full max-w-sm transition-all duration-600 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Icon + title */}
        <div className="text-center mb-7">
          <span className="text-5xl inline-block animate-bounce-soft">🔐</span>
          <h1 className="text-2xl font-black text-gray-800 mt-3">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Game Night Organizer Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="admin"
              autoComplete="username"
              autoFocus
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-800 font-medium placeholder:text-gray-300 focus:border-violet-300 focus:bg-pastel-lav-l transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-gray-50 text-gray-800 font-medium placeholder:text-gray-300 focus:border-violet-300 focus:bg-pastel-lav-l transition-all duration-200"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-center animate-fade-in">
              <p className="text-red-500 text-sm font-semibold">⚠️ {error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all duration-200 mt-2 ${
              loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:shadow-glow hover:-translate-y-0.5 active:scale-95'
            }`}
          >
            {loading ? '🔑 Logging in...' : 'Enter Dashboard →'}
          </button>
        </form>

        {/* Back link */}
        <p className="text-center mt-5">
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-violet-500 transition-colors font-medium"
          >
            ← Back to survey
          </a>
        </p>
      </div>
    </div>
  );
}
