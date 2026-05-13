"use client";

import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { glossary } from "@/lib/atlas-data";

type AcronymTooltipProps = {
  term: keyof typeof glossary;
  children?: ReactNode;
};

export function AcronymTooltip({ term, children }: AcronymTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="cursor-help border-b border-dotted border-foreground/50 font-medium">
          {children ?? term}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-sm leading-5">
        {glossary[term]}
      </TooltipContent>
    </Tooltip>
  );
}
