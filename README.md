# saturno.services

A retro-OS style web interface — think the first macOS releases or Windows
95/98 — where the "pages" behave like floating desktop windows on top of a
procedurally generated wallpaper.

The site is a desktop metaphor: a full-screen `Desktop` hosts a fixed `Taskbar`
at the top, a wallpaper (a live WebGL2 shader) behind everything, and draggable,
resizable `Window`s that wrap the routed pages.

> **Last updated:** November 14, 2026 — keep this document updated on a regular
> basis as the project evolves.

## Tech stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| UI         | React 19 + TypeScript                              |
| Build tool | Vite 8 (`@vitejs/plugin-react`)                    |
| Routing    | `react-router` v8                                   |
| WebGL      | `twgl.js` (WebGL2 wallpaper renderer)              |
| Linting    | `oxlint`                                           |
| Formatting | `prettier` (tabs, width 82, single quotes)         |
| Package mgr| npm (`.npmrc` sets `ignore-scripts=true`)          |

## Getting started

```bash
npm install
npm run dev       # starts Vite on http://localhost:2727
```

Other scripts (see `package.json`):

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server (port **2727**)                |
| `npm run build`   | `tsc -b && vite build` (type-check + production build) |
| `npm run lint`    | `oxlint` (lint only, no type-check)                 |
| `npm run format`  | Format the whole repo with Prettier                 |
| `npm run format:check` | Check formatting without writing                |
| `npm run preview` | Preview the production build                        |
| `npm run create`  | Scaffold a new component (see below)                |

## Project structure

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Router + Desktop layout
├── index.css                # Reset, font-face, base styles
├── tokens.css               # Design tokens (CSS custom properties) — single source of truth
├── components/              # Reusable UI primitives (one folder per component)
│   ├── Button/  Checkbox/  ColorInput/  Columns/  Content/  Fieldset/  Heading/
│   ├── Range/  Select/  Stack/  Window/  Taskbar/  IconsPanel/  Desktop/
│   └── ShaderRenderer/      # WebGL2 wallpaper renderer (presets, shaders, uniforms)
├── state/                   # App state: context, providers, hooks
│   ├── wallpaper-context.ts # WallpaperContext + useWallpaper()
│   ├── WallpaperProvider.tsx# Provider that owns + persists wallpaper config
│   ├── seedColors.ts        # Reads/writes seed colors to/from CSS vars
│   └── useRandomWindowPosition.ts # Shared hook for window positioning
├── lib/                     # Pure utilities (no React)
│   ├── color.ts             # oklch ↔ sRGB conversions, contrast helpers
│   ├── resolution.ts        # Resolution profiles + auto-detection
│   ├── downloadWallpaper.ts # Renders wallpaper to a canvas (WebGL2)
│   ├── taskbar.ts           # readTaskbarHeight() (reads --size-taskbar)
│   └── fonts/               # Bundled typefaces (Sysfont, Open Sans)
└── views/                   # Page-level components rendered as windows
    ├── HomeView/
    ├── AboutMeView/
    └── WallpaperEditorView/ # The main wallpaper editor (has its own components/)
