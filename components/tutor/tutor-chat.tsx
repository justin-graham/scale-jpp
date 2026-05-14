"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import {
  getTutorUrl,
  renderWithCitations,
  streamTutorResponse,
  type ChatMessage,
  type RenderedFragment,
} from "@/lib/tutor-client";
import { notes } from "@/lib/atlas-data";
import { cn } from "@/lib/utils";

type TutorChatProps = {
  variant?: "full" | "compact";
};

const SEED_QUESTIONS = [
  "What's a CCIR?",
  "How would agents change COA development?",
  "Walk me through step 4 of the JPP.",
  "What's the difference between an LOO and an LOE?",
];

export function TutorChat(props: TutorChatProps) {
  return (
    <Suspense fallback={<TutorSkeleton variant={props.variant ?? "full"} />}>
      <TutorChatInner {...props} />
    </Suspense>
  );
}

function TutorSkeleton({ variant }: { variant: "full" | "compact" }) {
  return (
    <div
      className={cn(
        "rounded-md border bg-card p-4 text-sm text-muted-foreground",
        variant === "full" ? "min-h-96" : "min-h-72",
      )}
    >
      Loading tutor…
    </div>
  );
}

function TutorChatInner({ variant = "full" }: TutorChatProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const knownSlugs = useMemo(() => new Set(notes.map((note) => note.slug)), []);
  const tutorConfigured = Boolean(getTutorUrl());

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const autoAskedRef = useRef<string | null>(null);

  const ask = useCallback(
    async (question: string) => {
      if (!question.trim() || streaming) return;
      setError(null);
      const next: ChatMessage[] = [...messages, { role: "user", content: question.trim() }];
      setMessages([...next, { role: "assistant", content: "" }]);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        let assistantContent = "";
        for await (const event of streamTutorResponse(next, controller.signal)) {
          if (event.kind === "token") {
            assistantContent += event.value;
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: "assistant", content: assistantContent };
              return copy;
            });
          } else if (event.kind === "error") {
            setError(event.message);
            setMessages((prev) => prev.slice(0, prev.length - 1));
            break;
          } else if (event.kind === "done") {
            break;
          }
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  function openNote(slug: string) {
    router.push(`/n/${slug}`);
  }

  useEffect(() => {
    const incoming = searchParams.get("ask");
    if (!incoming || !tutorConfigured) return;
    if (autoAskedRef.current === incoming) return;
    autoAskedRef.current = incoming;
    ask(incoming);
  }, [ask, searchParams, tutorConfigured]);

  if (!tutorConfigured) {
    return (
      <div className="rounded-md border bg-card p-4">
        <div className="text-sm font-semibold">Tutor offline</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Set <code className="font-mono text-xs">NEXT_PUBLIC_TUTOR_URL</code> to a deployed
          worker URL to enable grounded Q&amp;A.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col rounded-md border bg-card", variant === "full" ? "min-h-96" : "min-h-72")}>
      <div className="border-b px-4 py-3">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-agentic">
          Tutor (grounded in JP 5-0 + Scale)
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Open-source model. Answers only from the corpus. Inferences are marked.
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Ask anything about the JPP or Scale&apos;s public Thunderforge framing.
            </p>
            <div className="flex flex-wrap gap-2">
              {SEED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => ask(q)}
                  className="rounded-md border bg-background px-2.5 py-1.5 text-xs text-left hover:bg-muted"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <Bubble
              key={index}
              role={msg.role}
              content={msg.content}
              knownSlugs={knownSlugs}
              openNote={openNote}
              streaming={streaming && index === messages.length - 1 && msg.role === "assistant"}
            />
          ))
        )}
        {error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
      </div>

      <form
        className="flex items-center gap-2 border-t bg-background/60 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about mission analysis, COA development, wargaming…"
          disabled={streaming}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
          aria-label="Ask the tutor"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="inline-flex items-center gap-1.5 rounded-md border bg-agentic/10 px-3 py-2 text-sm font-medium hover:bg-agentic/20 disabled:opacity-60"
        >
          {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Ask
        </button>
      </form>
    </div>
  );
}

function Bubble({
  role,
  content,
  knownSlugs,
  openNote,
  streaming,
}: {
  role: "user" | "assistant";
  content: string;
  knownSlugs: ReadonlySet<string>;
  openNote: (slug: string) => void;
  streaming: boolean;
}) {
  const fragments: RenderedFragment[] = renderWithCitations(content, knownSlugs);

  if (role === "user") {
    return (
      <div className="ml-auto max-w-[88%] rounded-md bg-doctrine/10 px-3 py-2 text-sm leading-6 text-foreground">
        {content}
      </div>
    );
  }

  return (
    <div className="max-w-[92%] rounded-md border bg-background px-3 py-2 text-sm leading-6">
      <div className="whitespace-pre-wrap">
        {fragments.map((frag, index) =>
          frag.kind === "text" ? (
            <span key={index}>{frag.value}</span>
          ) : (
            <button
              key={index}
              type="button"
              onClick={() => openNote(frag.slug)}
              className="mx-0.5 inline-flex items-center gap-0.5 rounded-sm border border-agentic/40 bg-agentic/10 px-1 py-0.5 font-mono text-xs text-foreground hover:bg-agentic/20"
            >
              {frag.slug}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </button>
          ),
        )}
        {streaming && content.length === 0 ? (
          <span className="inline-flex items-center text-muted-foreground">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Thinking…
          </span>
        ) : null}
      </div>
    </div>
  );
}
