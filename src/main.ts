import './style.css'
import { LESSONS, QUESTIONS, VIDEO, type Question } from './content'
import { diagram } from './diagrams'

const KEY = 'checking-coach-v1'
interface State { done: number[]; stats: Record<string, { seen: number; right: number }>; best: number }
const load = (): State => { try { return { done: [], stats: {}, best: 0, ...JSON.parse(localStorage.getItem(KEY) || '{}') } } catch { return { done: [], stats: {}, best: 0 } } }
let S = load()
const save = () => localStorage.setItem(KEY, JSON.stringify(S))
const app = document.getElementById('app')!
const watch = (t: number) => `${VIDEO}&t=${t}s`
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }
const CHEERS = ['Nice read! 🏒', 'Heads up play! 👀', 'That’s it! 💪', 'Smart and safe! 🛡️', 'Great hockey IQ! 🧠']
const KIND = ['Good try. Let’s look at it again.', 'Close! Here’s the key idea:', 'No worries, that’s how we learn.']
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)]

function home() {
  const n = S.done.length
  const next = LESSONS.find((l) => !S.done.includes(l.id))
  app.innerHTML = `<header class="hero"><h1>🏒 Checking the Right Way</h1><p>Safe, smart body checking for PeeWee &amp; Bantam players</p></header>
  <main>
    <div class="card"><div class="bar"><span style="width:${(n / LESSONS.length) * 100}%"></span></div><p>${n}/${LESSONS.length} lessons done</p>
      <button class="big primary" id="go">${next ? (n ? `Continue: ${next.emoji} ${next.title}` : '▶ Start the Guided Session') : '🔁 Redo the Guided Session'}</button>
      <button class="big" id="review" ${n < LESSONS.length ? 'title="Finish the session first, or jump in anyway"' : ''}>🎯 Review Quiz (${QUESTIONS.length} questions)</button></div>
    <div class="list">${LESSONS.map((l) => `<button class="lesson-btn" data-l="${l.id}"><span>${l.emoji}</span><b>${l.id}. ${l.title}</b><i>${S.done.includes(l.id) ? '✅' : ''}</i></button>`).join('')}</div>
    ${progressTable()}
    <button class="small danger" id="reset">Reset progress</button>
  </main>`
  app.querySelector('#go')!.addEventListener('click', () => lesson(next ? next.id : 1))
  app.querySelector('#review')!.addEventListener('click', review)
  app.querySelectorAll<HTMLElement>('.lesson-btn').forEach((b) => b.addEventListener('click', () => lesson(+b.dataset.l!)))
  app.querySelector('#reset')!.addEventListener('click', () => { if (confirm('Reset all progress?')) { S = { done: [], stats: {}, best: 0 }; save(); home() } })
}

function progressTable() {
  const rows = LESSONS.map((l) => {
    const qs = QUESTIONS.filter((q) => q.lesson === l.id)
    const seen = qs.reduce((a, q) => a + (S.stats[q.id]?.seen || 0), 0), right = qs.reduce((a, q) => a + (S.stats[q.id]?.right || 0), 0)
    const pct = seen ? Math.round((right / seen) * 100) : 0
    return `<tr><td>${l.emoji} ${l.title}</td><td><div class="bar sm"><span style="width:${pct}%"></span></div></td><td>${seen ? pct + '%' : '–'}</td></tr>`
  }).join('')
  return `<div class="card"><h3>Review progress</h3><table>${rows}</table><p class="muted">Best review score: ${S.best}%</p></div>`
}

function lesson(id: number) {
  const l = LESSONS.find((x) => x.id === id)!
  window.scrollTo(0, 0)
  app.innerHTML = `<header class="top"><button class="small" id="home">← Home</button><span>Step ${l.id} of ${LESSONS.length}</span></header>
  <main><div class="card lesson"><h2>${l.emoji} ${l.title}</h2><ul>${l.points.map((p) => `<li>${p}</li>`).join('')}</ul>
  ${l.why ? `<p class="why">${l.why}</p>` : ''}${l.diagram ? diagram(l.diagram) : ''}
  <div class="watch"><a class="big video" target="_blank" rel="noopener" href="${watch(l.t)}">▶ Watch this part (${l.tLabel})</a>
  ${(l.extraWatch || []).map((w) => `<a class="small video" target="_blank" rel="noopener" href="${watch(w.t)}">▶ ${w.label}</a>`).join('')}</div>
  <button class="big primary" id="check">I’m ready, check me! ✔</button></div></main>`
  app.querySelector('#home')!.addEventListener('click', home)
  app.querySelector('#check')!.addEventListener('click', () => gate(l.id, QUESTIONS.filter((q) => q.lesson === l.id).slice(0, l.gates), 0))
}

