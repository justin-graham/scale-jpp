"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const spans = [
  {
    actor: "Planner",
    action: "asks for COA options",
    evidence: "Intent, constraints, fictional time window.",
  },
  {
    actor: "Orchestrator",
    action: "fans out to specialist agents",
    evidence: "Intel, logistics, simulation, and red-team work packages.",
  },
  {
    actor: "Simulation agent",
    action: "queues fictional model runs",
    evidence: "Three COAs, five criteria, confidence bands.",
  },
  {
    actor: "Red Team",
    action: "finds a logistics fragility",
    evidence: "COA B depends on a single damaged port node.",
  },
  {
    actor: "Synthesizer",
    action: "returns recommendation with caveats",
    evidence: "COA A leads on supportability; COA B leads on tempo.",
  },
] as const;

export function TraceViewer() {
  const [index, setIndex] = useState(0);
  const active = spans[index];

  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="m-0 text-sm font-semibold">Scripted Agent Trace</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fictional trace showing how an engineer might inspect the planner-facing recommendation.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous trace step"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            className="rounded-md border p-2 hover:bg-muted disabled:opacity-40"
            disabled={index === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next trace step"
            onClick={() => setIndex((value) => Math.min(spans.length - 1, value + 1))}
            className="rounded-md border p-2 hover:bg-muted disabled:opacity-40"
            disabled={index === spans.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
        <ol className="space-y-2">
          {spans.map((span, spanIndex) => (
            <li key={`${span.actor}-${span.action}`}>
              <button
                type="button"
                onClick={() => setIndex(spanIndex)}
                className={`w-full rounded-md border p-3 text-left text-sm ${
                  spanIndex === index ? "border-agentic bg-agentic/10" : "hover:bg-muted"
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(spanIndex + 1).padStart(2, "0")}
                </span>
                <span className="ml-2 font-medium">{span.actor}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="rounded-md border bg-background p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Active span
          </div>
          <div className="mt-3 text-lg font-semibold">{active.actor}</div>
          <p className="mt-2 text-sm leading-6">{active.action}</p>
          <div className="mt-4 rounded-md bg-muted p-3 font-mono text-xs leading-5">
            {active.evidence}
          </div>
        </div>
      </div>
    </div>
  );
}
