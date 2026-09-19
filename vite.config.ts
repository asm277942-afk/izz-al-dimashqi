import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: path.resolve(process.cwd(), "client"),
  resolve: {
    alias: { "@": path.resolve(process.cwd(), "client/src") },
  },
  build: { outDir: path.resolve(process.cwd(), "dist"), emptyOutDir: true },
});
