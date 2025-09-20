import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"],
    exclude: ["tests/visual/**"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "content/**/*.md"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
