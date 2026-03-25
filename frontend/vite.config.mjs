import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@modules": path.resolve(__dirname, "./src/modules"),
    },
  },
  server: {
    port: 3000,
    open: false,
    host: "0.0.0.0",
    proxy: {
      // Khi React gọi đến /api, Vite sẽ tự động chuyển hướng sang localhost:8080
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
