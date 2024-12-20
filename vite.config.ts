import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["aws-sdk", "mock-aws-s3", "nock", "@mapbox/node-pre-gyp"],
  },
  build: {
    rollupOptions: {
      external: ["aws-sdk", "mock-aws-s3", "nock", "@mapbox/node-pre-gyp"],
    },
  },
});
