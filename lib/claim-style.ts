import type { ClaimKind } from "@/lib/atlas-types";

export function claimLabel(kind: ClaimKind) {
  switch (kind) {
    case "doctrine":
      return "JP 5-0";
    case "scale":
      return "Scale";
    case "inference":
      return "Inference";
    case "scenario":
      return "Scenario";
  }
}

export function claimClassName(kind: ClaimKind) {
  switch (kind) {
    case "doctrine":
      return "border-blue-500/60 text-blue-950 dark:border-blue-300/60 dark:text-blue-100";
    case "scale":
      return "border-orange-500/70 text-orange-950 dark:border-orange-300/60 dark:text-orange-100";
    case "inference":
      return "border-violet-500/60 text-violet-950 dark:border-violet-300/60 dark:text-violet-100";
    case "scenario":
      return "border-teal-500/60 text-teal-950 dark:border-teal-300/60 dark:text-teal-100";
  }
}

export function claimHighlightClassName(kind: ClaimKind) {
  switch (kind) {
    case "doctrine":
      return "bg-blue-500/12 text-blue-950 dark:bg-blue-300/18 dark:text-blue-100";
    case "scale":
      return "bg-orange-500/14 text-orange-950 dark:bg-orange-300/18 dark:text-orange-100";
    case "inference":
      return "bg-violet-500/12 text-violet-950 dark:bg-violet-300/18 dark:text-violet-100";
    case "scenario":
      return "bg-teal-500/12 text-teal-950 dark:bg-teal-300/18 dark:text-teal-100";
  }
}

export function claimCardClassName(kind: ClaimKind) {
  switch (kind) {
    case "doctrine":
      return "border-blue-400 bg-blue-50 text-blue-950 dark:border-blue-300/50 dark:bg-blue-950/35 dark:text-blue-100";
    case "scale":
      return "border-orange-400 bg-orange-50 text-orange-950 dark:border-orange-300/50 dark:bg-orange-950/35 dark:text-orange-100";
    case "inference":
      return "border-violet-400 bg-violet-50 text-violet-950 dark:border-violet-300/50 dark:bg-violet-950/35 dark:text-violet-100";
    case "scenario":
      return "border-teal-400 bg-teal-50 text-teal-950 dark:border-teal-300/50 dark:bg-teal-950/35 dark:text-teal-100";
  }
}
