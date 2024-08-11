import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: './app/tests/vitest.setup.ts',
    globals: true,
    environment: 'jsdom',
    env: loadEnv('test', process.cwd(), ''),
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text'],
      exclude: [
        'node_modules/',
        'dist',
        '.vite',
        'vite.config.remix.ts',
        'vite.config.vitest.ts',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        'postcss.config.js',
        'tailwind.config.js',
        '.eslintrc.cjs',
        'svg.d.ts',
        'typings.d.ts',
        '**/*.spec.{js,jsx,ts,tsx}',
        '.next/',
        'app/types/',
        'build/',
        'next-env.d.ts',
        'next.config.js',
        'src/types/',
        'src/pages/_document.tsx',
      ],
    },
  },
});
