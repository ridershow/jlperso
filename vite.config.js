import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = resolve(__dirname, 'src');

export default defineConfig({
  // Treat src/ as the web root so HTML paths like /css/main.css resolve naturally
  root: srcDir,

  // Static assets (images, pdf) served at / and copied as-is to dist/
  publicDir: resolve(__dirname, 'static'),

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(srcDir, 'index.html'),
        notFound: resolve(srcDir, '404.html'),
        gitguardian: resolve(srcDir, 'experiences/gitguardian.html'),
      },
    },
  },
});
