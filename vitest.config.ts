import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: { reporter: ['lcov', 'html'] },
    environment: 'jsdom',
    setupFiles: './src/config/tests/setup-tests.ts',
  },
});
