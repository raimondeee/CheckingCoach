import type { Diagram } from './content'
// Simple inline SVG rink diagrams (top-down, not to scale). Left net = left end, right net = right end.
const ends = `<g stroke="#c8102e" stroke-width="2"><line x1="27" y1="18" x2="27" y2="182"/><line x1="373" y1="18" x2="373" y2="182"/></g>
<g fill="#cfe0f5" stroke="#1d4ed8" stroke-width="1.5"><path d="M27 90 A10 10 0 0 1 27 110 Z"/><path d="M373 90 A10 10 0 0 0 373 110 Z"/></g>
<g fill="#fff" stroke="#0b2545" stroke-width="2"><rect x="17" y="93" width="10" height="14"/><rect x="373" y="93" width="10" height="14"/></g>
<g fill="#c8102e"><circle cx="72" cy="55" r="3"/><circle cx="72" cy="145" r="3"/><circle cx="328" cy="55" r="3"/><circle cx="328" cy="145" r="3"/></g>`
const rink = (inner: string, label: string) => `<figure class="rink"><svg viewBox="0 0 400 200" role="img" aria-label="${label.replace(/<[^>]+>/g, '')}">
<rect x="4" y="4" width="392" height="192" rx="60" fill="#f4f9ff" stroke="#0b2545" stroke-width="4"/>
<line x1="200" y1="4" x2="200" y2="196" stroke="#c8102e" stroke-width="3"/>
<line x1="140" y1="4" x2="140" y2="196" stroke="#1d4ed8" stroke-width="3"/><line x1="260" y1="4" x2="260" y2="196" stroke="#1d4ed8" stroke-width="3"/>
<circle cx="200" cy="100" r="22" fill="none" stroke="#1d4ed8" stroke-width="2"/>${ends}${inner}</svg><figcaption>${label}</figcaption></figure>`
const player = (x: number, y: number, c: string, t: string) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="${t.length > 1 ? 8 : 11}" fill="#fff" font-weight="700">${t}</text>`
const arrow = `<defs><marker id="ah" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0b2545"/></marker></defs>`
const txt = (x: number, y: number, s: string, c = '#0b2545') => `<text x="${x}" y="${y}" font-size="10" font-weight="700" fill="${c}" paint-order="stroke" stroke="#f4f9ff" stroke-width="3">${s}</text>`

export function diagram(d: Diagram): string {
  if (d === 'dangerZone') return rink(
    `<rect x="7" y="7" width="386" height="186" rx="57" fill="none" stroke="#c8102e" stroke-opacity=".4" stroke-width="7"/>
     ${arrow}${player(186, 44, '#1d4ed8', 'P')}
     <path d="M186 32 L186 16" stroke="#0b2545" stroke-width="2.5" fill="none" marker-end="url(#ah)"/>${txt(147, 24, 'TIGHT')}
     <path d="M180 55 Q174 64 166 71" stroke="#0b2545" stroke-width="2.5" fill="none" stroke-dasharray="4 3" marker-end="url(#ah)"/>${txt(148, 88, 'OUT')}`,
    '<b>Red band = danger zone</b>, about 3 ft off the boards (the manual calls it the Respect Zone): look over both shoulders. Get OUT to the middle or get TIGHT to the boards, and keep your feet moving.')
  if (d === 'angling') return rink(
    `${arrow}${player(250, 150, '#c8102e', 'C')}${player(300, 95, '#1d4ed8', 'You')}
     <path d="M262 150 Q318 164 360 175" stroke="#c8102e" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#ah)"/>
     <path d="M307 105 Q342 126 351 164" stroke="#1d4ed8" stroke-width="3" fill="none" marker-end="url(#ah)"/>`,
    '<b>Angling (steering):</b> come from the inside and goal side, take away the middle, and steer the carrier (C) into the boards. Don’t chase him straight on.')
  return rink(
    `${arrow}${player(152, 30, '#c8102e', 'F')}${player(126, 56, '#1d4ed8', 'D')}
     <path d="M140 30 L52 30" stroke="#c8102e" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#ah)"/>
     <path d="M114 57 L84 51" stroke="#1d4ed8" stroke-width="2.5" fill="none" marker-end="url(#ah)"/>
     <line x1="122" y1="66" x2="150" y2="78" stroke="#0b2545" stroke-width="3" stroke-linecap="round"/>
     ${txt(36, 160, 'D: shoulder to')}${txt(36, 173, 'shoulder, stick')}${txt(36, 186, 'to the middle')}`,
    '<b>Review: D 1-on-1 (8:11).</b> Line up just inside his shoulder, goal side. Keep your stick in the middle, ride him to the wall, and be patient. The goal is separation.')
}
