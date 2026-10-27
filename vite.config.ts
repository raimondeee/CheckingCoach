import { defineConfig, type Plugin } from 'vite'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, relative } from 'node:path'

// GitHub Pages: VITE_BASE=/CheckingCoach/ npm run build ; local: './'
const base = process.env.VITE_BASE || './'

/** Stamp dist/sw.js with a build id (hash of all output files) and the precache list. */
function swVersion(): Plugin {
  let outDir = 'dist'
  return {
    name: 'checking-sw-version',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir },
    closeBundle() {
      const root = new URL(`./${outDir}/`, import.meta.url).pathname
      const files: string[] = []
      const walk = (d: string) => readdirSync(d).forEach((n) => { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : files.push(p) })
      walk(root)
      const rel = files.map((f) => relative(root, f).split('\\').join('/')).filter((f) => f !== 'sw.js' && !f.startsWith('.')).sort()
      const h = createHash('sha256')
      rel.forEach((f) => { h.update(f); h.update(readFileSync(join(root, f))) })
      const id = h.digest('hex').slice(0, 12)
      const precache = ['./', ...rel.map((f) => `./${f}`)]
      const sw = join(root, 'sw.js')
      writeFileSync(sw, readFileSync(sw, 'utf8').replace('__BUILD_ID__', id).replace('__PRECACHE__', JSON.stringify(precache)))
      console.log(`sw.js stamped: build ${id}, ${precache.length} precached URLs`)
    },
  }
}
export default defineConfig({ base, plugins: [swVersion()], build: { outDir: 'dist', emptyOutDir: true } })
