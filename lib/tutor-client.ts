export type ChatRole = "user" | "assistant";
export type ChatMessage = { role: ChatRole; content: string };

export type StreamEvent =
  | { kind: "token"; value: string }
  | { kind: "done" }
  | { kind: "error"; message: string };

export function getTutorUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_TUTOR_URL;
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

export async function* streamTutorResponse(
  messages: ChatMessage[],
  signal?: AbortSignal,
): AsyncGenerator<StreamEvent, void, void> {
  const base = getTutorUrl();
  if (!base) {
    yield { kind: "error", message: "Not configured. Set NEXT_PUBLIC_TUTOR_URL." };
    return;
  }

  let response: Response;
  try {
    response = await fetch(`${base}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (err) {
    yield { kind: "error", message: err instanceof Error ? err.message : "Network error" };
    return;
  }

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => "");
    yield { kind: "error", message: `Tutor returned ${response.status}: ${text.slice(0, 200)}` };
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") {
        yield { kind: "done" };
        return;
      }
      try {
        const parsed = JSON.parse(data);
        const token: string | undefined = parsed?.choices?.[0]?.delta?.content;
        if (token) yield { kind: "token", value: token };
      } catch {
        // Ignore malformed lines; keep streaming.
      }
    }
  }

  yield { kind: "done" };
}

const SLUG_PATTERN = /\[note:([a-z0-9-]+)\]/g;

export type RenderedFragment =
  | { kind: "text"; value: string }
  | { kind: "note"; slug: string };

export function renderWithCitations(text: string, knownSlugs: ReadonlySet<string>): RenderedFragment[] {
  const fragments: RenderedFragment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  SLUG_PATTERN.lastIndex = 0;
  while ((match = SLUG_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      fragments.push({ kind: "text", value: text.slice(lastIndex, match.index) });
    }
    const slug = match[1];
    if (knownSlugs.has(slug)) {
      fragments.push({ kind: "note", slug });
    } else {
      fragments.push({ kind: "text", value: match[0] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    fragments.push({ kind: "text", value: text.slice(lastIndex) });
  }
  return fragments;
}
