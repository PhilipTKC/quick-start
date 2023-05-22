import { defineConfig, splitVendorChunkPlugin } from 'vite';

import aurelia from '@aurelia/vite-plugin';
import UnoCSS from 'unocss/vite';

import markedVitePlugin, { Include } from "marked-vitejs-plugin";
import markedConfig from "./marked.config";

import path from 'path';

export default defineConfig({
  plugins: [
    markedVitePlugin({
      marked: markedConfig,
      include: [Include.HTML, Include.YAML, Include.TOC]
    }),
    UnoCSS(),
    splitVendorChunkPlugin(),
    aurelia({ pre: true, useDev: true }),
  ],
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
