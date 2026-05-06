import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  define: {
    '__GITHUB_TOKEN__': JSON.stringify(process.env.GITHUB_TOKEN || '')
  }
})
