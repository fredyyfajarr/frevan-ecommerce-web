import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|@reduxjs|react-redux)[\\/]/.test(id)) {
            return 'react-vendor';
          }
          if (/[\\/]node_modules[\\/](framer-motion|aos|react-slick|slick-carousel)[\\/]/.test(id)) {
            return 'animation-vendor';
          }
          if (/[\\/]node_modules[\\/](react-icons|react-toastify|react-modal)[\\/]/.test(id)) {
            return 'ui-vendor';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target:
          mode === 'development'
            ? 'http://localhost:3000'
            : 'https://be-ecommerce-isaac.vercel.app/',
        changeOrigin: true,
      },
    },
  },
}));