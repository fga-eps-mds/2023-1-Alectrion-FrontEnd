import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from 'vite-plugin-compression';
import zlib from 'zlib';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      compressionOptions: {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
      },
    }),
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024,
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
