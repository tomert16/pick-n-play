import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/api1': {
        target: env.VITE_API_ENDPOINT,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ''),
      },
      headers: {
        Connection: "keep-alive"
      }
    },
    host: true,
    watch: {
      usePolling: true
    }
  },
}});

