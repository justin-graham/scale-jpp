# Thunderforge JPP Guide

A public-safe, static learning artifact for absorbing JP 5-0 alongside Scale AI's public agentic planning framing.

The site is built as a Next.js static export for GitHub Pages. V1 is static-first: no backend, no API keys, and no live AI tutor. Interactivity is implemented as scripted React components, decision widgets, source-labeled overlays, and fictional teaching scenarios.

## Source Material

- `docs/source/jp5_0.pdf` — JP 5-0, Joint Planning, 1 Dec 2020.
- `docs/source/Scale Agentic Warfare.pdf` — Scale AI, The Agentic Revolution in War, Jan 2026.
- `docs/source/claude-planning-guide.md` — prior planning guide used as input.
- Scale Thunderforge blog: <https://scale.com/blog/thunderforge-ai-for-american-defense>

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Checks

```bash
npm run content:validate
npm run graph:build
npm run test
npm run lint
npm run typecheck
npm run build
```

`npm run build` exports the site to `out/` and runs Pagefind against the static HTML.

## Content Model

Author-facing note stubs live in `content/notes/*.mdx`. The rendered V1 bodies are implemented in `components/notes/note-body.tsx` so the stacked-note shell can render all columns client-side on GitHub Pages.

Every note must include frontmatter for:

- `title`
- `slug`
- `cluster`
- `summary`
- `audience`
- `sourceClaims`
- `tags`
- `trailOrder`

Source claim kinds are `doctrine`, `scale`, `inference`, and `scenario`.

## GitHub Pages

The production build uses `basePath: /scale-jpp`, `output: "export"`, `trailingSlash: true`, and `public/.nojekyll`. In GitHub repository settings, set Pages source to GitHub Actions.
