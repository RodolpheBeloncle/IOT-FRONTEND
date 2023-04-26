import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import notifier from 'vite-plugin-notifier';
import dotenv from 'dotenv';

dotenv.config();
import { Buffer } from 'buffer/';

export default {
  plugins: [
    react(),
    notifier(),
    nodePolyfills(),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      buffer: Buffer,
      stream: 'stream-browserify',
      find: /^~/,
      replacement: '',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
