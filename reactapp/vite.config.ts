import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv("all", process.cwd());
console.log(env.VITE_BASE_API_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(env.VITE_PORT) || 3000,
    host: "0.0.0.0",
  },
});
