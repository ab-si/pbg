import axios from 'axios';

// In dev:  VITE_API_URL is unset → baseURL '' → Vite proxy forwards /api/* to localhost:5001
// In prod: set VITE_API_URL=https://your-backend.railway.app in Vercel env vars
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export default api;
