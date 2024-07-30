import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  define: {
    global: {},
  },
  test: {
    coverage: {
      reporter: ['html', 'text'],
      exclude: [
        'node_modules/',
        'dist',
        '.vite',
        'vite.config.ts',
        'postcss.config.js',
        'tailwind.config.js',
        '.eslintrc.cjs',
        'svg.d.ts',
        'typings.d.ts',
        '**/*.spec.{js,jsx,ts,tsx}',
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
});
