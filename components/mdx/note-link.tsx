"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type NoteLinkProps = {
  slug: string;
  children: ReactNode;
  openNote: (slug: string) => void;
};

export function NoteLink({ slug, children, openNote }: NoteLinkProps) {
  return (
    <button
      className="inline-flex items-center gap-1 rounded-sm text-left font-medium text-doctrine underline decoration-doctrine/35 underline-offset-4 transition hover:text-agentic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      type="button"
      onClick={() => openNote(slug)}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}
