# Checking the Right Way 🏒

A youth hockey body-checking study PWA for PeeWee/Bantam players (ages 11-14). There's a guided 6-step session with gated check questions, then a shuffled review quiz. It works offline, saves progress in localStorage, and has no login.

Live: https://raimondeee.github.io/CheckingCoach/

## Dev
```
npm install
npm run dev        # local
npm run build      # type-check + build (sw.js stamped with build hash)
npm run check      # question/timestamp data check
VITE_BASE=/CheckingCoach/ npm run build   # GitHub Pages build → push dist to gh-pages
```

## Sources (content uses only these)
- **V**: Wayne Blatt, "Body Checking Fundamentals" (NSDA), https://www.youtube.com/watch?v=qQGgKYFZKs4. Timestamped notes are in `docs/source-notes.md`.
- **M**: USA Hockey, *Checking the Right Way for Youth Hockey* manual, https://cdn2.sportngin.com/attachments/document/0042/2205/Checking_Manual_20_FINAL.pdf

| Lesson | Video (start time) | Manual |
|---|---|---|
| 1 Contact vs checking | 0:22, 0:48 | Definitions (p.29), Awareness / shoulder check (p.62) |
| 2 Third position | 1:08 | Tripod stance (p.64) |
| 3 Three tools | 1:40, 2:02, 4:14 | Legal check = hips & shoulders, stick below knees (p.29); no elbows, no hand pushing in youth hockey (p.65) |
| 4 Safety | 2:35, 3:13, 5:14, 5:53, 7:01 | Angling, late/"finishing" checks, players engaged on boards are defenseless (p.29) |
| 5 Danger zone | 9:52, 10:27, 11:35 | Receiving along boards (p.66), open ice (p.67), from behind ("Heads Up, Don't Duck!") |
| 6 Debrief | 12:25, 3:28, 8:11 | |

Each question in `src/content.ts` lists its source.

### Notes on the sources
- The video counts "two hands together" as a checking tool. The manual says a legal body check uses only the hips and shoulders, and that pushing with the hands shouldn't be used in youth hockey. The app shows both and tells players to use shoulder and hip when in doubt.
- Stick checking (poke and lift) and the manual's long drill catalog are not included because the brief was body checking.
