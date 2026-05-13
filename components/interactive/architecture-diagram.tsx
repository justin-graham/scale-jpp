"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  Bot,
  CheckCircle2,
  Database,
  GitBranch,
  Pause,
  Play,
  Radar,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const specialists = [
  { id: "intel", name: "Intel", icon: Radar, detail: "fuses public-vignette signals" },
  { id: "logistics", name: "Logistics", icon: Database, detail: "checks supportability" },
  { id: "simulation", name: "Simulation", icon: GitBranch, detail: "queues model runs" },
  { id: "redteam", name: "Red Team", icon: ShieldCheck, detail: "searches for failure modes" },
] as const;

type SpecialistId = (typeof specialists)[number]["id"];

type Step = {
  label: string;
  caption: string;
  active: {
    planner?: boolean;
    orchestrator?: boolean;
    specialists?: ReadonlyArray<SpecialistId>;
    synthesizer?: boolean;
    approval?: boolean;
  };
  edges: {
    plannerToOrch?: boolean;
    orchToSpecialists?: boolean;
    specialistsToSynth?: boolean;
    synthToApproval?: boolean;
  };
};

const allSpecialists = specialists.map((s) => s.id);

const steps: Step[] = [
  {
    label: "Idle",
    caption: "No work in flight. Use Play to step through a fictional COA-development run.",
    active: {},
    edges: {},
  },
  {
    label: "Planner submits intent",
    caption: "Human planner sends intent, constraints, and questions to the orchestrator.",
    active: { planner: true, orchestrator: true },
    edges: { plannerToOrch: true },
  },
  {
    label: "Orchestrator fans out",
    caption: "Orchestrator routes parallel work packages to four specialist agents.",
    active: { orchestrator: true, specialists: allSpecialists },
    edges: { orchToSpecialists: true },
  },
  {
    label: "Specialists work in parallel",
    caption: "Each specialist runs its tools and returns evidence; this is where the speed-up lives.",
    active: { specialists: allSpecialists },
    edges: {},
  },
  {
    label: "Synthesizer assembles",
    caption: "Synthesizer compares specialist outputs and assembles candidate COAs with caveats.",
    active: { specialists: allSpecialists, synthesizer: true },
    edges: { specialistsToSynth: true },
  },
  {
    label: "Human approval gate",
    caption: "Synthesizer hands a ranked, evidence-backed recommendation to the human approver.",
    active: { synthesizer: true, approval: true },
    edges: { synthToApproval: true },
  },
  {
    label: "Commander decides",
    caption: "Approve, modify, or reiterate. The agents proposed; the commander decides.",
    active: { approval: true },
    edges: {},
  },
];

const PLAY_INTERVAL_MS = 1800;

export function ArchitectureDiagram() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, PLAY_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const step = steps[index];
  const activeSpecialists = useMemo(
    () => new Set(step.active.specialists ?? []),
    [step],
  );

  function reset() {
    setPlaying(false);
    setIndex(0);
  }

  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <div className="mb-4">
        <h3 className="m-0 text-sm font-semibold">Public-Source Thunderforge Teaching Topology</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Explanatory abstraction, not an internal architecture. Use Play to watch a fictional COA-development run flow through the system.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md border bg-background p-2">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
          aria-pressed={playing}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <label className="ml-1 flex flex-1 items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">{String(index).padStart(2, "0")} / {String(steps.length - 1).padStart(2, "0")}</span>
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            value={index}
            onChange={(event) => {
              setPlaying(false);
              setIndex(Number(event.target.value));
            }}
            aria-label="Timeline position"
            className="w-full accent-amber-500"
          />
        </label>
      </div>

      <div className="mb-4 rounded-md border-l-2 border-agentic bg-agentic/5 px-3 py-2 text-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700 dark:text-agentic">
          {step.label}
        </div>
        <div className="mt-1 text-muted-foreground">{step.caption}</div>
      </div>

      <div className="grid gap-3">
        <Node
          icon={UserRound}
          title="Human planner"
          detail="intent, constraints, questions"
          kind="doctrine"
          active={Boolean(step.active.planner)}
        />
        <Arrow active={Boolean(step.edges.plannerToOrch)} />
        <Node
          icon={Bot}
          title="Orchestrator"
          detail="routes work, manages state"
          kind="scale"
          emphasis
          active={Boolean(step.active.orchestrator)}
        />
        <Arrow active={Boolean(step.edges.orchToSpecialists)} branched />
        <div className="rounded-md border border-orange-500/35 bg-orange-50/60 p-3 dark:bg-orange-950/20">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-orange-900 dark:text-orange-100">
            Specialist agents (parallel)
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {specialists.map((agent) => (
              <Node
                key={agent.id}
                icon={agent.icon}
                title={`${agent.name} agent`}
                detail={agent.detail}
                kind="scale"
                active={activeSpecialists.has(agent.id)}
              />
            ))}
          </div>
        </div>
        <Arrow active={Boolean(step.edges.specialistsToSynth)} merged />
        <Node
          icon={Bot}
          title="Evaluator / synthesizer"
          detail="compares COAs and trace evidence"
          kind="inference"
          active={Boolean(step.active.synthesizer)}
        />
        <Arrow active={Boolean(step.edges.synthToApproval)} />
        <Node
          icon={CheckCircle2}
          title="Human approval gate"
          detail="approve, modify, reiterate"
          kind="doctrine"
          emphasis
          active={Boolean(step.active.approval)}
        />
      </div>

    </div>
  );
}

function Node({
  icon: Icon,
  title,
  detail,
  kind,
  emphasis,
  active,
}: {
  icon: typeof Bot;
  title: string;
  detail: string;
  kind: "doctrine" | "scale" | "inference";
  emphasis?: boolean;
  active?: boolean;
}) {
  const tone =
    kind === "scale"
      ? "border-orange-500/45 bg-orange-50 text-orange-950 dark:bg-orange-950/35 dark:text-orange-100"
      : kind === "inference"
        ? "border-violet-500/35 bg-violet-50 text-violet-950 dark:bg-violet-950/35 dark:text-violet-100"
        : "border-blue-500/35 bg-blue-50 text-blue-950 dark:bg-blue-950/35 dark:text-blue-100";
  const activeRing = active ? "ring-2 ring-amber-500/70 diagram-active" : "";
  return (
    <div
      className={`min-w-0 rounded-md border p-3 transition ${tone} ${emphasis ? "shadow-sm" : ""} ${activeRing}`}
    >
      <Icon className="mb-3 h-5 w-5 text-current opacity-90" aria-hidden="true" />
      <div className="responsive-tile-text text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs leading-5 text-current opacity-75">{detail}</div>
    </div>
  );
}

function Arrow({
  active,
  branched,
  merged,
}: {
  active?: boolean;
  branched?: boolean;
  merged?: boolean;
}) {
  const label = branched ? "Fan out" : merged ? "Return" : "";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 transition ${
        active ? "text-amber-600 dark:text-agentic" : "text-muted-foreground"
      }`}
      aria-hidden="true"
    >
      <ArrowDown className={`h-5 w-5 ${active ? "scale-110" : ""} transition`} />
      {label ? (
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
            active ? "opacity-100" : "opacity-50"
          }`}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
