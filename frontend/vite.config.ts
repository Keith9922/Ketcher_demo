import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { requirePolyfillPlugin } from "./vite-plugin-require-polyfill";

export default defineConfig({
  plugins: [react(), requirePolyfillPlugin()],
  optimizeDeps: {
    include: [
      "ketcher-react",
      "ketcher-core",
      "miew-react",
      "react-contexify",
      "ajv",
      "lodash",
      "clsx",
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: [
      { find: /^process$/, replacement: "process/browser" },
    ],
  },
  define: {
    "process.env": {},
    global: "globalThis",
  },
  server: {
    host: "0.0.0.0",
    port: 50002,
    strictPort: true,
    allowedHosts: [
      "axjj1426074.bohrium.tech",
      "localhost",
      "127.0.0.1",
      "10.5.96.31"
    ],
    proxy: {
      "/api": {
        target: "http://localhost:50001",
        changeOrigin: true,
      },
      "/ketcher": {
        target: "https://lifescience.opensource.epam.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          chakra: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
});
