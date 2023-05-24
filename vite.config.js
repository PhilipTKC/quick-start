import { defineConfig, splitVendorChunkPlugin } from 'vite';

import aurelia from '@aurelia/vite-plugin';
import UnoCSS from 'unocss/vite';

import micromarkPlugin, { Include, Use } from "/home/philip/Development/Latest/_remarked-plugin-template"

import path from 'path';

export default defineConfig({
  plugins: [
    micromarkPlugin({
      include: [Include.HTML, Include.FRONTMATTER],
      use: [Use.GFM, Use.FRONTMATTER]
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
