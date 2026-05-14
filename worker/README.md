# Tutor Worker

A Cloudflare Worker that proxies questions from the static site to **DeepSeek** (open-weights), grounded in the JPP Atlas corpus.

The corpus is auto-generated from `lib/atlas-data.ts` by `scripts/build-corpus.ts`. The worker imports it as a string constant. No external storage needed.

## Endpoints

- `POST /chat` — body `{ messages: Array<{role: "user"|"assistant", content: string}> }`. Streams back the DeepSeek SSE response (OpenAI-compatible format).

## One-time setup

```bash
cd worker
npm install
npx wrangler login            # OAuth into your Cloudflare account
npx wrangler secret put DEEPSEEK_API_KEY   # paste the DeepSeek key when prompted
```

Get a DeepSeek API key at <https://platform.deepseek.com>. The default model is `deepseek-chat` (V3). To use `deepseek-reasoner` (R1) for harder questions, change `DEEPSEEK_MODEL` in `wrangler.toml`.

## Local dev

From the repo root, rebuild the corpus first:

```bash
npm run corpus:build
```

Then in `worker/`:

```bash
npm run dev
```

The worker listens on `http://localhost:8787`. Set `NEXT_PUBLIC_TUTOR_URL=http://localhost:8787` in the site's `.env.local` and `npm run dev` the site. Cmd-K → type a question → "Ask the tutor".

## Deploy

```bash
npm run deploy
```

Wrangler prints the public URL. Set it as `NEXT_PUBLIC_TUTOR_URL` in the site's GitHub Pages build (e.g., a repo secret consumed in the deploy workflow).

## CORS

`wrangler.toml`'s `ALLOWED_ORIGINS` controls which origins can call `/chat`. Defaults to `https://justin-graham.github.io,http://localhost:3000`. Update if the site moves.

## Cost note

The corpus is ~18.5 KB / ~5K tokens. DeepSeek caches the system-prompt prefix automatically, so per-question cost is bounded by the user's question + the response (~$0.001 per turn at current pricing). The first cold call pays the full prefix cost.

## Refreshing the corpus

After editing `lib/atlas-data.ts` (notes, glossary, source claims), run:

```bash
npm run corpus:build && cd worker && npm run deploy
```

The corpus is baked into the worker bundle, so a corpus change requires a worker redeploy.
