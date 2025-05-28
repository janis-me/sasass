import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      structured: true,
      targets: [
        {
          src: 'src',
          dest: '',
        },
      ],
    }),
  ],
  build: {
    lib: {
      name: 'surimi',
      entry: resolve(__dirname, 'src/index.scss'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      preserveEntrySignatures: 'strict',
    },
  },
});
