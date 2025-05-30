import mdx from '@astrojs/mdx';
import { transformerMetaHighlight } from '@shikijs/transformers';
import { defineConfig } from 'astro/config';
import autolinkHeadings from 'rehype-autolink-headings';
import remarkCustomHeaderId from 'remark-custom-header-id';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://surimi.dev',
  integrations: [
    mdx({
      rehypePlugins: [
        [
          autolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['markdown-anchor'],
            },
          },
        ],
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: 'content', maxDepth: 3 }], remarkCustomHeaderId],
    shikiConfig: {
      transformers: [transformerMetaHighlight()],
      themes: {
        light: 'rose-pine-dawn',
        dark: 'kanagawa-dragon',
      },
    },
  },
});
