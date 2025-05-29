// @ts-check
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://surimi.dev',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'rose-pine-dawn',
        dark: 'kanagawa-dragon',
      },
    },
  },
});
