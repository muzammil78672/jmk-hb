import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages project site: only apply base path in production builds.
// Local `npm run dev` stays at http://localhost:5173/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        if (command !== 'build') return
        const dist = resolve(__dirname, 'dist')
        // GitHub Pages serves 404.html for unknown paths — reuse index for SPA routes.
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      },
    },
  ],
  base: command === 'build' ? '/jmk-hb/' : '/',
}))
