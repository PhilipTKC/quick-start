import { defineConfig } from 'vite';

import aurelia from '@aurelia/vite-plugin';
import UnoCSS from 'unocss/vite';
import markdown, { Mode } from 'vite-plugin-markdown';

import markdownItConfig from './markdown.config';

import path from 'path';

export default defineConfig({
  plugins: [
    aurelia(),
    UnoCSS(),
    markdown({ mode: [Mode.HTML, Mode.TOC], markdownIt: markdownItConfig }),
  ],
  resolve: {
    alias:
    {
      '@': path.resolve(__dirname, './src')
    }
  },
  assetsInclude: ['_content/**/*.md']
});
