// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Example for splitting vendor libraries
          // Add more chunks if needed
        },
      },
    },
    chunkSizeWarningLimit: 500, // Adjust the chunk size warning limit as needed
  },
});
