import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(rootDir, 'dist')
const indexPath = join(distDir, 'index.html')
const fallbackPath = join(distDir, '404.html')
const noJekyllPath = join(distDir, '.nojekyll')

if (!existsSync(indexPath)) {
  throw new Error('Cannot create GitHub Pages fallback: dist/index.html does not exist.')
}

copyFileSync(indexPath, fallbackPath)
writeFileSync(noJekyllPath, '')

console.log('Created dist/404.html and dist/.nojekyll for GitHub Pages.')
