import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const rootEnv = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const apiPort = rootEnv.SERVER_PORT || rootEnv.API_PORT || '5001';
  const apiTarget = rootEnv.VITE_API_PROXY_TARGET || `http://localhost:${apiPort}`;

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
