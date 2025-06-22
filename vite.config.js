import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // UMS APIs
      '/ums': {
        target: 'http://18.184.52.10:5003',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ums/, '/api/v1/ums'),
      },

      // CMS APIs
      '/cms': {
        target: 'http://18.184.52.10:5008',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cms/, '/api/v1/cms'),
      },
    },
  },
});
