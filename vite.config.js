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
    // host: '0.0.0.0',
    port: 3000,
    // https: {
    //   ca: fs.readFileSync('./src/certs/ca.crt'),
    //   key: fs.readFileSync('./src/certs/mosquitto_server.key'),
    //   cert: fs.readFileSync('./src/certs/mosquitto_server.crt'),
    // },

    hmr: {
      // ...
      protocol: 'ws', // Use 'ws' for WebSocket
    },
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