function askView(q: Question, header: string, onDone: (firstTry: boolean) => void, mustBeRight: boolean) {
  window.scrollTo(0, 0)
  const order = shuffle(q.choices.map((_, i) => i))
  let tries = 0
  app.innerHTML = `<header class="top"><button class="small" id="home">← Home</button><span>${header}</span></header>
  <main><div class="card"><h2 class="q">${q.q}</h2><div class="choices">${order.map((i) => `<button class="choice" data-i="${i}">${q.choices[i]}</button>`).join('')}</div>
  <div id="fb" aria-live="polite"></div><p class="src">Source: ${q.src}</p></div></main>`
  app.querySelector('#home')!.addEventListener('click', home)
  const fb = app.querySelector('#fb')!
  app.querySelectorAll<HTMLButtonElement>('.choice').forEach((b) => b.addEventListener('click', () => {
    const i = +b.dataset.i!; tries++
    if (i === q.answer) {
      app.querySelectorAll<HTMLButtonElement>('.choice').forEach((c) => (c.disabled = true))
      b.classList.add('right')
      fb.innerHTML = `<div class="fb good"><b>${pick(CHEERS)}</b><p>${q.why}</p><button class="big primary" id="next">Next →</button></div>`
      fb.querySelector('#next')!.addEventListener('click', () => onDone(tries === 1))
    } else {
      b.classList.add('wrong'); b.disabled = true
      if (mustBeRight) fb.innerHTML = `<div class="fb kind"><b>${pick(KIND)}</b><p>${q.why}</p><p>Give it another shot 👍</p></div>`
      else {
        app.querySelectorAll<HTMLButtonElement>('.choice').forEach((c) => { c.disabled = true; if (+c.dataset.i! === q.answer) c.classList.add('right') })
        fb.innerHTML = `<div class="fb kind"><b>${pick(KIND)}</b><p>${q.why}</p><button class="big primary" id="next">Next →</button></div>`
        fb.querySelector('#next')!.addEventListener('click', () => onDone(false))
      }
    }
  }))
}

function gate(id: number, qs: Question[], k: number) {
  if (k >= qs.length) {
    if (!S.done.includes(id)) S.done.push(id); save()
    const nxt = LESSONS.find((l) => l.id === id + 1)
    window.scrollTo(0, 0)
    app.innerHTML = `<main><div class="card center"><h2>🎉 Step ${id} complete!</h2>${nxt ? `<p>Up next: ${nxt.emoji} ${nxt.title}</p><button class="big primary" id="n">Keep going →</button>` :
      `<p><b>Session complete!</b> Remember: checking is a hockey skill. Practice it, even at home with a parent or sibling, giving and taking contact. Head up, feet moving, play the puck. 🏒</p><button class="big primary" id="r">🎯 Try the Review Quiz</button>`}
      <button class="big" id="h">Home</button></div></main>`
    app.querySelector('#n')?.addEventListener('click', () => lesson(id + 1))
    app.querySelector('#r')?.addEventListener('click', review)
    app.querySelector('#h')!.addEventListener('click', home)
    return
  }
  askView(qs[k], `Step ${id} check · ${k + 1}/${qs.length}`, () => gate(id, qs, k + 1), true)
}

function review() {
  const deck = shuffle(QUESTIONS).slice(0, 15)
  let score = 0
  const step = (k: number) => {
    if (k >= deck.length) {
      const pct = Math.round((score / deck.length) * 100); S.best = Math.max(S.best, pct); save()
      app.innerHTML = `<main><div class="card center"><h2>${pct >= 80 ? '🏆' : '💪'} ${score}/${deck.length} (${pct}%)</h2><p>${pct >= 80 ? 'Awesome hockey IQ!' : 'Nice work. Every round makes you sharper.'}</p>
      <button class="big primary" id="again">Another round</button><button class="big" id="h">Home</button></div></main>`
      app.querySelector('#again')!.addEventListener('click', review); app.querySelector('#h')!.addEventListener('click', home); return
    }
    const q = deck[k]
    askView(q, `Review ${k + 1}/${deck.length} · Score ${score}`, (first) => {
      const s = (S.stats[q.id] ||= { seen: 0, right: 0 }); s.seen++; if (first) { s.right++; score++ } save(); step(k + 1)
    }, false)
  }
  step(0)
}

home()

if ('serviceWorker' in navigator && import.meta.env.PROD && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: 'none' }).then((r) => r.update()).catch((e) => console.warn('SW failed', e))
  })
  const had = !!navigator.serviceWorker.controller
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloaded || !had) return; reloaded = true; location.reload() })
}
