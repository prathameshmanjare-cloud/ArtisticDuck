import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Two entries: the main SPA (index.html) and the standalone /connect digital card
// (connect/index.html), which ships its own lightweight bundle and static meta tags.
// Serve /connect (no trailing slash) from connect/index.html in dev and preview,
// mirroring the rewrite in vercel.json.
const connectRewrite = () => {
  const rewrite = (req, _res, next) => {
    if (req.url === '/connect' || req.url?.startsWith('/connect?')) req.url = req.url.replace('/connect', '/connect/')
    next()
  }
  return {
    name: 'connect-rewrite',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [react(), connectRewrite()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        connect: fileURLToPath(new URL('./connect/index.html', import.meta.url)),
      },
    },
  },
})
