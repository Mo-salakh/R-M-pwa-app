// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Для использования пути в ESM мы получаем путь через import.meta.url
const currentDir = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(currentDir, './src/app'),
      '@shared': path.resolve(currentDir, './src/shared'),
      '@components': path.resolve(currentDir, './src/shared/components'),
      '@features': path.resolve(currentDir, './src/features'),
      '@entities': path.resolve(currentDir, './src/entities'),
      '@widgets': path.resolve(currentDir, './src/widgets'),
      '@pages': path.resolve(currentDir, './src/pages'),
    }
  }
});