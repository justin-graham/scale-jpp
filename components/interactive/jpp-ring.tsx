"use client";

import { cn } from "@/lib/utils";

const steps = [
  ["Planning", "initiation"],
  ["Mission", "analysis"],
  ["COA", "development"],
  ["COA", "analysis"],
  ["COA", "comparison"],
  ["COA", "approval"],
  ["Plan/order", "development"],
] as const;

type JppRingProps = {
  currentStep?: number;
  lensOn?: boolean;
  openStep?: (slug: string) => void;
};

const stepSlugs = [
  "planning-initiation",
  "mission-analysis",
  "coa-development",
  "coa-analysis-wargaming",
  "coa-comparison",
  "coa-approval",
  "plan-order-development",
] as const;

export function JppRing({ currentStep, lensOn, openStep }: JppRingProps) {
  return (
    <div className="my-6 rounded-md border bg-card p-4" aria-label="Joint Planning Process seven-step ring">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="m-0 text-sm font-semibold">JPP Spine</h3>
        <span className="text-xs text-muted-foreground">
          {lensOn ? "Agentic Lens active" : "Doctrine view"}
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(7.75rem,1fr))] gap-2">
        {steps.map((step, index) => {
          const number = index + 1;
          const active = currentStep === number;
          const saturated = lensOn && number >= 3 && number <= 5;
          return (
            <button
              key={`${step[0]}-${step[1]}`}
              type="button"
              onClick={() => openStep?.(stepSlugs[index])}
              className={cn(
                "min-h-24 min-w-0 rounded-md border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active
                  ? "border-blue-600 bg-blue-50 shadow-sm dark:border-blue-300 dark:bg-blue-950/35"
                  : "border-blue-500/25 bg-blue-50/45 hover:bg-blue-50 dark:bg-blue-950/15 dark:hover:bg-blue-950/30",
                saturated && "border-orange-500/60 bg-orange-50 dark:border-orange-300/60 dark:bg-orange-950/30",
              )}
            >
              <span className="mb-2 block font-mono text-xs text-muted-foreground">
                {String(number).padStart(2, "0")}
              </span>
              <span className="responsive-tile-text block text-sm font-medium leading-5">
                {step[0]}
                <span className="block">{step[1]}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