```

## Architecture

### The desktop metaphor

`App.tsx` sets up the routes inside a `DesktopLayout` that wraps everything in
`<Desktop>`. `Desktop` renders two stacked layers:

1. `Desktop__wallpaper` — the `ShaderRenderer` (live wallpaper), `z-index: 1`.
2. `Desktop__content` — the interactive layer (`Taskbar` + routed views),
   `z-index: 10`.

Routing is nested: `DesktopLayout` renders `<Taskbar />` and `<Outlet />`, so
every route below it (`/`, `/about-me`, `/wallpaper-editor`) is rendered *inside*
the desktop as a window.

### Taskbar

`Taskbar` is fixed at the top with a height of `var(--size-taskbar)` (currently
`var(--size-6)` = 64px). It uses `position: relative; z-index: 100` so it always
sits **above** windows, even when a window is dragged over it.

> **Important:** the taskbar height is the single source of truth in
> `tokens.css` (`--size-taskbar`). Any JS that needs the height must read it via
> `readTaskbarHeight()` from `src/lib/taskbar.ts` — never hardcode it.

### Window

`Window` (`src/components/Window/`) is a draggable, resizable, title-bar'd
container with:

- **Move** via dragging the window body/header; **resize** via edge/corner handles.
- A **compact ("maximized") mode** when the viewport is too small for the
  requested size (`computeCompact`). The compact inset is taskbar-aware (top
  offset = taskbar height + gap).
- Window `controls` (e.g. help, close) rendered as `Button`s; a string `action`
  is treated as a `Link` route.

### Window positioning

`useRandomWindowPosition(width, height)` (in `src/state/`) computes a
pseudo-random, taskbar-safe starting position for a window, once per mount.
Both `AboutMeView` and `WallpaperEditorView` use it, passing their own window
dimensions. It keeps windows clear of the taskbar and inside the viewport.

### Wallpaper state & the wallpaper editor

- `WallpaperProvider` owns the wallpaper config (`{ preset, uniforms, targetId }`),
  persists it to `localStorage`, and syncs the four seed colors to CSS custom
  properties on `:root` (consumed by `tokens.css` for the UI palette).
- The wallpaper is a procedural WebGL2 fragment shader. Presets are defined in
  `ShaderRenderer/lib/presets.ts` (each maps a `PresetId` to a `.glsl` source).
- Uniforms are defined/clamped in `ShaderRenderer/lib/uniforms.ts`.
- "Themes" (named uniform presets) live in
  `WallpaperEditorView/components/WallpaperTheme/themes.ts`.
- `ResolutionProfile`s (mobile / tablet / laptop) live in `src/lib/resolution.ts`
  with aspect-ratio auto-detection; `downloadWallpaper.ts` renders the wallpaper
  at a target resolution and downloads it.

## Design tokens & theming

`src/tokens.css` defines all spacing, color, and typography tokens on `:root`
(e.g. `--size-*`, `--color-*`, `--font-*`, `--strength-*`). The seed colors
(`--color-seed-1..4`) are rewritten at runtime by the wallpaper state, and all
derived tokens (surfaces, borders, accents) are `oklch(from ...)` compositions,
so the whole UI re-themes with the wallpaper.

When adding a token that JS must read, prefer a dedicated indirection token
(e.g. `--size-taskbar: var(--size-6)`) so JS never hardcodes a magic value.

## Conventions

- **Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and
  `tsconfig.app.json`). Always import via `@/...`.
- **Component structure:** one folder per component under `src/components/`
  with a `ComponentName.tsx`, `ComponentName.css`, and a barrel `index.ts`
  (`export { default } from './ComponentName.tsx'`). Views follow the same shape.
- **CSS naming:** BEM-ish — `.Component`, `.Component__element`,
  `.Component--modifier`. Co-located CSS files use PostCSS-style nesting.
- **No code comments** unless genuinely necessary; the codebase favors
  self-documenting code.
- **Formatting** is enforced by Prettier (`.prettierrc.json`): tabs (width 4),
  print width 82, single quotes, trailing commas.
- **TypeScript** is strict about unused code (`noUnusedLocals`,
  `noUnusedParameters`) and `verbatimModuleSyntax` (use `import type` for types).

## Adding things

### A new component

```bash
npm run create -- --component=MyComponent
```

This scaffolds `src/components/MyComponent/{MyComponent.tsx,MyComponent.css,index.ts}`.
Fill in the implementation, then import it as `@/components/MyComponent`.

### A new page (window)

1. Create `src/views/MyView/MyView.tsx` (+ `index.ts`) rendering a `<Window>`.
2. Use `useRandomWindowPosition(width, height)` for the initial position and
   pass the result as `top`/`left` to `<Window>`.
3. Register the route in `src/App.tsx` under the `DesktopLayout` route.
4. (Optional) add an icon link in `src/components/IconsPanel/IconsPanel.tsx`.

### A new shader preset

1. Add the fragment shader to `src/components/ShaderRenderer/shaders/patterns/`.
2. Import it with `?raw` and add an entry to `PRESET_SOURCES` in
   `ShaderRenderer/lib/presets.ts`. `PresetId` is derived from this object, so
   types stay in sync automatically.

### A new wallpaper theme

Add an entry to `WALLPAPER_THEMES` in
`src/views/WallpaperEditorView/components/WallpaperTheme/themes.ts`.

## Verification before committing

```bash
npm run lint
npm run build   # includes tsc -b type-check
```

## Notes for AI agents / contributors

- Start here, then explore `src/App.tsx` → `src/components/Desktop` →
  `src/components/Window` → `src/state/` to build a mental model.
- The taskbar height and window "safe area" logic must always stay in sync;
  use `readTaskbarHeight()` and `useRandomWindowPosition()` rather than
  duplicating math.
- Follow existing file/folder conventions exactly; don't introduce a new
  top-level directory (e.g. `src/hooks/`) without a good reason — hooks live in
  `src/state/`, pure helpers in `src/lib/`.
- Respect the Prettier config and run `npm run lint` after changes.
- Do not add comments unless asked; keep code self-explanatory.

## Known issues

The production build (`npm run build`) currently fails on a few pre-existing
type errors unrelated to recent feature work:

- `src/App.tsx` — unused `IconsPanel` import.
- `src/components/IconsPanel/IconsPanel.tsx` — unused `ReactNode`/`children`
  and a missing `IconsPanelProps` type.
- `src/components/Taskbar/Taskbar.tsx` — unused `ReactNode` import.

These are intentionally left in place until cleaned up; `npm run dev` and
`npm run lint` are unaffected.
