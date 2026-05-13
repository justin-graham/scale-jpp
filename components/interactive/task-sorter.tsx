"use client";

import { useState } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  {
    id: "secure-port",
    text: "Secure the fictional Coral Port entry points.",
    answer: "specified",
    why: "It is directly assigned in the fictional higher-HQ directive.",
  },
  {
    id: "establish-comms",
    text: "Establish resilient communications with partner coast guard units.",
    answer: "implied",
    why: "It is not assigned verbatim, but the mission cannot be coordinated without it.",
  },
  {
    id: "protect-civilians",
    text: "Protect civilians displaced by the fictional typhoon response.",
    answer: "implied",
    why: "The requirement follows from the operating environment and constraints.",
  },
  {
    id: "restore-access",
    text: "Restore humanitarian access before the fictional deadline.",
    answer: "essential",
    why: "This synthesizes multiple specified and implied tasks into mission success.",
  },
] as const;

const buckets = ["specified", "implied", "essential"] as const;

export function TaskSorter() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <div className="mb-4">
        <h3 className="m-0 text-sm font-semibold">Specified / Implied / Essential Sorter</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fictional vignette. Select the doctrinal category for each task.
        </p>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => {
          const selected = answers[task.id];
          const correct = selected === task.answer;
          return (
            <div key={task.id} className="rounded-md border bg-background p-3">
              <p className="m-0 text-sm font-medium">{task.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {buckets.map((bucket) => (
                  <button
                    key={bucket}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [task.id]: bucket }))}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition",
                      selected === bucket
                        ? correct
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-destructive bg-destructive/10 text-destructive"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    {bucket}
                  </button>
                ))}
              </div>
              {selected ? (
                <div className="mt-3 flex gap-2 text-sm">
                  {correct ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <CircleAlert className="mt-0.5 h-4 w-4 text-destructive" aria-hidden="true" />
                  )}
                  <span>
                    {correct ? "Correct." : `Not quite. This is ${task.answer}.`} {task.why}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
