import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/": {
      target: "http://localhost:5000", // Your backend server // Remove `/api` before sending
    },
  },
});
