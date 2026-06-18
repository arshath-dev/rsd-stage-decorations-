import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        testimonials: resolve(__dirname, 'testimonials/index.html')
      }
    }
  }
});
