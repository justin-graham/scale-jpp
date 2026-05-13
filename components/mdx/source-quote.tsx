import type { ReactNode } from "react";
import type { ClaimKind } from "@/lib/atlas-types";
import { claimHighlightClassName } from "@/lib/claim-style";
import { cn } from "@/lib/utils";

type SourceQuoteProps = {
  kind: ClaimKind;
  source: string;
  children: ReactNode;
};

export function SourceQuote({ kind, source, children }: SourceQuoteProps) {
  return (
    <span
      className={cn(
        "rounded-[0.25rem] px-1.5 py-0.5 font-medium",
        claimHighlightClassName(kind),
      )}
      title={source}
    >
      &ldquo;{children}&rdquo;
    </span>
  );
}
