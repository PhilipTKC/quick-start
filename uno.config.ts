// uno.config.ts
import { defineConfig, presetTypography, presetAttributify, presetWind, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetWind(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Roboto', 'Varela'],
        mono: ['Fira Code'],
      },
    })
  ],
})