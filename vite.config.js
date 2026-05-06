import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  plugins: [
    {
      name: 'inject-env-into-html',
      transformIndexHtml(html) {
        return html.replace(
          '__GITHUB_TOKEN__',
          JSON.stringify(process.env.GITHUB_TOKEN || '')
        )
      }
    }
  ]
})
