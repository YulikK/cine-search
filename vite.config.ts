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
        '.eslintrc.js',
        'svg.d.ts',
        'typings.d.ts',
        '**/*.spec.{js,jsx,ts,tsx}',
        '.next/',
        'next-env.d.ts',
        'next.config.js',
        'src/types/',
        'src/pages/_document.tsx',
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/vitest.setup.ts',
  },
});
