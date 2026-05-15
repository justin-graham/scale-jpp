import {
  ArrowDown,
  Bot,
  CheckCircle2,
  Database,
  GitBranch,
  Radar,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const specialists = [
  { id: "intel", name: "Intel", icon: Radar, detail: "fuses public-vignette signals" },
  { id: "logistics", name: "Logistics", icon: Database, detail: "checks supportability" },
  { id: "simulation", name: "Simulation", icon: GitBranch, detail: "queues model runs" },
  { id: "redteam", name: "Red Team", icon: ShieldCheck, detail: "searches for failure modes" },
] as const;

export function ArchitectureDiagram() {
  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <div className="mb-4">
        <h3 className="m-0 text-sm font-semibold">Public-Source Thunderforge Teaching Topology</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Explanatory abstraction, not an internal architecture.
        </p>
      </div>

      <div className="grid gap-3">
        <Node
          icon={UserRound}
          title="Human planner"
          detail="intent, constraints, questions"
          kind="doctrine"
        />
        <Arrow />
        <Node
          icon={Bot}
          title="Orchestrator"
          detail="routes work, manages state"
          kind="scale"
          emphasis
        />
        <Arrow branched />
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
              />
            ))}
          </div>
        </div>
        <Arrow merged />
        <Node
          icon={Bot}
          title="Evaluator / synthesizer"
          detail="compares COAs and trace evidence"
          kind="inference"
        />
        <Arrow />
        <Node
          icon={CheckCircle2}
          title="Human approval gate"
          detail="approve, modify, reiterate"
          kind="doctrine"
          emphasis
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
}: {
  icon: typeof Bot;
  title: string;
  detail: string;
  kind: "doctrine" | "scale" | "inference";
  emphasis?: boolean;
}) {
  const tone =
    kind === "scale"
      ? "border-orange-500/45 bg-orange-50 text-orange-950 dark:bg-orange-950/35 dark:text-orange-100"
      : kind === "inference"
        ? "border-violet-500/35 bg-violet-50 text-violet-950 dark:bg-violet-950/35 dark:text-violet-100"
        : "border-blue-500/35 bg-blue-50 text-blue-950 dark:bg-blue-950/35 dark:text-blue-100";
  return (
    <div
      className={`min-w-0 rounded-md border p-3 ${tone} ${emphasis ? "shadow-sm" : ""}`}
    >
      <Icon className="mb-3 h-5 w-5 text-current opacity-90" aria-hidden="true" />
      <div className="responsive-tile-text text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs leading-5 text-current opacity-75">{detail}</div>
    </div>
  );
}

function Arrow({
  branched,
  merged,
}: {
  branched?: boolean;
  merged?: boolean;
}) {
  const label = branched ? "Fan out" : merged ? "Return" : "";
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
      aria-hidden="true"
    >
      <ArrowDown className="h-5 w-5" />
      {label ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">
          {label}
        </div>
      ) : null}
    </div>
  );
}
