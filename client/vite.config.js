import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: { 'process.env': process.env },
  server: { host: true },
  build: {
    sourcemap: true // Enable source maps for better debugging
  }
});
