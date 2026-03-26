import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        config: resolve(import.meta.dirname, 'src/config.ts'),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`,
      cssFileName: 'style',
    },
    rolldownOptions: {
      external: ['vitepress', 'mermaid', 'vue', /^vitepress\//],
    },
  },
});
