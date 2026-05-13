"use client";

import { useState, type ReactNode } from "react";
import { Lightbulb } from "lucide-react";

type PredictThenRevealProps = {
  question: string;
  hint?: string;
  children: ReactNode;
};

export function PredictThenReveal({ question, hint, children }: PredictThenRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-6 rounded-md border border-doctrine/35 bg-doctrine/5 p-4">
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-doctrine" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-doctrine">
            Predict before reading on
          </div>
          <p className="mt-2 text-sm font-medium leading-6">{question}</p>
          {hint ? (
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
      </div>
      {revealed ? (
        <div className="mt-4 rounded-md border bg-background p-3 text-sm leading-6">
          {children}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-4 inline-flex items-center rounded-md border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Reveal the doctrinal answer
        </button>
      )}
    </div>
  );
}
