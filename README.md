# Thunderforge JPP Guide

A public-safe, interactive learning artifact for absorbing JP 5-0 alongside Scale AI's public agentic planning framing.

The site is a Next.js static export deployed to GitHub Pages. Bodies render client-side; the rich teaching components (JPP ring, COA comparator, predict-then-reveal, animated architecture diagram) live in React. A grounded tutor runs on a separately deployed Cloudflare Worker against DeepSeek (open-weights), with the corpus auto-built from the notes.

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

Open <http://localhost:3000>. The tutor defaults to the deployed Worker. To point the site at a local Worker, set `NEXT_PUBLIC_TUTOR_URL` in `.env.local` (see [worker/README.md](worker/README.md)).

## Checks

```bash
npm run corpus:build
npm test
npm run lint
npm run typecheck
npm run build
```

`npm run build` exports the site to `out/` and runs Pagefind against the static HTML. `corpus:build` is wired into the prebuild step, so it runs automatically.

## Content Model

`lib/atlas-data.ts` is the single source of truth for note metadata: titles, slugs, summaries, source claims, agentic-overlay links, trail order. JSX bodies for each note live in `components/notes/note-body.tsx`. The tutor corpus is auto-generated from the same metadata + source claims + glossary.

Source-claim kinds: `doctrine` (JP 5-0), `scale` (Scale white paper / blog), `inference` (public-source bridge), `scenario` (fictional teaching vignette).

## Tutor

The tutor is a separate Cloudflare Worker in `worker/`. It proxies questions to DeepSeek with the JPP/Scale corpus as a cached system prompt. The site defaults `NEXT_PUBLIC_TUTOR_URL` to the deployed Worker in `next.config.ts`; environment variables can override that for local or alternate deployments.

See [worker/README.md](worker/README.md) for deploy steps.

## GitHub Pages

Production build uses `basePath: /scale-jpp`, `output: "export"`, `trailingSlash: true`, and `public/.nojekyll`. In repository settings, set Pages source to GitHub Actions.
