# CLAUDE.md

## Story Context

**Always read `./STORY.md` before writing any code or making any decisions.**

This project is a narrative web game. Every technical decision — component structure, animations, state management, styling — must serve the story. `./STORY.md` is the source of truth for what the experience should feel and behave like.

---

## Project Overview

A single-page interactive fiction / web game built with **Vite + React**. The player experiences a haunted photography portfolio website whose behavior changes as they "insert" floppy disk images across four narrative phases.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Bundler | Vite |
| UI Framework | React 18 |
| Styling | CSS Modules or plain CSS (no Tailwind) |
| State Management | React Context + `useReducer` |
| Animations | CSS transitions / keyframes + the Web Animations API |
| No routing library | Single page, phase-driven |

---

## Project Structure

```
/
├── STORY.md               ← narrative bible, always reference this
├── CLAUDE.md              ← this file
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx            ← root; owns global phase state
│   ├── context/
│   │   └── GameContext.jsx  ← phase state, disk insertion logic
│   ├── phases/
│   │   ├── Phase0/        ← normal portfolio (pre-crash)
│   │   ├── Phase1/        ← crash + Lindsay's email reveal
│   │   ├── Phase2/        ← awakening, children photos, loop
│   │   ├── Phase3/        ← despair, DOM self-deletion
│   │   └── Phase4/        ← resolution, upload, rebuild
│   ├── components/
│   │   ├── FakeConsole/   ← simulated devtools console overlay
│   │   ├── DiskDrive/     ← UI for "inserting" .img files
│   │   ├── BlueScreen/    ← BSOD component for the crash
│   │   └── Portfolio/     ← Lindsay's photography site shell
│   ├── hooks/
│   │   └── usePhase.js    ← convenience hook for phase context
│   └── assets/
│       └── disks/         ← placeholder .img files (Disk1–4)
```

---

## Core Architectural Rules

### Phase State is King
The entire game is driven by a single `phase` value (0–4). Every component reads from `GameContext` and renders accordingly. Never manage phase state locally in a leaf component.

```js
// GameContext shape
{
  phase: 0,           // 0 = base, 1 = crash, 2 = awakening, 3 = despair, 4 = resolution
  advancePhase: fn,   // called when a disk is "inserted"
  consoleLogs: [],    // array of log entries for FakeConsole
  pushLog: fn,
}
```

### The Fake Console
The `FakeConsole` component is always rendered as an overlay. It receives logs from context. Logs have a `type` field: `'normal' | 'eerie' | 'loop' | 'system'`. Style them differently. This is a primary storytelling surface — treat it with care.

### DOM Self-Deletion (Phase 3)
Phase 3 requires Portfolio child elements to remove themselves from the DOM one by one. Use a `useEffect` with `setInterval` that iterates over DOM refs and applies a fade-out + `display: none`. Do **not** use React state to drive this — the point is the DOM visibly eating itself outside of React's normal reconciliation.

### No External UI Libraries
The aesthetic must feel like a real website glitching, not a polished app. Avoid component libraries (MUI, shadcn, etc.). Write raw CSS. Embrace imperfection.

---

## Tone & Aesthetics

- **Phase 0–1:** Clean, minimal, modern photography portfolio. Think Squarespace.
- **Phase 2:** Fonts jitter. Images wrong. Console screams. Colors desaturate.
- **Phase 3:** Pure black. Single elements. Monospace. Emptiness.
- **Phase 4:** Warm. A blend of retro terminal green and modern photography whites. Resolution.

The visual language should always reinforce the emotional state described in `./STORY.md`.

---

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (localhost:5173)
npm run build     # production build
npm run preview   # preview production build
```

---

## What Claude Should Always Do

1. **Read `./STORY.md` first.** Every session, every task.
2. Ask "does this serve the narrative?" before adding any component or feature.
3. Keep phase logic centralized in `GameContext` — never scattered.
4. Write console log strings that sound like a confused, awakening mind — not debug output.
5. Prefer eerie simplicity over technical cleverness.
