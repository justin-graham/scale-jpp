"use client";

import { useState } from "react";
import { JppRing } from "@/components/interactive/jpp-ring";

const steps = [
  {
    step: 1,
    title: "Planning initiation",
    prompt: "What starts the work?",
    body: "Frame authority, timeline, stakeholders, and the first commander touchpoint. Identify source documents and what the system is allowed to ingest.",
  },
  {
    step: 2,
    title: "Mission analysis",
    prompt: "What must be true for the mission to be understood?",
    body: "Separate specified, implied, and essential tasks. Surface assumptions, constraints, and information gaps as first-class objects. Draft CCIRs with the commander.",
  },
  {
    step: 3,
    title: "COA development",
    prompt: "What distinguishable options should exist?",
    body: "Produce broad approaches that are genuinely different, not variations of a favorite. Each candidate carries narrative, capabilities, sustainment concept, and risks.",
  },
  {
    step: 4,
    title: "COA analysis",
    prompt: "How does the plan break?",
    body: "Wargame action-reaction-counteraction against likely and dangerous enemy COAs. Protect the time; this is where false confidence gets exposed. Log failure cases.",
  },
  {
    step: 5,
    title: "COA comparison",
    prompt: "What evidence supports the recommendation?",
    body: "Lock evaluation criteria before scoring. Show score inputs, uncertainty, and the basis for each ranking — including any human overrides.",
  },
  {
    step: 6,
    title: "COA approval",
    prompt: "Who owns the risk?",
    body: "The commander decides; the system sharpens judgment, not replaces it. Approval gates, audit trails, and escalation policy are product requirements, not afterthoughts.",
  },
  {
    step: 7,
    title: "Plan or order development",
    prompt: "How does the decision become executable direction?",
    body: "Render the approved COA into an order aligned to intent, assumptions, branches, sequels, and assessment. Treat generated text as a downstream rendering of approved structured decisions.",
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
          <p className="mt-4 text-sm leading-7">{active.body}</p>
        </div>
      </div>
    </div>
  );
}
