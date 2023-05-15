import { defineConfig } from 'vite';

import aurelia from '@aurelia/vite-plugin';
import UnoCSS from 'unocss/vite';
import markdown, { Mode } from 'vite-plugin-markdown';

import markdownItConfig from './markdown.config';

import path from 'path';

export default defineConfig({
  plugins: [
    UnoCSS(),
    aurelia(),
    markdown({ mode: [Mode.HTML, Mode.TOC], markdownIt: markdownItConfig }),
  ],
  base: "/",
  resolve: {
    alias:
    {
      '@': path.resolve(__dirname, './src')
    }
  },
  assetsInclude: ['_content/**/*.md'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "aurelia": ["aurelia"],
          "fortawesome": ["@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/free-brands-svg-icons"],
        }
      }
    }
  }
});
