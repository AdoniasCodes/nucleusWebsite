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

const ROOTS = ['src', 'public', 'scripts', '.'] // '.' catches root configs like next.config.ts
const EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.md', '.txt', '.json', '.html'])
const SKIP = new Set([
  'node_modules', '.next', '.git', 'fonts', 'images', 'video', 'media',
  'playwright-report', 'test-results', 'coverage', 'dist', // generated, not authored
])

const EM = '\u2014' // check:emdash tooling, referenced by escape

// The literal character is only one of the ways an em dash reaches a page. Seed files in this
// repo write JSON escapes, and hand-written HTML uses entities; both render as an em dash to
// the reader, so all three forms have to fail the check. A line tagged `check:emdash` is the
// tooling referring to the character on purpose and is skipped.
const FORMS = [EM, String.raw`\u2014`, '&mdash;', '&#8212;', '&#x2014;'] // check:emdash

const hits = []

const walkOnce = (dir, seen) => {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue
    const p = join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) walkOnce(p, seen)
    else if (EXT.has(extname(p)) && !seen.has(p)) {
      seen.add(p)
      const lines = readFileSync(p, 'utf8').split('\n')
      lines.forEach((line, i) => {
        if (line.includes('check:emdash')) return
        if (FORMS.some((f) => line.includes(f))) hits.push(`${p}:${i + 1}: ${line.trim().slice(0, 140)}`)
      })
    }
  }
}

const seen = new Set()
for (const r of ROOTS) {
  try {
    walkOnce(r, seen)
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
