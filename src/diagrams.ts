import type { Diagram } from './content'
// Simple inline SVG rink diagrams (top-down). Not to scale.
const rink = (inner: string, label: string) => `<figure class="rink"><svg viewBox="0 0 400 200" role="img" aria-label="${label}">
<rect x="4" y="4" width="392" height="192" rx="60" fill="#f4f9ff" stroke="#0b2545" stroke-width="4"/>
<line x1="200" y1="4" x2="200" y2="196" stroke="#c8102e" stroke-width="3"/>
<line x1="140" y1="4" x2="140" y2="196" stroke="#1d4ed8" stroke-width="3"/><line x1="260" y1="4" x2="260" y2="196" stroke="#1d4ed8" stroke-width="3"/>
<circle cx="200" cy="100" r="22" fill="none" stroke="#1d4ed8" stroke-width="2"/>${inner}</svg><figcaption>${label}</figcaption></figure>`
const player = (x: number, y: number, c: string, t: string) => `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">${t}</text>`
const arrow = `<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0b2545"/></marker></defs>`

export function diagram(d: Diagram): string {
  if (d === 'dangerZone') return rink(
    `<rect x="12" y="12" width="376" height="176" rx="52" fill="none" stroke="#c8102e" stroke-opacity=".35" stroke-width="20"/>
     ${arrow}${player(120, 22, '#1d4ed8', 'P')}
     <path d="M120 36 Q130 70 165 80" stroke="#0b2545" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#ah)"/>
     <text x="172" y="84" font-size="12" fill="#0b2545">OUT</text>
     <path d="M108 16 L60 16" stroke="#0b2545" stroke-width="2.5" fill="none" marker-end="url(#ah)"/>
     <text x="56" y="36" font-size="12" fill="#0b2545">TIGHT</text>
     <text x="200" y="150" font-size="13" text-anchor="middle" fill="#c8102e" font-weight="700">Red band = danger zone (~3 ft off the boards)</text>`,
    'Danger zone: get OUT to the middle or get TIGHT to the boards. Keep your feet moving.')
  if (d === 'angling') return rink(
    `${arrow}${player(300, 100, '#c8102e', 'C')}${player(230, 60, '#1d4ed8', 'You')}
     <path d="M300 112 Q300 160 360 172" stroke="#c8102e" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#ah)"/>
     <path d="M240 70 Q290 120 335 160" stroke="#1d4ed8" stroke-width="3" fill="none" marker-end="url(#ah)"/>
     <text x="120" y="160" font-size="12" fill="#0b2545">Come in on an angle → force him one way</text>`,
    'Angling: don’t go straight at the carrier. Angle in to take away options, then make the play.')
  return rink(
    `${arrow}${player(110, 40, '#c8102e', 'F')}${player(92, 48, '#1d4ed8', 'D')}
     <line x1="80" y1="56" x2="104" y2="80" stroke="#0b2545" stroke-width="3"/>
     <path d="M110 52 L40 28" stroke="#c8102e" stroke-width="2.5" fill="none" stroke-dasharray="5 4" marker-end="url(#ah)"/>
     <text x="130" y="70" font-size="12" fill="#0b2545">D lined up shoulder to shoulder,</text>
     <text x="130" y="86" font-size="12" fill="#0b2545">stick in the middle, ride him to the wall</text>`,
    'D gap: line up your inside shoulder with his shoulder. Be patient. The goal is separation.')
}
