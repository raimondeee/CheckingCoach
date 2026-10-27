// Data check: npm run check
import { readFileSync } from 'node:fs'
import ts from 'typescript'
const src = ts.transpileModule(readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { LESSONS, QUESTIONS } = await import('data:text/javascript,' + encodeURIComponent(src))
const fail = (m) => { console.error('FAIL', m); process.exitCode = 1 }
if (QUESTIONS.length < 40) fail('fewer than 40 questions')
for (const q of QUESTIONS) {
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.choices.length) fail(q.id + ' bad answer index')
  if (new Set(q.choices).size !== q.choices.length) fail(q.id + ' duplicate choices')
  if (!q.why?.trim() || !q.src?.trim()) fail(q.id + ' missing explanation/source')
  if (!LESSONS.some((l) => l.id === q.lesson)) fail(q.id + ' bad lesson')
}
const notes = readFileSync(new URL('../docs/source-notes.md', import.meta.url), 'utf8')
const secs = [...notes.matchAll(/(\d+):(\d\d)-/g)].map((m) => +m[1] * 60 + +m[2])
for (const l of LESSONS) {
  for (const t of [l.t, ...(l.extraWatch || []).map((w) => w.t)]) if (!secs.includes(t) || t > 13 * 60 + 2) fail(`lesson ${l.id} timestamp ${t}s not a notes start time`)
  if (QUESTIONS.filter((q) => q.lesson === l.id).length < l.gates) fail(`lesson ${l.id} not enough gate questions`)
}
console.log(`checked ${QUESTIONS.length} questions, ${LESSONS.length} lessons`)
