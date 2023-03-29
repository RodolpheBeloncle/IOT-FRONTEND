import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import notifier from "vite-plugin-notifier";
import { Buffer } from "buffer/";

export default {
  plugins: [react(), notifier(), nodePolyfills()],
  server: {
    port: 4040,
  },

  resolve: {
    alias: {
      buffer: Buffer,
      stream: "stream-browserify",
      find: /^~/,
      replacement: "",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
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
