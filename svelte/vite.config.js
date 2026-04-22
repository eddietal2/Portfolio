import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../',
    rollupOptions: {
      output: {
        manualChunks: {
          'svelte-vendor': ['svelte'],
        },
      },
    },
    // Inline small assets to avoid extra round-trips
    assetsInlineLimit: 4096,
  },
})
