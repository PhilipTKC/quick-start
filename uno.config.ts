// uno.config.ts
import { transformerCompileClass } from 'unocss';
import { transformerDirectives, transformerVariantGroup } from 'unocss';
import { defineConfig, presetTypography, presetAttributify, presetWind, presetWebFonts, presetUno } from 'unocss';

export default defineConfig({
  theme: {
    fontFamily: {
      sans: '\'Roboto\', sans-serif',
      mono: '\'Fira Code\', monospace',
    },
  },
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Roboto', 'Varela'],
        mono: ['Fira Code'],
      },
    })
  ],
  transformers: [
    transformerCompileClass(),
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})