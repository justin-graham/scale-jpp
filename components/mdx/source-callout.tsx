import type { ReactNode } from "react";
import type { ClaimKind } from "@/lib/atlas-types";
import { claimClassName, claimLabel } from "@/lib/claim-style";
import { cn } from "@/lib/utils";

type SourceCalloutProps = {
  kind: ClaimKind;
  title?: string;
  children: ReactNode;
};

export function SourceCallout({ kind, title, children }: SourceCalloutProps) {
  return (
    <aside className={cn("my-4 border-l-2 pl-3 text-sm", claimClassName(kind))}>
      <div className="mb-1 font-semibold">{title ?? claimLabel(kind)}</div>
      <div className="leading-6 text-foreground/80">{children}</div>
    </aside>
  );
}
