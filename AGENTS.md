# AGENTS.md

Instructions for AI agents working in this repository.

## Context

Retro-OS style web interface (React 19 + TypeScript + Vite 8) where pages are
draggable windows over a WebGL2 wallpaper. To build a mental model, start with
`README.md`, then explore `src/App.tsx` -> `src/components/Desktop` ->
`src/components/Window` -> `src/state/`.

## Workflow

Plan, then develop, then test, and only then ask for permission to commit.
Do not commit, amend, or push unless the user explicitly asks.

## Code conventions

- Use the `@/` path alias (maps to `src/`) for all imports.
- One folder per component under `src/components/` with a `ComponentName.tsx`,
  `ComponentName.css`, and a barrel `index.ts`
  (`export { default } from './ComponentName.tsx'`). Views follow the same shape.
- CSS naming is BEM-ish: `.Component`, `.Component__element`,
  `.Component--modifier`. Co-located CSS files use PostCSS-style nesting.
- No code comments unless asked; keep code self-explanatory.
- Formatting is enforced by Prettier (`.prettierrc.json`): tabs (width 4), print
  width 82, single quotes, trailing commas. Run `npm run format` after changes.
- TypeScript is strict about unused code (`noUnusedLocals`, `noUnusedParameters`)
  and `verbatimModuleSyntax` (use `import type` for types).

## Structure rules

- Do not introduce a new top-level directory (e.g. `src/hooks/`) without a good
  reason. Hooks live in `src/state/`, pure helpers in `src/lib/`.
- The taskbar height and window "safe area" logic must always stay in sync. Use
  `readTaskbarHeight()` and `useRandomWindowPosition()` rather than duplicating
  that math, and never hardcode the taskbar height.

## Verification before committing

```bash
npm run lint
npm run build   # includes tsc -b type-check
```

## Commit rules

Use the Conventional Commits format: a `type:` prefix followed by a short,
imperative summary (e.g. `feat: add wallpaper download`). Common types are
`feat:`, `fix:`, `chore:`, `docs:`, and `style:`.

The commit body describes the changes in one or a few plain paragraphs (no
bullets or other visual aids), wrapped at 80 characters.
