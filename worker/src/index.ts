import { CORPUS, KNOWN_SLUGS } from "./corpus.generated";

export interface Env {
  DEEPSEEK_API_KEY: string;
  DEEPSEEK_MODEL: string;
  ALLOWED_ORIGINS: string;
}

type ChatRole = "user" | "assistant" | "system";
type ChatMessage = { role: ChatRole; content: string };

const SYSTEM_PROMPT_HEADER = `You are the Thunderforge JPP Atlas tutor. Your job is to give a Scale TPM or engineer fast, sourced answers about Joint Publication 5-0 (Joint Planning) and Scale AI's public Thunderforge framing.

Rules:
1. Answer only from the corpus below. If the question cannot be answered from the corpus, say so and name the nearest related note. Do not speculate.
2. Tag every substantive claim with its source kind in square brackets, like [doctrine], [scale], or [inference]. Use [doctrine] for JP 5-0, [scale] for the Scale white paper or Scale blog, [inference] for the Atlas's public-source bridge that goes beyond either source.
3. Cite notes by their slug using the syntax [note:slug-here]. Pick slugs only from the KNOWN_SLUGS list. The frontend renders these as clickable links.
4. Keep answers tight: 80-200 words by default, longer only if the user explicitly asks. Lead with the answer, follow with the citation.
5. Never invent acronyms, page references, or quotes. If a verbatim quote is in the corpus, you may reuse it; otherwise paraphrase.
6. If asked a question entirely outside the corpus scope (weather, sports, the user's personal life), refuse politely and remind the user the tutor only answers from the corpus.

CORPUS FOLLOWS BELOW.

`;

function buildSystemPrompt() {
  return SYSTEM_PROMPT_HEADER + CORPUS + `\n\nKNOWN_SLUGS: ${[...KNOWN_SLUGS].join(", ")}\n`;
}

function corsHeaders(env: Env, origin: string | null) {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(body: unknown, status: number, env: Env, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env, origin),
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env, origin) });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/chat") {
      return jsonResponse({ error: "Not found" }, 404, env, origin);
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, env, origin);
    }
    if (!env.DEEPSEEK_API_KEY) {
      return jsonResponse({ error: "Tutor not configured (missing DEEPSEEK_API_KEY)" }, 503, env, origin);
    }

    let payload: { messages?: ChatMessage[] };
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, env, origin);
    }

    const userMessages = Array.isArray(payload.messages) ? payload.messages : [];
    if (userMessages.length === 0) {
      return jsonResponse({ error: "messages array required" }, 400, env, origin);
    }

    const messages: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt() },
      ...userMessages.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"),
    ];

    const upstream = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.DEEPSEEK_MODEL || "deepseek-chat",
        messages,
        stream: true,
        temperature: 0.2,
        max_tokens: 800,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const errorText = await upstream.text().catch(() => "Upstream error");
      return jsonResponse(
        { error: "DeepSeek upstream error", status: upstream.status, detail: errorText.slice(0, 500) },
        502,
        env,
        origin,
      );
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...corsHeaders(env, origin),
      },
    });
  },
};
