import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",


    coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        exclude: [
            ...coverageConfigDefaults.exclude,
            "src/main.tsx", "src/vite-env.d.ts",
        ],
    },
  },
});
