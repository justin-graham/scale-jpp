"use client";

import { useMemo, useState } from "react";

export function TradeSpace() {
  const [means, setMeans] = useState(3);
  const [time, setTime] = useState(3);
  const [ambition, setAmbition] = useState(3);

  const risk = useMemo(() => {
    return Math.max(1, Math.min(5, Math.round((ambition * 1.6 + (6 - means) + (6 - time)) / 3)));
  }, [ambition, means, time]);

  return (
    <div className="my-6 rounded-md border bg-card p-4">
      <h3 className="m-0 text-sm font-semibold">Ends / Ways / Means / Risk</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fictional model: raise ambition without time or means and risk climbs.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_12rem]">
        <div className="space-y-4">
          <Slider label="Means available" value={means} setValue={setMeans} />
          <Slider label="Time available" value={time} setValue={setTime} />
          <Slider label="Desired end-state ambition" value={ambition} setValue={setAmbition} />
        </div>
        <div className="rounded-md border bg-background p-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Risk
          </div>
          <div className="mt-3 font-mono text-5xl font-semibold text-agentic">{risk}</div>
          <div className="mt-2 text-xs text-muted-foreground">1 low / 5 high</div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-muted-foreground">{value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="w-full accent-amber-500"
      />
    </label>
  );
}
