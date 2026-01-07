// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   base: "/",
//   plugins: [react()],
//   build: {
//     lib: {
//       entry: "src/widget-main.tsx",
//       name: "FormWidget",
//       fileName: "form-widget",
//       formats: ["es"],
//     },
//     rollupOptions: {
//       external: [],
//     },
//     outDir: "dist",
//     emptyOutDir: true,
//   },
//   // server: {
//   //   port: 3000,
//   // },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  build: {
    lib: {
      entry: "src/widget-main.tsx",
      name: "FormWidget",
      fileName: "form-widget",
      formats: ["es"],
    },
    outDir: "dist",
    emptyOutDir: true,
    target: "esnext",
  },
});
