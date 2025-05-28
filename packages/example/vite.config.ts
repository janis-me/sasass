import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // This should be a default in vite IMO. Not needed for themed, but highly recommended for all new vite apps.
        api: 'modern-compiler',
      },
    },
  },
});
