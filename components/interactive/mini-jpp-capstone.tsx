"use client";

import { useState } from "react";
import { JppRing } from "@/components/interactive/jpp-ring";

const steps = [
  {
    step: 1,
    title: "Planning initiation",
    prompt: "What starts the work?",
    tpm: "Frame the authority, timeline, stakeholders, and first commander touchpoint.",
    engineer: "Identify source documents, data boundaries, and what the system is allowed to ingest.",
  },
  {
    step: 2,
    title: "Mission analysis",
    prompt: "What must be true for the mission to be understood?",
    tpm: "Separate specified, implied, and essential tasks. Push ambiguity back to the right owner.",
    engineer: "Model requirements, assumptions, constraints, and information gaps as first-class objects.",
  },
  {
    step: 3,
    title: "COA development",
    prompt: "What distinguishable options should exist?",
    tpm: "Make sure options are genuinely different, not variations of a favorite answer.",
    engineer: "Generate candidate COAs with provenance, criteria coverage, and simulator-ready parameters.",
  },
  {
    step: 4,
    title: "COA analysis",
    prompt: "How does the plan break?",
    tpm: "Protect time for wargaming; this is where false confidence gets exposed.",
    engineer: "Run scripted adversary reactions, log traces, and preserve failure cases for evaluation.",
  },
  {
    step: 5,
    title: "COA comparison",
    prompt: "What evidence supports the recommendation?",
    tpm: "Ask whether criteria were defined before the ranking emerged.",
    engineer: "Show score inputs, uncertainty, model outputs, and human overrides.",
  },
  {
    step: 6,
    title: "COA approval",
    prompt: "Who owns the risk?",
    tpm: "The commander decides; the artifact should sharpen judgment, not replace it.",
    engineer: "Approval gates, audit trails, and escalation policy are product requirements.",
  },
  {
    step: 7,
    title: "Plan or order development",
    prompt: "How does the decision become executable direction?",
    tpm: "Keep the order aligned to intent, assumptions, branches, sequels, and assessment.",
    engineer: "Treat generated text as downstream rendering of approved structured decisions.",
  },
] as const;

export function MiniJppCapstone({ openStep }: { openStep?: (slug: string) => void }) {
  const [index, setIndex] = useState(0);
  const active = steps[index];

  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <div className="mb-4">
        <h3 className="m-0 text-sm font-semibold">Mini-JPP Run</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fictional Coral Strait humanitarian-access scenario. No real target, plan, or operational facts.
        </p>
      </div>
      <JppRing currentStep={active.step} lensOn openStep={openStep} />
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2">
          {steps.map((step, stepIndex) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setIndex(stepIndex)}
              className={`w-full rounded-md border p-3 text-left text-sm ${
                stepIndex === index ? "border-agentic bg-agentic/10" : "hover:bg-muted"
              }`}
            >
              <span className="font-mono text-xs text-muted-foreground">Step {step.step}</span>
              <span className="mt-1 block font-medium">{step.title}</span>
            </button>
          ))}
        </div>
        <div className="rounded-md border bg-background p-4">
          <div className="font-mono text-xs text-muted-foreground">Fictional decision point</div>
          <h4 className="mt-2 text-lg font-semibold">{active.prompt}</h4>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-doctrine/30 bg-doctrine/10 p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-doctrine">
                TPM lens
              </div>
              <p className="text-sm leading-6">{active.tpm}</p>
            </div>
            <div className="rounded-md border border-agentic/40 bg-agentic/10 p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700 dark:text-agentic">
                Engineer lens
              </div>
              <p className="text-sm leading-6">{active.engineer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
