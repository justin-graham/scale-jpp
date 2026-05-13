"use client";

import { useMemo, useState } from "react";
import { Lock, Unlock } from "lucide-react";

const criteria = [
  { id: "suitability", label: "Suitable" },
  { id: "feasibility", label: "Feasible" },
  { id: "risk", label: "Lower risk" },
  { id: "tempo", label: "Tempo" },
  { id: "supportability", label: "Supportable" },
] as const;

const coas = [
  {
    name: "COA A: deliberate access",
    scores: { suitability: 4, feasibility: 5, risk: 4, tempo: 2, supportability: 5 },
  },
  {
    name: "COA B: rapid lodgment",
    scores: { suitability: 4, feasibility: 3, risk: 2, tempo: 5, supportability: 3 },
  },
  {
    name: "COA C: partner-led",
    scores: { suitability: 3, feasibility: 4, risk: 5, tempo: 3, supportability: 4 },
  },
] as const;

export function CoaComparator() {
  const [locked, setLocked] = useState(false);
  const [weights, setWeights] = useState(
    Object.fromEntries(criteria.map((criterion) => [criterion.id, 3])) as Record<
      (typeof criteria)[number]["id"],
      number
    >,
  );

  const ranking = useMemo(() => {
    return coas
      .map((coa) => ({
        ...coa,
        total: criteria.reduce(
          (sum, criterion) => sum + coa.scores[criterion.id] * weights[criterion.id],
          0,
        ),
      }))
      .sort((a, b) => b.total - a.total);
  }, [weights]);

  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="m-0 text-sm font-semibold">COA Comparator</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Lock criteria before scoring; moving weights after seeing the winner shows how bias can enter.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLocked((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          {locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          {locked ? "Criteria locked" : "Lock criteria"}
        </button>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="space-y-4">
          {criteria.map((criterion) => (
            <label key={criterion.id} className="block">
              <div className="mb-1 flex justify-between text-sm">
                <span>{criterion.label}</span>
                <span className="font-mono text-muted-foreground">{weights[criterion.id]}</span>
              </div>
              <input
                aria-label={`${criterion.label} weight`}
                type="range"
                min="1"
                max="5"
                value={weights[criterion.id]}
                disabled={locked}
                onChange={(event) =>
                  setWeights((current) => ({
                    ...current,
                    [criterion.id]: Number(event.target.value),
                  }))
                }
                className="w-full accent-amber-500 disabled:opacity-60"
              />
            </label>
          ))}
        </div>

        <div className="rounded-md border bg-background p-3">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Ranked output
          </div>
          <div className="space-y-3">
            {ranking.map((coa, index) => (
              <div key={coa.name} className="rounded-md border p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{coa.name}</span>
                  <span className="font-mono text-sm">{coa.total}</span>
                </div>
                {index === 0 ? (
                  <div className="mt-2 text-xs text-agentic">Current recommendation</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
