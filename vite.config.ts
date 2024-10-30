import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-playground/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/assets/css/custom.scss";',
      },
    },
  },
});
