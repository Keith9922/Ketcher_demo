import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
    port: 8888,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
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
  },
});
