import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function normalizeBasePath(basePath: string) {
  if (basePath === '/') {
    return '/'
  }

  return `/${basePath.replace(/^\/+|\/+$/g, '')}/`
}

function getBasePath() {
  if (process.env.VITE_BASE_PATH) {
    return normalizeBasePath(process.env.VITE_BASE_PATH)
  }

  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  base: getBasePath(),
  plugins: [react()],
})
