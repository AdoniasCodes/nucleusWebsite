#!/usr/bin/env node
/**
 * Fails if an em dash has crept back into the repo. Wired to `pnpm run check:emdash`. Run it before any deploy that touches copy.
 *
 * Scope note: this checks SOURCE. Copy that lives only in the CMS database (staff bios, the
 * SEO globals) is not visible here, so run `pnpm run fix:emdash` after editing anything in
 * the Payload admin.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOTS = ['src', 'public', 'scripts']
const EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.md', '.txt', '.json', '.html'])
const SKIP = new Set(['node_modules', '.next', '.git', 'fonts', 'images', 'video', 'media'])

const EM = '\u2014' // referenced by escape so this file never trips its own check

const hits = []

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue
    const p = join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) walk(p)
    else if (EXT.has(extname(p))) {
      const lines = readFileSync(p, 'utf8').split('\n')
      lines.forEach((line, i) => {
        if (line.includes(EM)) hits.push(`${p}:${i + 1}: ${line.trim().slice(0, 140)}`)
      })
    }
  }
}

for (const r of ROOTS) {
  try {
    walk(r)
  } catch {
    // root not present in this checkout
  }
}

if (hits.length) {
  console.error(`\n${hits.length} em dash(es) found. The workspace rule is zero, in copy AND in comments:\n`)
  for (const h of hits) console.error('  ' + h)
  console.error('\nReplace with a comma, a colon, a full stop or parentheses, whichever the sentence actually needs.\n')
  process.exit(1)
}

console.log('No em dashes in source.')
