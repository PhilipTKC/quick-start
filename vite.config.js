import { defineConfig, splitVendorChunkPlugin } from 'vite';

import aurelia from '@aurelia/vite-plugin';
import UnoCSS from 'unocss/vite';
import markdown, { Mode } from 'vite-plugin-markdown';

import markdownItConfig from './markdown.config';

import path from 'path';

export default defineConfig({
  plugins: [
    UnoCSS(),
    splitVendorChunkPlugin(),
    aurelia({ pre: true, useDev: true }),
    markdown({ mode: [Mode.HTML, Mode.TOC], markdownIt: markdownItConfig }),
  ],
  /*
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[hash:base64:5]',
    }
  },
  */
  base: "/",
  resolve: {
    alias:
    {
      '@qs': path.resolve(__dirname, './src')
    }
  },
  assetsInclude: ['_content/**/*.md'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "aurelia": ["aurelia", "@aurelia/router"],
          "fortawesome": ["@fortawesome/fontawesome-svg-core", "@fortawesome/free-solid-svg-icons", "@fortawesome/free-brands-svg-icons"],
        }
      }
    }
  }
});
